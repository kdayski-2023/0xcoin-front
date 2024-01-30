import { useEffect } from 'react';
import Layout from '../../components/layout/Layout';
import MessageDialogServiceInstance from '../../services/message-dialog.service';
import useFormik from './hooks/useFormik';
import useContact from '../../hooks/useContact';
import MVoiceImg1 from '../../assets/img/images/m_voice_img01.png';
import MVoiceImg2 from '../../assets/img/images/m_voice_img02.png';
import MVoiceImg3 from '../../assets/img/images/m_voice_img03.png';
import MVoiceImg4 from '../../assets/img/images/m_voice_img04.png';
import MVoiceImg5 from '../../assets/img/images/m_voice_img05.png';
import ContactShape from '../../assets/img/images/contact_shape.png';

const Contact = () => {
  const { loading, error, success } = useContact();
  const formik = useFormik();

  useEffect(() => {
    if (success) {
      MessageDialogServiceInstance.showSuccess(
        'Your question was sent to support'
      );
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      MessageDialogServiceInstance.showError(error);
    }
  }, [error]);

  const handleChange = async (e, field) => {
    await formik.setFieldValue(field, e.target.value, false);
  };

  const handleSubmit = async (e) => {
    if (!loading) {
      e.preventDefault();
      await formik.validateForm();
      const isValid = formik.isValid;
      if (isValid) formik.handleSubmit();
    }
  };

  const ErrorComponent = ({ msg }) => {
    return (
      <span
        style={{
          color: 'red',
          fontSize: '12px',
          marginTop: '5px',
          display: 'block',
          position: 'absolute',
        }}
      >
        {msg}
      </span>
    );
  };

  return (
    <Layout
      headerStyle={1}
      footerStyle={1}
      breadcrumbTitle={
        <>
          {' '}
          Get in <span>Touch</span>{' '}
        </>
      }
    >
      <div>
        <section className="contact-area pb-140">
          <div className="container">
            <div className="contact-info-wrap">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-map-marker-alt" />
                    </div>
                    <div className="content">
                      <h2 className="title">Visit Us Daily</h2>
                      <p>
                        1791 Yorkshire Circle KittyNY <br /> 10002,USA
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-phone-volume" />
                    </div>
                    <div className="content">
                      <h2 className="title">Contact Us</h2>
                      <span>+ 1 008-345-6789</span>
                      <span>+1 800-789-4561</span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="contact-info-item">
                    <div className="icon">
                      <i className="fas fa-envelope" />
                    </div>
                    <div className="content">
                      <h2 className="title">Email Us</h2>
                      <span>Sotcoxinfo@example.com</span>
                      <span>Webyourinfo@gmail.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="contact-form-wrap">
                  <h2 className="title">
                    Do you have <span>question contact us</span>
                  </h2>
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="responds-wrap">
                        <ul className="list-wrap">
                          <li>
                            <img src={MVoiceImg1} alt="" />
                          </li>
                          <li>
                            <img src={MVoiceImg2} alt="" />
                          </li>
                          <li>
                            <img src={MVoiceImg3} alt="" />
                          </li>
                          <li>
                            <img src={MVoiceImg4} alt="" />
                          </li>
                          <li>
                            <img src={MVoiceImg5} alt="" />
                          </li>
                        </ul>
                        <p>Responds in 4-8 hours</p>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="contact-form">
                        <form action="#" onSubmit={handleSubmit}>
                          <div className="form-grp">
                            <input
                              type="text"
                              id="name"
                              placeholder="Your Name"
                              value={formik.values.name}
                              onChange={(e) => handleChange(e, 'name')}
                            />
                            {formik.errors.name && (
                              <ErrorComponent msg={formik.errors.name} />
                            )}
                          </div>
                          <div className="form-grp">
                            <input
                              type="email"
                              id="email"
                              placeholder="Your email*"
                              value={formik.values.email}
                              onChange={(e) => handleChange(e, 'email')}
                            />
                            {formik.errors.email && (
                              <ErrorComponent msg={formik.errors.email} />
                            )}
                          </div>
                          <div className="form-grp">
                            <input
                              type="text"
                              id="phone"
                              placeholder="Phone"
                              value={formik.values.phone}
                              onChange={(e) => handleChange(e, 'phone')}
                            />
                            {formik.errors.phone && (
                              <ErrorComponent msg={formik.errors.phone} />
                            )}
                          </div>
                          <div className="form-grp">
                            <textarea
                              name="message"
                              id="message"
                              placeholder="Please describe what you need*"
                              value={formik.values.description}
                              onChange={(e) => handleChange(e, 'description')}
                            />
                            {formik.errors.description && (
                              <ErrorComponent msg={formik.errors.description} />
                            )}
                          </div>
                          <button className="btn" type="submit">
                            submit here
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                  <div className="contact-shape">
                    <img src={ContactShape} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* contact-area-end */}
        {/* contact-map */}
        <div className="contact-map">
          <iframe
            title="sample"
            src="https://geo-devrel-javascript-samples.web.app/samples/style-array/app/dist/"
            allowFullScreen
            loading="lazy"
          />
        </div>
        {/* contact-map-end */}
      </div>
    </Layout>
  );
};
export default Contact;
