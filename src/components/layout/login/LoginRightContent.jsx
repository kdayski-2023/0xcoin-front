import LoginImg from '../../../assets/img/images/login_img.png';

export default function LoginRightContent() {
  return (
    <div className="col-lg-7">
      <div className="login-right-content-wrap">
        <div
          className="login-right-bg"
          data-background="assets/img/bg/error_bg.jpg"
        />
        <div className="login-right-content-inner">
          <img width={506} height={487} src={LoginImg} alt="" />
          <h4 className="title">
            Try <span>0xCoin today</span>
          </h4>
        </div>
      </div>
    </div>
  );
}
