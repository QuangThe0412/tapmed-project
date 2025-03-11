import { useEffect } from "react";
import { DataSlider } from "../../component/slider/slider";
import { signal } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import Pagination from "../pagination/pagination";
import { paths } from "../../utils/contanst";
import { useSearchParams } from "react-router-dom";
import PromotionData from "../../dataMockup/blogData.json";
import ListComponent from "../news/list";
import FeaturedComponent from "../news/featured";
import BlogComponent from "../news/blog";

export type PromotionDataType = DataSlider & {
  content: string;
};

export const PromotionItems = signal<PromotionDataType[]>([]);
export const currentPage = signal<number>(1);
export const totalPages = signal<number>(1);

function Promotion() {
  useSignals();
  const [searchParams, setSearchParams] = useSearchParams();
  const pathPromotion = paths.find((path) => path.name === "promotion");
  const baseUrl = pathPromotion?.path || "/";

  const dataPromotionBlog = PromotionItems?.value.slice(0, 3);
  const dataPromotionFeatured = PromotionItems?.value;
  const dataPromotionList = PromotionItems?.value;

  useEffect(() => {
    const pageParam = searchParams.get("page");
    if (pageParam) {
      currentPage.value = parseInt(pageParam);
    } else {
      currentPage.value = 1;
    }
  }, [searchParams]);

  const fetchPromotionData = async (page: number) => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1500));

      // Sử dụng dữ liệu từ file JSON
      const itemsPerPage = 6;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedItems = PromotionData?.items.slice(startIndex, endIndex);

      //khúc này filter Promotion từ paginatedItems ===>>>>
      const mockupData = paginatedItems.filter(
        (item) => item.category === "promotion"
      );

      PromotionItems.value = mockupData;

      totalPages.value = Math.ceil(PromotionData?.items.length / itemsPerPage);
    } catch (err) {
      console.error("Error fetching Promotion:", err);
    }
  };

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
    fetchPromotionData(page);
  };

  // Gọi lần đầu để lấy dữ liệu
  useEffect(() => {
    fetchPromotionData(currentPage.value);
  }, [currentPage.value]);

  return (
    <div className="blog_wrapper layout-blog">
      <div className="container">
        <BlogComponent data={dataPromotionBlog} />
        <FeaturedComponent data={dataPromotionFeatured} />
        <ListComponent data={dataPromotionList} />
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

export default Promotion;
