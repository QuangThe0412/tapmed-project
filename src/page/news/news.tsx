import { useEffect } from "react";
import { DataSlider } from "../../component/slider/slider";
import NewsBlog from "./newsBlog";
import NewsFeatured from "./newsFeatured";
import NewsList from "./newsList";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Pagination from "../pagination/pagination";
import { paths } from "../../utils/contanst";
import { useSearchParams } from "react-router-dom";

export type NewsDataType = DataSlider & {
  content: string;
};

// Tạo các signals để lưu trữ trạng thái
export const newsItems = signal<NewsDataType[]>([]);
export const currentPage = signal<number>(1);
export const totalPages = signal<number>(1);
export const loading = signal<boolean>(false);
export const error = signal<string | null>(null);

function News() {
  useSignals();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathNews = paths.find((path) => path.name === "news");
  const baseUrl = pathNews?.path || "/";

  // Lấy trang hiện tại từ query params, mặc định là trang 1
  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      currentPage.value = parseInt(pageParam);
    } else {
      currentPage.value = 1;
    }
  }, [searchParams]);

  // Hàm fetch dữ liệu từ API
  const fetchNewsData = async (page: number) => {
    loading.value = true;
    error.value = null;

    try {
      // Thay đổi URL API thực tế của bạn
      const response = await fetch(
        `https://api.example.com/news?page=${page}&limit=10`
      );

      if (!response.ok) {
        throw new Error("Không thể tải dữ liệu tin tức");
      }

      const data = await response.json();

      // Cập nhật signals với dữ liệu mới
      newsItems.value = data.items || [];
      totalPages.value = data.totalPages || 1;
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Đã xảy ra lỗi";
      console.error("Error fetching news:", err);
    } finally {
      loading.value = false;
    }
  };

  // Xử lý khi thay đổi trang
  const handlePageChange = (page: number) => {
    // Cập nhật URL với trang mới
    setSearchParams({ page: page.toString() });
    // Tải dữ liệu mới
    fetchNewsData(page);
  };

  // Tải dữ liệu ban đầu khi component được mount hoặc khi trang thay đổi
  useEffect(() => {
    fetchNewsData(currentPage.value);
  }, [currentPage.value]);

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        <NewsBlog />
        <NewsFeatured />

        {/* Hiển thị trạng thái loading */}
        {loading.value && (
          <div className="text-center py-4">Đang tải dữ liệu...</div>
        )}

        {/* Hiển thị lỗi nếu có */}
        {error.value && (
          <div className="text-center py-4 text-red-500">{error.value}</div>
        )}

        {/* Hiển thị danh sách tin tức */}
        {!loading.value && !error.value && <NewsList />}

        {/* Hiển thị phân trang */}
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
