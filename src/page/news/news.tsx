import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogComponent from "./blog";
import FeaturedComponent from "./featured";
import ListComponent from "./list";
import { BlogType } from "@src/types/typeBlog";
import Pagination2 from "@src/component/pagination/pagination2";

function News() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0); // Pagination2 sử dụng index từ 0
  const [newsItems, setNewsItems] = useState<BlogType[]>([]);
  const [paginatedItems, setPaginatedItems] = useState<BlogType[]>([]);
  const itemsPerPage = 6;

  const fetchNewsData = async () => {
    try {
      const data = await import("@dataMockup/blogData.json");
      return data.default;
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  useEffect(() => {
    fetchNewsData().then((data) => {
      setNewsItems(data as BlogType[]);
    });
  }, []);

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      setCurrentPage(parseInt(pageParam) - 1);
    } else {
      setCurrentPage(0);
    }
  }, [searchParams]);

  useEffect(() => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedItems(newsItems.slice(startIndex, endIndex));
  }, [currentPage, newsItems]);

  const pageCount = Math.ceil(newsItems.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: (selected + 1).toString() });
    window.scrollTo({
      top: document.querySelector(".layout-collections")?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const dataNewsBlog = paginatedItems.slice(0, 3);
  const dataNewsFeatured = paginatedItems.slice(0, 4);
  const dataNewsList = paginatedItems;

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        <BlogComponent data={dataNewsBlog} />
        <FeaturedComponent data={dataNewsFeatured} />
        <ListComponent data={dataNewsList} />
        <Pagination2
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default News;
