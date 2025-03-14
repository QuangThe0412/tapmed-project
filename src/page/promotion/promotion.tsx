import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BlogType } from "@src/types/typeBlog";
import Pagination2 from "@src/component/pagination/pagination2";
import BlogComponent from "../news/blog";
import FeaturedComponent from "../news/featured";
import ListComponent from "../news/list";

function Promotion() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State cho phân trang
  const [currentPage, setCurrentPage] = useState(0); // Pagination2 sử dụng index từ 0
  const [PromotionItems, setPromotionItems] = useState<BlogType[]>([]);
  const [paginatedItems, setPaginatedItems] = useState<BlogType[]>([]);
  const itemsPerPage = 6;

  const fetchPromotionData = async () => {
    try {
      const data = await import("@dataMockup/blogData.json");
      return data.default;
    } catch (err) {
      console.error("Error fetching Promotion:", err);
    }
  };

  useEffect(() => {
    fetchPromotionData().then((data) => {
      const _new = data?.filter(
        (item: BlogType) => item.category === "promotion"
      );
      setPromotionItems(_new as BlogType[]);
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
    setPaginatedItems(PromotionItems.slice(startIndex, endIndex));
  }, [currentPage, PromotionItems]);

  const pageCount = Math.ceil(PromotionItems.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setSearchParams({ page: (selected + 1).toString() });
    window.scrollTo({
      top:
        (document.querySelector(".layout-collections") as HTMLElement)
          ?.offsetTop || 0,
      behavior: "smooth",
    });
  };

  const dataPromotionBlog = paginatedItems.slice(0, 3);
  const dataPromotionFeatured = paginatedItems.slice(0, 4);
  const dataPromotionList = paginatedItems;

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        <BlogComponent data={dataPromotionBlog} />
        <FeaturedComponent data={dataPromotionFeatured} />
        <ListComponent data={dataPromotionList} />
        <Pagination2
          pageCount={pageCount}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Promotion;
