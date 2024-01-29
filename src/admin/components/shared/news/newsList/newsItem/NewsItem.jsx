import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './NewsItem.scss';

const NewsItem = ({ news }) => {
  return (
    <li className="admin-listview__item">
      <div className="admin-checkbox-char admin-news__item">
        <input type="checkbox" id="char" />

        <div className="admin-img">
          <img src={news.img} alt="" width={100} />
          <div className="admin-price">
            <label htmlFor="char" className="admin-label">
              {news.isGrowing === true && (
                <FontAwesomeIcon
                  icon={faArrowUp}
                  style={{ color: '#46e203' }}
                />
              )}
              {news.isGrowing === false && (
                <FontAwesomeIcon
                  icon={faArrowDown}
                  style={{ color: '#ff0040' }}
                />
              )}
              {news.isGrowing === undefined && <span>~</span>}
            </label>
            <span className="admin-news__price">{news.price}$</span>
          </div>
        </div>

        <div className="admin-listview__content">
          <p>{news.date}</p>
          <div className="admin-listview__heading">{news.title}</div>
          <p>{news.source}</p>
          <div className="admin-listview__attrs">
            {news.tags.map((news) => (
              <span key={news.id} className="admin-news__tag">
                {news.tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
};

export default NewsItem;
