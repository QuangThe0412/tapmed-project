import { Pagination, Autoplay } from "swiper/modules";
import { NewsDataType } from "./news";
import { SliderWithoutContent } from "../../component/slider/sliderWithoutContent";

const BlogItem: React.FC<{ post: NewsDataType }> = ({ post }) => (
  <div className="item-blog mb-6">
    <div className="flex flex-col md:flex-row">
      <div className="w-full lg:w-5/12 md:w-6/12 mb-4 md:mb-0">
        <a
          className="block overflow-hidden"
          href={post.link}
          title={post.title}
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-auto object-cover"
          />
        </a>
      </div>
      <div className="w-full lg:w-7/12 md:w-6/12 pl-0 md:pl-4 text-left">
        <h3 className="text-lg font-semibold mb-2">
          <a
            href={post.link}
            title={post.title}
            className="text-gray-800 hover:text-blue-600 line-clamp-2"
          >
            {post.title}
          </a>
        </h3>
        <div className="text-gray-600 line-clamp-3">{post.content}</div>
      </div>
    </div>
  </div>
);

const sliderSettings = {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  navigation: false,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  modules: [Autoplay, Pagination],
};

const BlogComponent: React.FC<{ data: NewsDataType[] }> = ({ data }) => {
  return (
    <div className="blog-new py-8">
      <div className="flex flex-wrap -mx-4 justify-center">
        <div className="w-full xl:w-1/2 lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div className="wrapper-blog-new">
            <div className="block-content">
              {data?.map((post) => (
                <BlogItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-screen xl:w-1/2 lg:w-1/2 px-0 lg:px-4">
          <SliderWithoutContent data={data} settings={sliderSettings} />
        </div>
      </div>
    </div>
  );
};

export default BlogComponent;
