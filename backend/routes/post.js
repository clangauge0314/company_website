const { S3Client, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { marked } = require("marked");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "토큰이 없습니다." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "유효하지 않은 토큰입니다." });
  }
};

router.post("/", async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const latestPost = await Post.findOne().sort({ number: -1 });
    const nextNumber = latestPost ? latestPost.number + 1 : 1;

    const post = new Post({
      number: nextNumber,
      title,
      content,
      fileUrl,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    let ip;
    try {
      const response = await axios.get("https://api.ipify.org?format=json");
      ip = response.data.ip;
    } catch (error) {
      console.log("IP 주소를 가져오던 중 오류 발생: ", error.message);
      ip = req.ip;
    }

    const userAgent = req.headers["user-agent"];

    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hasRecentView = post.viewLogs.some(
      (log) =>
        log.ip === ip &&
        log.userAgent === userAgent &&
        new Date(log.timestamp) > oneDayAgo
    );

    if (!hasRecentView) {
      post.views += 1;
      post.viewLogs.push({
        ip,
        userAgent,
        timestamp: new Date(),
      });
      await post.save();
    }

    let htmlContent;
    try {
      htmlContent = marked.parse(post.content || "");
    } catch (error) {
      console.log("마크다운 변환 실패: ", error);
      htmlContent = post.content;
    }

    const responseData = {
      ...post.toObject(),
      renderedContent: htmlContent,
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, fileUrl } = req.body;

    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const oldContentImages = post.content.match(imgRegex) || [];
    const newContentImages = content.match(imgRegex) || [];

    const deletedImages = oldContentImages.filter(
      (url) => !newContentImages.includes(url)
    );
    const deletedFiles = (post.fileUrl || []).filter(
      (url) => !(fileUrl || []).includes(url)
    );

    const getS3KeyFromUrl = (url) => {
      try {
        const urlObj = new URL(url);
        return decodeURIComponent(urlObj.pathname.substring(1));
      } catch (error) {
        console.log("URL 파싱 에러: ", err);
        return null;
      }
    };

    const allDeletedFiles = [...deletedImages, ...deletedFiles];
    for (const fileUrl of allDeletedFiles) {
      const key = getS3KeyFromUrl(fileUrl);
      if (key) {
        console.log("파일 삭제 완료: ", key);
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            })
          );
        } catch (error) {
          console.log("S3 파일 삭제 에러: ", error);
        }
      }
    }

    post.title = title;
    post.content = content;
    post.fileUrl = fileUrl;
    post.updatedAt = Date.now();

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    const imgRegex =
      /https:\/\/[^"']*?\.(?:png|jpg|jpeg|gif|PNG|JPG|JPEG|GIF)/g;
    const contentImages = post.content.match(imgRegex) || [];

    const getS3KeyFromUrl = (url) => {
      try {
        const urlObj = new URL(url);
        return decodeURIComponent(urlObj.pathname.substring(1));
      } catch (error) {
        console.log("URL 파싱 에러: ", err);
        return null;
      }
    };

    const allFiles = [...contentImages, ...(post.fileUrl || [])];

    for (const fileUrl of allFiles) {
      const key = getS3KeyFromUrl(fileUrl);
      if (key) {
        console.log("파일 삭제 완료: ", key);
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: key,
            })
          );
        } catch (error) {
          console.log("S3 파일 삭제 에러: ", error);
        }
      }
    }

    await post.deleteOne();
    res.json({ message: "게시글이 삭제가 되었습니다." });
  } catch (error) {
    res.status(500).json({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;
