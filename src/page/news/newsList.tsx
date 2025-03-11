import "./news.css";
import { NewsDataType } from "./news";

// Dữ liệu danh sách tin tức
const listPosts: NewsDataType[] = [
  {
    id: 117,
    title: "Mẹo Vặt Chăm Sóc Sức Khỏe Mùa Thu Cùng Tapmed 🍂",
    imageUrl:
      "https://tapmed.vn/storage/image/76,000đđ (Bản thuyết trình) (16)1725852981.png",
    link: "https://tapmed.vn/tin-tuc/meo-vat-cham-soc-suc-khoe-mua-thu-cung-tapmed-117.html",
    content:
      "Mùa thu đến với không khí mát mẻ và dễ chịu, nhưng cũng mang theo những thay đổi về thời tiết dễ gây ra các vấn đề sức khỏe. Để bảo vệ cơ thể và duy trì sức khỏe tốt, Tapmed gửi đến bạn một số mẹo vặt cực kỳ hữu ích trong mùa thu này:",
  },
  {
    id: 113,
    title: 'CHƯƠNG TRÌNH ĐÀO TẠO "CHIẾN BINH SALE - VƯỢT MỌI THÁCH THỨC"',
    imageUrl:
      "https://tapmed.vn/storage/image/z5775168233022_5a1ac3be5dbc281fc37b218dec5ffb951724831708.jpg",
    link: "https://tapmed.vn/tin-tuc/chuong-trinh-dao-tao-chien-binh-sale-vuot-moi-thach-thuc-113.html",
    content:
      "Hãy chuẩn bị tinh thần sẵn sàng cho một buổi đào tạo đầy năng lượng và kiến thức thực tiễn để vượt qua mọi thách thức trong ngành sale.",
  },
  {
    id: 111,
    title: "THÔNG BÁO V/v: Lịch nghỉ lễ ngày Quốc Khánh 02/09/2024",
    imageUrl:
      "https://tapmed.vn/storage/image/z5761444523872_bea07714b30eb55609cc1ff82b238b201724467183.jpg",
    link: "https://tapmed.vn/tin-tuc/thong-bao-vv-lich-nghi-le-ngay-quoc-khanh-02092024-111.html",
    content:
      'Chúng tôi xin trân trọng thông báo tới Quý khách hàng và đối tác về lịch nghỉ lễ "Ngày Quốc Khánh 02/09/2024". Cụ thể như sau:',
  },
  {
    id: 109,
    title:
      "Tầm Quan Trọng Của Việc Tích Trữ Thuốc Cho Các Nhà Thuốc, Phòng Khám",
    imageUrl:
      "https://tapmed.vn/storage/image/76,000đđ (Bản thuyết trình) (12)1724120152.png",
    link: "https://tapmed.vn/tin-tuc/tam-quan-trong-cua-viec-tich-tru-thuoc-cho-cac-nha-thuoc-phong-kham-109.html",
    content:
      "Trong ngành dược phẩm và y tế, việc tích trữ thuốc tại các nhà thuốc và phòng khám đóng vai trò vô cùng quan trọng.",
  },
  {
    id: 108,
    title: "19/8 - Ngày vàng son của dân tộc",
    imageUrl:
      "https://tapmed.vn/storage/image/z5744685351043_c9a8623e99113c8f6a07c70b935e1a511724035269.jpg",
    link: "https://tapmed.vn/tin-tuc/198-ngay-vang-son-cua-dan-toc-108.html",
    content:
      "Ngày 19/8/1945, cách đây 79 năm, một trang sử hào hùng đã được viết nên",
  },
  {
    id: 105,
    title:
      "🤔Bí Quyết Quản Lý Kho Thuốc Hiệu Quả - Đảm Bảo Chất Lượng, Tối Ưu Lợi Nhuận",
    imageUrl:
      "https://tapmed.vn/storage/image/76,000đđ (Bản thuyết trình) (11)1723602117.png",
    link: "https://tapmed.vn/tin-tuc/bi-quyet-quan-ly-kho-thuoc-hieu-qua-dam-bao-chat-luong-toi-uu-loi-nhuan-105.html",
    content:
      "Quản lý kho thuốc là một công việc đòi hỏi sự tỉ mỉ và chính xác cao. Làm sao để quản lý kho thuốc một cách hiệu quả, đảm bảo chất lượng thuốc và tối ưu lợi nhuận? Hãy cùng khám phá những bí quyết dưới đây:",
  },
  {
    id: 101,
    title: "Mở nhà thuốc thành công: Có khó không?",
    imageUrl:
      "https://tapmed.vn/storage/image/z5706868943718_d693d1d20d11620204d199e05a774de21723000097.jpg",
    link: "https://tapmed.vn/tin-tuc/mo-nha-thuoc-thanh-cong-co-kho-khong-101.html",
    content:
      "Mở nhà thuốc không chỉ là đam mê mà còn là một quyết định kinh doanh đầy thách thức. Tuy nhiên, với sự chuẩn bị kỹ lưỡng và chiến lược đúng đắn, bạn hoàn toàn có thể thành công. Bài viết này sẽ chia sẻ những kinh nghiệm thực tế từ A đến Z, giúp bạn tự tin hơn trên con đường khởi nghiệp.",
  },
  {
    id: 100,
    title: "TẠI SAO CÀNG LỚN TUỔI THÌ NÊN QUAN TÂM ĐẾN SỨC KHỎE 🧓👵",
    imageUrl:
      "https://tapmed.vn/storage/image/z5703534743434_0ec2421ee6b059fff6023532437a6c581722913646.jpg",
    link: "https://tapmed.vn/tin-tuc/tai-sao-cang-lon-tuoi-thi-nen-quan-tam-den-suc-khoe-100.html",
    content:
      "Sức khỏe là điều quý giá nhất, đặc biệt đối với người lớn tuổi. Để hỗ trợ sức khỏe của người cao tuổi, chúng tôi giới thiệu ba sản phẩm hữu ích: CEREKAN GILOBA, AKI MAXDUSEN và AKI ALBUMIN GOLD.",
  },
  {
    id: 97,
    title: "❓❓Hợp Tác Với Tapmed bạn được gì ?",
    imageUrl:
      "https://tapmed.vn/storage/image/z5700810154960_53dc2d09298a8b173e9cc11e2bd6cae11722839156.jpg",
    link: "https://tapmed.vn/tin-tuc/hop-tac-voi-tapmed-ban-duoc-gi-97.html",
    content:
      "Giải Quyết Khó Khăn Của Khách Hàng Trong Ngành Cung Ứng Thuốc Sỉ Trong ngành cung ứng thuốc sỉ, các nhà thuốc, phòng khám và dược sĩ thường gặp phải nhiều thách thức và khó khăn. Nhưng đừng lo lắng nhé. Vì",
  },
  {
    id: 96,
    title: "Bí Quyết Giữ Cho Phòng Khám Luôn Đủ Thuốc",
    imageUrl:
      "https://tapmed.vn/storage/image/tổng kết kinh doanh tháng 6 (2)1722395604.png",
    link: "https://tapmed.vn/tin-tuc/bi-quyet-giu-cho-phong-kham-luon-du-thuoc-96.html",
    content:
      "Đảm bảo phòng khám luôn đủ thuốc là một trong những yếu tố quan trọng giúp nâng cao chất lượng dịch vụ y tế v.............",
  },
];

const NewsItem: React.FC<{ post: NewsDataType }> = ({ post }) => (
  <div className="mb-8 hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg">
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full lg:w-5/12 md:w-6/12">
        <a
          className="block overflow-hidden rounded-lg"
          href={post.link}
          title={post.title}
        >
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
          />
        </a>
      </div>
      <div className="w-full lg:w-7/12 md:w-6/12 text-left">
        <h3 className="text-xl font-semibold mb-3">
          <a
            href={post.link}
            title={post.title}
            className="text-gray-800 hover:text-blue-600 transition-colors"
          >
            {post.title}
          </a>
        </h3>
        <div className="text-gray-600">{post.content}</div>
      </div>
    </div>
  </div>
);

const NewsList = () => {
  return (
    <div className="blogs-list">
      <div className="container">
        <div className="block-content">
          {listPosts.map((post) => (
            <NewsItem key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
