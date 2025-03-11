import { Pagination, Autoplay } from "swiper/modules";
import { NewsDataType } from "./news";
import { SliderWithoutContent } from "../../component/slider/sliderWithoutContent";

const blogPosts: NewsDataType[] = [
  {
    id: 139,
    title: "TB CT TẶNG CHUYẾN DU LỊCH DU THUYỀN HẠ LONG 5 SAO NHÂN 8/3",
    imageUrl: "https://tapmed.vn/storage/image/tapmed1734411099.jpg",
    link: "https://tapmed.vn/tin-tuc/tb-ct-tang-chuyen-du-lich-du-thuyen-ha-long-5-sao-nhan-83-139.html",
    content: ".",
  },
  {
    id: 135,
    title: "Chương trình khuyến mại voucher cước",
    imageUrl: "https://tapmed.vn/storage/image/1117292255751731513589.png",
    link: "https://tapmed.vn/tin-tuc/chuong-trinh-khuyen-mai-voucher-cuoc-135.html",
    content: ".",
  },
  {
    id: 125,
    title: '😍Chúc mừng ngày "DƯỢC SĨ THẾ GIỚI" 25/9',
    imageUrl:
      "https://tapmed.vn/storage/image/z5865881226036_4d1ae1bdbbb63ecc88122cb76cd8b58f1727250773.jpg",
    link: "https://tapmed.vn/tin-tuc/chuc-mung-ngay-duoc-si-the-gioi-259-125.html",
    content: "Chúng ta cùng nhau viết nên những câu chuyện đẹp về sức khỏe.",
  },
];

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
      <div className="w-full lg:w-7/12 md:w-6/12 pl-0 md:pl-4">
        <h3 className="text-lg font-semibold mb-2">
          <a
            href={post.link}
            title={post.title}
            className="text-gray-800 hover:text-blue-600"
          >
            {post.title}
          </a>
        </h3>
        <div className="text-gray-600">{post.content}</div>
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

const NewsBlog = () => {
  return (
    <div className="blog-new py-8">
      <div className="flex flex-wrap -mx-4 justify-center">
        <div className="w-full xl:w-1/2 lg:w-1/2 px-4 mb-8 lg:mb-0">
          <div className="wrapper-blog-new">
            <div className="block-content">
              {blogPosts.map((post) => (
                <BlogItem key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>

        <div className="w-screen xl:w-1/2 lg:w-1/2 px-0 lg:px-4">
          <SliderWithoutContent data={blogPosts} settings={sliderSettings} />
        </div>
      </div>
    </div>
  );
};

export default NewsBlog;
