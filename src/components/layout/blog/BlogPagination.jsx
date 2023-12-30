import { Link } from 'react-router-dom';

const BlogPagination = () => {
  return (
    <div className="blog-pev-next-wrap">
      <ul className="list-wrap">
        <li>
          <Link to="/blog">
            <i className="far fa-arrow-left"></i>Previous
          </Link>
        </li>
        <li className="next-post">
          <Link to="/blog">
            <i className="far fa-arrow-right"></i>Next
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default BlogPagination;
