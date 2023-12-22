import { memo } from 'react';
import Button from '../../../ui/button/Button';

const RegisterFormFooter = memo(({ isSubmitting }) => {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="btn btn-theme btn--icon"
    >
      <i className="zwicon-checkmark"></i>
    </Button>
  );
});

export default RegisterFormFooter;
