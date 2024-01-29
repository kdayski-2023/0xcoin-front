import { useEffect, useState } from 'react';
import { SUBSCRIPTION_COST } from '../../../constants/index.constants';
import Button from '../../ui/button/Button';
import './Subscription.scss';
import MessageDialogService from '../../../../services/message-dialog.service';
import Pricing from './Pricing';
import useSubscription from '../../../../hooks/useSubscription';
import SubscriptionServiceInstance from '../../../../services/subscription.service';
import MessageDialogServiceInstance from '../../../../services/message-dialog.service';

const Subscription = () => {
  const [daysLeft, setDaysLeft] = useState(null);
  const { subscription, loading, error, prices } = useSubscription();

  useEffect(() => {
    if (error) MessageDialogServiceInstance.showError(error);
  }, [error]);

  useEffect(() => {
    SubscriptionServiceInstance.getData();
  }, []);

  useEffect(() => {
    if (subscription) {
      setDaysLeft(subscription.duration);
    }
  }, [subscription]);

  const handlePayment = async () => {
    MessageDialogService.showSuccess(<Pricing prices={prices} />, '');
  };

  return (
    <div className="admin-card admin-subscription">
      <div className="admin-card-body">
        {loading && <div>loading...</div>}
        {!loading && (
          <div className="admin-subscription__wrapper">
            {subscription ? (
              <>
                <p className="admin-subscription__period">{`Days left: ${daysLeft}`}</p>
                <Button onClick={() => handlePayment()} disabled={loading}>
                  Renew subscription
                </Button>
              </>
            ) : (
              <>
                <p className="admin-subscription__period">{`Subscription cost: $${SUBSCRIPTION_COST} per month`}</p>
                <Button onClick={() => handlePayment()} disabled={loading}>
                  Subscribe now
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscription;
