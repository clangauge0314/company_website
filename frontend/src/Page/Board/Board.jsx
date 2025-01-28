import React from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoardLocale from "../../Locale/Board.json";

const Board = () => {
  const [posts, setPosts] = React.useState([]);
  const [pageSize, setPageSize] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchType, setSearchType] = React.useState("title");
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [language, setLanguage] = React.useState(localStorage.getItem('language') || 'ko');

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/post");
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 가져오기 실패: ", error);
      }
    };

    fetchPosts();
  }, []);

  React.useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(localStorage.getItem('language') || 'ko');
    };

    window.addEventListener('languageChange', handleLanguageChange);
    return () => {
      window.removeEventListener('languageChange', handleLanguageChange);
    };
  }, []);

  const t = (key) => {
    const keys = key.split(".");
    return keys.reduce((obj, k) => obj[k], BoardLocale[language]);
  };

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const value = post[searchType]?.toLowerCase() || "";
      const matchesSearch = value.includes(searchTerm.toLowerCase());

      const postDate = new Date(post.createdAt).getTime();
      const start = startDate ? new Date(startDate).getTime() : null;
      const end = endDate ? new Date(endDate).getTime() : null;

      const matchesDate =
        (!start || postDate >= start) && (!end || postDate <= end);

      return matchesSearch && matchesDate;
    });
  }, [posts, searchTerm, searchType, startDate, endDate]);

  const totalPages =
    pageSize > 0 ? Math.ceil(filteredPosts.length / pageSize) : 1;

  const paginatedPosts = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPosts.slice(start, start + pageSize);
  }, [filteredPosts, currentPage, pageSize]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="p-4 mx-auto max-w-7xl py-32"
      initial="hidden"
      animate="visible"
    >
      <motion.h1
        className="text-4xl font-bold mb-6 text-center"
        variants={fadeIn}
        custom={0}
      >
        {t("board.title")}
      </motion.h1>

      <motion.div
        className="mb-4 flex flex-col md:flex-row justify-between items-center gap-4"
        variants={fadeIn}
        custom={1}
      >
        <div className="flex w-full md:w-auto gap-2">
          <select
            className="border rounded px-3 py-2 text-base"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="title">{t("board.search.title")}</option>
          </select>
          <div className="flex-1 md:w-80">
            <input
              type="text"
              placeholder={t("board.search.placeholder")}
              className="w-full border rounded px-3 py-2 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">{t("board.search.dateStart")}</label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full md:w-auto"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">{t("board.search.dateEnd")}</label>
            <input
              type="date"
              className="border rounded px-3 py-2 w-full md:w-auto"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-bold">{t("board.search.itemsPerPage")}</label>
          <select
            className="border rounded px-3 py-2"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>{`${size}${t("board.search.itemsCount")}`}</option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:block overflow-x-auto"
        variants={fadeIn}
        custom={2}
      >
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
                {t("board.table.number")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-auto">
                {t("board.table.title")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[15%]">
                {t("board.table.date")}
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider w-[8%]">
                {t("board.table.views")}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {paginatedPosts.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {t("board.noPosts")}
                </td>
              </tr>
            ) : (
              paginatedPosts.map((post, index) => (
                <motion.tr
                  key={post._id}
                  onClick={() => navigate(`/post/${post._id}`)}
                  className="hover:bg-gray-50 cursor-pointer"
                  variants={fadeIn}
                  custom={3 + index}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.views}</td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        className="md:hidden grid grid-cols-1 gap-4"
        variants={fadeIn}
        custom={3}
      >
        {paginatedPosts.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">
            {t("board.noPosts")}
          </div>
        ) : (
          paginatedPosts.map((post, index) => (
            <motion.div
              key={post._id}
              onClick={() => navigate(`/post/${post._id}`)}
              className="border rounded-lg p-4 bg-white shadow-md hover:shadow-lg transition-shadow"
              variants={fadeIn}
              custom={4 + index}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold truncate">{post.title}</h3>
                <span className="text-sm text-gray-500">
                  #{(currentPage - 1) * pageSize + index + 1}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 truncate">
                작성일: {new Date(post.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">조회수: {post.views}</p>
            </motion.div>
          ))
        )}
      </motion.div>

      <motion.div
        className="mt-4 flex justify-center space-x-2 text-lg font-bold"
        variants={fadeIn}
        custom={5}
      >
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1 || totalPages === 0}
        >
          {t("board.pagination.prev")}
        </button>
        <span className="px-3 py-1">
          {totalPages > 0 ? `${currentPage} / ${totalPages}` : "0 / 0"}
        </span>
        <button
          className="px-3 py-1 rounded border disabled:opacity-50"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage >= totalPages || totalPages === 0}
        >
          {t("board.pagination.next")}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Board;
