import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "./splide.css";
import { useRef } from "react";

export type DataSlider = {
  imageUrl: string;
  link?: string;
  title?: string;
  id?: number;
};

type SliderProps = {
  data: DataSlider[];
  settings: {};
  renderPagination?: (slides: number) => React.ReactNode;
};

export function Slider({ data, settings, renderPagination }: SliderProps) {
  const splideRef = useRef<any>(null);

  const totalSlides = data.length;

  return (
    <Splide
      ref={splideRef}
      options={{
        ...settings,
      }}
      aria-label="Custom Slider"
    >
      {data &&
        data.map((item: DataSlider, index) => (
          <SplideSlide key={index}>
            {item.title == null ? (
              <img
                style={{ width: "100%", height: "auto", objectFit: "cover" }}
                src={item.imageUrl}
                alt={`Image ${index + 1}`}
              />
            ) : (
              <div className="item">
                <div className="item_product_main">
                  <div className="product-thumbnail">
                    <a
                      className="image_thumb"
                      href={item.link || "#"}
                      title={item.title}
                    >
                      <img src={item.imageUrl} alt={item.title} />
                    </a>
                  </div>
                  <div className="product-info">
                    <h3 className="product-name">
                      <a href={item.link || "#"} title={item.title}>
                        {item.title}
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            )}
          </SplideSlide>
        ))}
    </Splide>
  );
}
