import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import './NewsItem.scss';

const NewsItem = ({ news }) => {
  return (
    <li className="listview__item">
      <div className="checkbox-char news__item">
        <input type="checkbox" id="char" />
        <label htmlFor="char">
          {news.isGrowing === true ? (
            <FontAwesomeIcon icon={faArrowUp} style={{ color: '#46e203' }} />
          ) : (
            <FontAwesomeIcon icon={faArrowDown} style={{ color: '#ff0040' }} />
          )}
        </label>
        <span className="news__price">{news.price}$</span>
        <div className="listview__content">
          <p>{news.date}</p>
          <div className="listview__heading">{news.title}</div>
          <p>{news.source}</p>
          <div className="listview__attrs">
            {news.tags.map((news) => (
              <span key={news.id} className="news__tag">
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
