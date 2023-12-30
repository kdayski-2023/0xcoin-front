import { useEffect, useState } from 'react';
import { SUBSCRIPTION_COST } from '../../../constants/index.constants';
import Button from '../../ui/button/Button';
import './Subscription.scss';
import WalletService from '../../../../services/wallet.service';
import { isMobile } from '../../../../lib/lib';
import useWallet from '../../../../hooks/useWallet';
import Web3Service from '../../../../services/web3.service';
import MessageDialogService from '../../../../services/message-dialog.service';

const Subscription = ({ subscription }) => {
  const { providerType, connected } = useWallet();
  const [daysLeft, setDaysLeft] = useState(null);
  const [isRenewalVisible, setIsRenewalVisible] = useState(false);
  const [provider, setProvider] = useState(providerType);

  useEffect(() => {
    isMobile() ? setProvider('wc') : setProvider('mm');
  }, []);

  useEffect(() => {
    const now = Math.floor(Date.now() / 1000);
    const secondsLeft = subscription.endTimestamp - now;
    const daysLeft = Math.ceil(secondsLeft / (24 * 60 * 60));
    setDaysLeft(daysLeft);
  }, [subscription]);

  const handleRenewal = async () => {
    console.log('Initiating renewal process...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('Renewal process complete. Subscription extended.');
  };

  const handlePayment = async () => {
    try {
      if (!connected) {
        await WalletService.connect(provider);
      }
      await Web3Service.depositUSDC(20);
      MessageDialogService.showSuccess('success');
    } catch (e) {
      MessageDialogService.showError('failed');
      console.log(e);
    }
  };

  return (
    <div className="card subscription">
      <div className="card-body">
        <div>
          {subscription.payed ? (
            <>
              <p className="subscription__period">{`Days left: ${daysLeft}`}</p>
              <Button onClick={() => setIsRenewalVisible(true)}>
                Renew subscription
              </Button>
            </>
          ) : (
            <>
              <p className="subscription__period">{`Subscription cost: $${SUBSCRIPTION_COST} per month`}</p>
              <Button onClick={() => handlePayment()}>Subscribe now</Button>
            </>
          )}

          {isRenewalVisible && (
            <>
              <p className="subscription__period">{`Renewal cost: $${SUBSCRIPTION_COST} per month`}</p>
              <Button onClick={() => handleRenewal()}>Renew now</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
