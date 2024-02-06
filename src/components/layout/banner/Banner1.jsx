import useContent from 'hooks/useContent';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { CONTENT_ID } from 'utils/content';

const Banner1 = () => {
  const { content } = useContent();

  return (
    <section className="banner-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="banner-content ta-animated-headline">
              <h2
                className="title ah-headline wow fadeInUp"
                data-wow-delay=".2s"
              >
                <div id={CONTENT_ID.HEADER_BANNER}>
                  {content[CONTENT_ID.HEADER_BANNER] ||
                    'Your Personal trade Ai assistent'}
                </div>
                <Typewriter
                  tag="span"
                  options={{
                    wrapperClassName: 'ah-words-wrapper',
                    strings: ['News', 'Blockchain', 'Analysis'],
                    autoStart: true,
                    loop: true,
                    delay: 75,
                    typeSpeed: 10,
                  }}
                />
              </h2>
              <h2 className="title d-none wow fadeInUp" data-wow-delay=".2s">
                Whatever You want to ask- 0xCoin has the <span>Answers,</span>{' '}
                <span>Solutions</span>
              </h2>
              {/* <p className="wow fadeInUp" data-wow-delay=".4s">
                Artificial intelligence makes it fast easy to create content for
                your blog, social media, website, and more! Rated 5/5 stars in
                3,000+ reviews.
              </p> */}

              <div className="banner-btn" style={{ marginTop: '60px' }}>
                <Link
                  to="/login"
                  className="gradient-btn wow fadeInLeft"
                  data-wow-delay=".6s"
                >
                  start a free trial
                </Link>
                <Link
                  to="/work"
                  className="gradient-btn gradient-btn-two wow fadeInRight"
                  data-wow-delay=".6s"
                >
                  how 0xCoin work
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner1;
