import React, { useEffect, useState } from "react";
import "./sectionTestimonials.css";
import { Autoplay, Pagination } from "swiper/modules";
import { SliderCustomer } from "../slider/sliderCustomer";
import useCustomerCommentStore from "@src/stores/customerCommentStore";
import { CustomerCommentType } from "@src/types/typeCustomerComment";

const SectionTestimonials: React.FC = () => {
  const { commentCustomers, fetchData: fetchComments } =
    useCustomerCommentStore();
  const [data, setData] = useState<CustomerCommentType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchComments();
    };

    fetchData();
  }, [fetchComments]);

  useEffect(() => {
    if (commentCustomers.length > 0) {
      setData(commentCustomers);
    }
  }, [commentCustomers]);

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
            <SliderCustomer data={data} settings={sliderSettings} />
          )}
        </div>
      </div>
    </section>
  );
};

export default SectionTestimonials;
