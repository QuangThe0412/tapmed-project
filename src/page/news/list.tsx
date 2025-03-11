import "./news.css";
import { NewsDataType } from "./news";

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

const ListComponent: React.FC<{ data: NewsDataType[] }> = ({ data }) => {
  return (
    <div className="blogs-list">
      <div className="container">
        <div className="block-content">
          {data && data.map((post) => <NewsItem key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
