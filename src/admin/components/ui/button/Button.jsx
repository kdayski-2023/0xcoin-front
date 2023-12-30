const Button = ({ children, className, disabled, ...rest }) => {
  return (
    <button {...rest} className="btn btn-theme">
      {children}
    </button>
  );
};

export default Button;
