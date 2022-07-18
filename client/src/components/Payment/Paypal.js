import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingService from '../../services/booking.service';

const initialOptions = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'EUR',
};
const Paypal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const updateBooking = async () => {
    try {
      const updatedBooking = await BookingService.update(state._id, {payed: true})
      navigate('/pay/success', {state: {booking: updatedBooking.data.booking}});
    } catch (error) {
      console.log(error)
    }
  }

  return (

    <div className="flex flex-col items-center justify-center mt-10 p-5">
      <div className="text-3xl font-semibold ">How would you like to pay?</div>
      <div className=" text-lg mb-10"> Choose a payment method.</div>

      <div className="w-[60%] text-center">
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: state.price,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                updateBooking(details)
               
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Paypal;
