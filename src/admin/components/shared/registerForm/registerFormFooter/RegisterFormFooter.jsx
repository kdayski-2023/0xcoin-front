import { memo } from 'react';
import Button from '../../../ui/button/Button';

const RegisterFormFooter = memo(({ isSubmitting }) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="admin-btn admin-btn-theme admin-btn--icon"
    >
      Submit {' '}
      <i className="admin-zwicon-checkmark"></i>
    </Button>
  );
});

export default RegisterFormFooter;
