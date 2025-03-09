import React from "react";
import "./sectionPartner.css";

const SectionPartner: React.FC = () => {
  const partners = [
    "16.png",
    "17.png",
    "10.png",
    "1.png",
    "2.png",
    "3.png",
    "4.png",
    "5.png",
    "6.png",
    "7.png",
    "8.png",
    "9.png",
    "11.png",
    "12.png",
    "13.png",
    "14.png",
    "15.png",
    "18.png",
    "19.png",
    "20.png",
    "22.png",
    "23.png",
    "24.png",
    "25.png",
    "26.png",
    "27.png",
    "28.png",
    "29.png",
    "30.png",
    "31.png",
    "32.png",
    "33.png",
    "34.png",
    "35.png",
    "36.png",
  ];

  return (
    <section className="section-partner">
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          {partners.map((partner, index) => (
            <div key={index} className="w-1/4 lg:w-1/5 p-2">
              <div className="image">
                <img
                  src={`https://tapmed.vn/TapMedVn/images/partner/${partner}`}
                  alt="Dược phẩm TAPMED"
                  className="w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionPartner;
