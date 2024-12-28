import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalAmount } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utilities/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: 'Mediterranean',
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: 'Vegetale',
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: 'Spinach and Mushroom',
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalAmount);
  const priorityPrice = withPriority ? totalPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();
  const isLoadingAdress = addressStatus === 'loading';

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='h-[100%] flex flex-col justify-center items-center space-y-3'>
      <h2>Ready to order? Lets go!</h2>

      <Form
        method='POST'
        className='w-[100%] flex flex-col items-center space-y-3'
      >
        <div className='input-container'>
          <label>First Name</label>
          <input
            type='text'
            name='customer'
            defaultValue={username}
            className='input'
            required
          />
        </div>

        <div className='input-container'>
          <label>Phone number</label>
          <div>
            <input type='tel' name='phone' className='input' required />
          </div>
          {formErrors?.phone && (
            <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
              {formErrors.phone}
            </p>
          )}
        </div>

        <div className='input-container'>
          <label>Address</label>
          <div>
            <input
              type='text'
              name='address'
              className='input'
              disabled={isLoadingAdress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <Button
              type='small'
              disabled={isLoadingAdress}
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Position
            </Button>
          )}
        </div>

        <div className='flex items-center space-x-2'>
          <label htmlFor='priority'>Want to yo give your order priority?</label>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAdress} type='primary'>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = 'Please fill out your phone number';
  }

  if (Object.keys(errors).length > 0) return errors;

  console.log(order);

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
