import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BlogComponent from "./blog";
import FeaturedComponent from "./featured";
import ListComponent from "./list";
import { BlogType } from "@src/types/typeBlog";
import Pagination2 from "@src/component/pagination/pagination2";
import "./news.css";
import { getBlogByCategory } from "./blogEndpoint";
import toast from "react-hot-toast";

function News() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0); // Pagination2 sử dụng index từ 0
  const [newsItems, setNewsItems] = useState<BlogType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu
  const itemsPerPage = 6;

  // Hàm lấy dữ liệu từ API
  const fetchData = async (page: number) => {
    setLoading(true); // Bắt đầu tải dữ liệu
    try {
      const res = await getBlogByCategory("news", page, itemsPerPage);
      if (!res) {
        throw new Error("Không thể tải dữ liệu. Vui lòng thử lại sau.");
      }
      setNewsItems(res.blog);
      setTotalPages(res.totalPages);
    } catch (error: any) {
      console.error("Lỗi khi tải dữ liệu:", error);
      toast.error(
        error?.message || "Không thể tải dữ liệu. Vui lòng thử lại sau."
      );
    } finally {
      setLoading(false); // Kết thúc tải dữ liệu
    }
  };

  // Lấy page từ URL và gọi API
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) - 1 : 0;
    setCurrentPage(page);
    fetchData(page);
  }, [searchParams]);

  // Xử lý khi người dùng thay đổi trang
  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: (selected + 1).toString() }); // Cập nhật URL
    window.scrollTo({
      top:
        (document.querySelector(".layout-collections") as HTMLElement)
          ?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        {loading ? (
          <p className="text-center">Đang tải dữ liệu...</p>
        ) : (
          <>
            <BlogComponent data={newsItems.slice(0, 3)} />
            <FeaturedComponent data={newsItems.slice(0, 4)} />
            <ListComponent data={newsItems} />
          </>
        )}
        <Pagination2
          pageCount={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default News;
