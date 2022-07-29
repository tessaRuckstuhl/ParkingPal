import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useNavigate, useLocation } from 'react-router-dom';
import BookingService from '../../services/booking.service';
import { useErrorSnack } from '../../contexts/ErrorContext';
import PSService from '../../services/parkingSpace.service';

const initialOptions = {
  'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
  currency: 'EUR',
};
const Paypal = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showSnack } = useErrorSnack();

  const updateBooking = async () => {
    try {
      // update booking to payed:true
      const updatedBooking = await BookingService.update(state._id, { payed: true });
      // update availability slots of parking space
      const bookedParkingSpace = await PSService.listParkingSpace(state.parkingSpace);
      const newSlots = updateAvailability(state.startDate, state.endDate, bookedParkingSpace.data.availability);
      // persist new slots
      const updatedParkingSpace = await PSService.update(bookedParkingSpace.data._id,{availability: newSlots})
      navigate('/pay/success', { state: { booking: updatedBooking.data.booking } });
    } catch (error) {
      console.log(error);
      showSnack('Oooops, something went wrong trying to book this parking space...', 'error')
    }
  };

  const updateAvailability = (bookedFrom, bookedTo, availabilities) => {
    let newSlots = [...availabilities];
    let availabilityIndex = 0;

    for (let i = 0; i < availabilities.length; i++) {
      if (bookedFrom >= availabilities[i].from && bookedTo <= availabilities[i].to) {
        availabilityIndex = i;
        break;
      }
    }
    const bookedSlot = availabilities[availabilityIndex];
    if (
      Math.abs(new Date(bookedFrom) - new Date(bookedSlot.from)) /
        (1000 * 3600) >
      1
    ) {
      newSlots.splice(availabilityIndex, 1, { from: bookedSlot.from, to: bookedFrom });
      availabilityIndex++;
      
    } else {
      newSlots.splice(availabilityIndex, 1);
    }
    if (
      Math.abs(new Date(bookedTo) - new Date(bookedSlot.to)) /
        (1000 * 3600) >
      1
    ) {
      newSlots.splice(availabilityIndex, 0, { from: bookedTo, to: bookedSlot.to });
    } 
    return newSlots


  };

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
                updateBooking(details);
              });
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Paypal;
