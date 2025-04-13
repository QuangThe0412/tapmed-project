import { generateSlug } from "@src/utils/common";
import "./news.css";
import { BlogType } from "@src/types/typeBlog";

const NewsItem: React.FC<{ post: BlogType }> = ({ post }) => {
  const { id, title, image, content } = post;

  const slug = generateSlug(title);
  const blogtUrl = `/news/${slug}-${id}.html`;

  return (
    <div className="mb-8 hover:shadow-lg transition-shadow duration-300 p-4 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full lg:w-5/12 md:w-6/12">
          <a
            className="block overflow-hidden rounded-lg"
            href={blogtUrl}
            title={title}
          >
            <img
              src={image}
              alt={title}
              className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
            />
          </a>
        </div>
        <div className="w-full lg:w-7/12 md:w-6/12 text-left">
          <h3 className="text-xl font-semibold mb-3">
            <a
              href={blogtUrl}
              title={title}
              className="text-gray-800 hover:text-blue-600 transition-colors"
            >
              {title}
            </a>
          </h3>
          <div className="text-gray-600">{content}</div>
        </div>
      </div>
    </div>
  );
};

const ListComponent: React.FC<{ data: BlogType[] }> = ({ data }) => {
  return (
    <div className="blogs-list">
      <div className="container">
        <div className="block-content">
          {data && data?.map((post) => <NewsItem key={post.id} post={post} />)}
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
