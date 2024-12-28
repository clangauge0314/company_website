const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");
const jwt = require("jsonwebtoken");

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
    const { name, email, phone, message, status } = req.body;

    const contact = new Contact({
      name,
      email,
      phone,
      message,
      status,
    });

    await contact.save();
    res.status(201).json({ message: "문의가 성공적으로 등록되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "문의를 찾을 수 없습니다." });
    }
    res.json(contact);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ message: "문의를 찾을 수 없습니다." });
    }

    res.json({ message: "문의 상태가 성공적으로 수정되었습니다.", contact });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "문의를 찾을 수 없습니다." });
    }
    res.json({ message: "문의가 성공적으로 삭제되었습니다." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "서버 에러가 발생했습니다." });
  }
});

module.exports = router;
