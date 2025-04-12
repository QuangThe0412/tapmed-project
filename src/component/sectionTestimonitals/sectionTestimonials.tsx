import React, { useEffect, useState } from "react";
import "./sectionTestimonials.css";
import { Autoplay, Pagination } from "swiper/modules";
import { SliderReview } from "../slider/sliderReview";
import useReviewtStore from "@src/stores/useReviewStore";
import { ReviewType } from "@src/types/typeReview";

const SectionTestimonials: React.FC = () => {
  const { reviews, fetchData: fetchComments } = useReviewtStore();
  const [data, setData] = useState<ReviewType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
    };

    fetchData();
  }, [fetchComments]);

  useEffect(() => {
    if (reviews.length > 0) {
      setData(reviews);
    }
  }, [reviews]);

  const sliderSettings = {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,
    navigation: false,
    // autoplay: {
    //   delay: 2000,
    //   disableOnInteraction: false,
    // },
    modules: [Autoplay, Pagination],
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  };

  return (
    <section className="section-testimonials">
      <div className="container px-4">
        <div className="block-title">
          <h3>
            Khách hàng nói gì về <span style={{ color: "#136d39" }}>TAP</span>
            <span>MED</span>
          </h3>
        </div>
        <div className="block-content">
          {data.length > 0 && (
            <SliderReview data={data} settings={sliderSettings} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonials;
