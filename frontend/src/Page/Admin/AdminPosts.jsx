import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("title");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");
        setPosts(response.data);
      } catch (error) {
        console.log("게시글 가져오기 실패: ", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '삭제하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '삭제',
      cancelButtonText: '취소'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/post/${id}`, {
          withCredentials: true
        });
        setPosts(posts.filter(post => post._id !== id));
        Swal.fire('삭제완료!', '게시글이 성공적으로 삭제되었습니다.', 'success');
      } catch (error) {
        console.error('삭제 실패:', error);
        Swal.fire('오류 발생!', '삭제 중 문제가 발생했습니다.', 'error');
      }
    }
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    if (typeof url !== "string") return "";
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      return value.includes(searchTerm.toLowerCase());
    });
  }, [posts, searchTerm, searchType]);

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  return (
    <div className="p-4 mx-auto max-w-[1700px]">
      <h1 className="text-4xl font-bold mt-6 mb-4">게시글 관리</h1>

      <div className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">제목</option>
            <option value="content">글 내용</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              className="w-full border rounded px-3 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <a
          href="/admin/create-post"
          className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-center"
        >
          추가하기
        </a>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <div className="text-lg font-bold text-gray-600">
          총 {paginatedPosts.length}개의 게시물
        </div>

        <div className="flex items-center space-x-2">
          <label className="text-base font-bold text-gray-600">
            페이지당 표시:{" "}
          </label>
          <select
            className="border rounded px-3 py-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{`${size}개`}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden text-sm lg:text-base font-bold">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left w-[8%]">번호</th>
              <th className="px-4 py-3 text-left w-[15%]">제목</th>
              <th className="px-4 py-3 text-left w-[30%]">내용</th>
              <th className="px-4 py-3 text-left w-[7%]">조회수</th>
              <th className="px-4 py-3 text-left w-[10%]">파일</th>
              <th className="px-4 py-3 text-left w-[12%]">작성일</th>
              <th className="px-4 py-3 text-left w-[12%]">수정일</th>
              <th className="px-4 py-3 text-left w-[6%]">관리</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPosts.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-8 text-center text-gray-500">
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post, index) => (
                <tr key={post._id} className="border-b">
                  <td className="px-4 py-3">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-4 py-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 overflow-hidden text-ellipsis whitespace-nowrap">
                    {post.content.length > 25
                      ? `${post.content.substring(0, 25)}...`
                      : post.content}
                  </td>
                  <td className="px-4 py-3">{post.views}</td>
                  <td className="px-4 py-3">
                    {Array.isArray(post.fileUrl) ? (
                      <div className="flex flex-col gap-1">
                        {post.fileUrl.map((url, index) => (
                          <button
                            key={index}
                            onClick={() => window.open(url, "_blank")}
                            className="inline-flex items-center px-3 py-1.5 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-all duration-200 border border-gray-300 shadow-sm hover:shadow w-full mb-1 last:mb-0"
                          >
                            <svg
                              className="w-4 h-4 mr-2 text-blue-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="truncate">
                              {getFileNameFromUrl(url)}
                            </span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      post.fileUrl && (
                        <button
                          onClick={() => window.open(post.fileUrl, "_blank")}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors duration-200 border border-gray-300"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {getFileNameFromUrl(post.fileUrl)}
                        </button>
                      )
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(post.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(post.updatedAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end space-x-2">
                      <button
                        className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 whitespace-nowrap writing-normal"
                        onClick={() =>
                          (window.location.href = `/admin/edit-post/${post._id}`)
                        }
                      >
                        수정
                      </button>
                      <button onClick={() => handleDelete(post._id)} className="px-3 py-1.5 bg-red-500 text-white rounded hover:bg-red-600 whitespace-nowrap writing-normal">
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="xl:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedPosts.length === 0 ? (
          <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-lg shadow">
            게시글이 없습니다.
          </div>
        ) : (
          paginatedPosts.map((post, index) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm 2xl:text-base text-gray-500">
                  #{(currentPage - 1) * pageSize + index + 1}
                </span>
                <div className="flex gap-2">
                  <a
                    href={`/admin/edit-post/${post._id}`}
                    className="text-sm 2xl:text-base text-blue-600 hover:text-blue-800 whitespace-nowrap writing-normal"
                  >
                    수정
                  </a>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="text-sm 2xl:text-base text-red-600 hover:text-red-800 whitespace-nowrap writing-normal"
                  >
                    삭제
                  </button>
                </div>
              </div>

              <h3 className="text-xl 2xl:text-2xl font-bold mb-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {post.title}
              </h3>

              <p className="text-gray-600 2xl:text-lg mb-3 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {post.content}
              </p>

              <div className="flex justify-between items-center text-sm 2xl:text-base text-gray-500 mb-2">
                <span>조회수: {post.views}</span>
                <div className="flex flex-col gap-2">
                  {Array.isArray(post.fileUrl)
                    ? post.fileUrl.map((url, index) => (
                        <button
                          key={index}
                          onClick={() => window.open(url, "_blank")}
                          className="inline-flex items-center px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm rounded-lg transition-all duration-200 border border-gray-300 shadow-sm hover:shadow-md w-full mb-1.5 last:mb-0 group"
                        >
                          <svg
                            className="w-4 h-4 mr-2 text-blue-500 group-hover:text-blue-600 transition-colors"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="truncate">
                            {getFileNameFromUrl(url)}
                          </span>
                        </button>
                      ))
                    : post.fileUrl && (
                        <button
                          onClick={() => window.open(post.fileUrl, "_blank")}
                          className="inline-flex items-center px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors duration-200 border border-gray-300 w-full"
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          {getFileNameFromUrl(post.fileUrl)}
                        </button>
                      )}
                </div>
              </div>

              <div className="flex justify-between text-sm 2xl:text-base text-gray-500">
                <span>작성: {new Date(post.createdAt).toLocaleString()}</span>
                <span>수정: {new Date(post.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 flex justify-center space-x-2 text-lg font-bold">
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          이전
        </button>
        <span className="px-3 py-1">
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default AdminPosts;
