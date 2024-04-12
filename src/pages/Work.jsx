import Layout from '../components/layout/Layout';
import { CONTENT_ID } from 'utils/content';
import useContent from 'hooks/useContent';

const Work = () => {
  const { content } = useContent();

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={
        <div
          dangerouslySetInnerHTML={{
            __html:
              content[CONTENT_ID.HEADER_WORK] || 'How it’s <span>Work</span>',
          }}
        />
      }
    >
      <section className="work-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div
                className="work-item"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="work-thumb">
                  <img src="assets/img/images/work_img01.jpg" alt="" />
                </div>
                <div className="work-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content[CONTENT_ID.STEP1_WORK] || 'Step 1',
                    }}
                  />
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TITLE1_WORK] ||
                        '0xCoin Chat - Your AI Companion',
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TEXT1_WORK] ||
                        '0xCoin is an advanced AI system that leverages cutting-edge technologies and the latest Google data to provide accurate responses to every request. With its vast knowledge base and powerful algorithms,',
                    }}
                  />
                </div>
              </div>
              <div
                className="work-item"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="work-thumb">
                  <img src="assets/img/images/work_img02.jpg" alt="" />
                </div>
                <div className="work-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content[CONTENT_ID.STEP2_WORK] || 'Step 2',
                    }}
                  />
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TITLE2_WORK] ||
                        'How AI Became Our Greatest Co-Worker',
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TEXT2_WORK] ||
                        'Are you struggling to stay on top of all your business tasks and responsibilities? Do you find yourself bogged down by administrative work and unable to focus on your core business activities? If so,',
                    }}
                  />
                </div>
              </div>
              <div
                className="work-item"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="work-thumb">
                  <img src="assets/img/images/work_img03.jpg" alt="" />
                </div>
                <div className="work-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content[CONTENT_ID.STEP3_WORK] || 'Step 3',
                    }}
                  />
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TITLE3_WORK] ||
                        'Inspiration to Creation the Creative Art Maker',
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TEXT3_WORK] ||
                        "In today's digital age, creating visually appealing images is more important than ever. From social media posts to marketing materials, the right images can make all the difference in capturing the attention",
                    }}
                  />
                </div>
              </div>
              <div
                className="work-item"
                data-aos="fade-up"
                data-aos-anchor-placement="top-bottom"
              >
                <div className="work-thumb">
                  <img src="assets/img/images/work_img04.jpg" alt="" />
                </div>
                <div className="work-content">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: content[CONTENT_ID.STEP4_WORK] || 'Step 4',
                    }}
                  />
                  <h2
                    className="title"
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TITLE4_WORK] ||
                        'Prompt Library - AI for Community',
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        content[CONTENT_ID.TEXT4_WORK] ||
                        'Artificial intelligence is a powerful tool that can help businesses of all sizes solve complex problems, automate routine tasks, and gain valuable insights into their operations. However, the reality is that not many',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
export default Work;
