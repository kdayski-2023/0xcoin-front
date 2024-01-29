const Button = ({ children, className, disabled, ...rest }) => {
  return (
    <button {...rest} className="admin-btn admin-btn-theme">
      {children}
    </button>
  );
};

export default Button;
