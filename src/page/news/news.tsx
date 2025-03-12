import { useEffect } from "react";
import { DataSlider } from "../../component/slider/slider";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Pagination from "../../component/pagination/pagination";
import { paths } from "../../utils/contanst";
import { useSearchParams } from "react-router-dom";
import newsData from "../../dataMockup/blogData.json";
import BlogComponent from "./blog";
import FeaturedComponent from "./featured";
import ListComponent from "./list";

export type NewsDataType = DataSlider & {
  content: string;
};

export const newsItems = signal<NewsDataType[]>([]);
export const currentPage = signal<number>(1);
export const totalPages = signal<number>(1);

function News() {
  useSignals();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathNews = paths.find((path) => path.name === "news");
  const baseUrl = pathNews?.path || "/";

  const dataNewsBlog = newsItems?.value.slice(0, 3);
  const dataNewsFeatured = newsItems?.value;
  const dataNewsList = newsItems?.value;

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      currentPage.value = parseInt(pageParam);
    } else {
      currentPage.value = 1;
    }
  }, [searchParams]);

  const fetchNewsData = async (page: number) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sử dụng dữ liệu từ file JSON
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedItems = newsData?.items.slice(startIndex, endIndex);

      //khúc này filter category news từ paginatedItems ===>>>>
      const mockupData = paginatedItems.filter(
        (item) => item.category === "news"
      );

      newsItems.value = mockupData;

      totalPages.value = Math.ceil(newsData?.items.length / itemsPerPage);
    } catch (err) {
      console.error("Error fetching news:", err);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    fetchNewsData(page);
  };

  // Gọi lần đầu để lấy dữ liệu
  useEffect(() => {
    fetchNewsData(currentPage.value);
  }, [currentPage.value]);

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        <BlogComponent data={dataNewsBlog} />
        <FeaturedComponent data={dataNewsFeatured} />
        <ListComponent data={dataNewsList} />
        {totalPages.value > 1 && (
          <Pagination
            currentPage={currentPage.value}
            totalPages={totalPages.value}
            baseUrl={baseUrl}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default News;
