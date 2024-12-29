// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utilities/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';

// const order = {
//   id: 'ABCDEF',
//   customer: 'Jonas',
//   phone: '123456789',
//   address: 'Arroios, Lisbon , Portugal',
//   priority: true,
//   estimatedDelivery: '2027-04-25T10:00:00',
//   cart: [
//     {
//       pizzaId: 7,
//       name: 'Napoli',
//       quantity: 3,
//       unitPrice: 16,
//       totalPrice: 48,
//     },
//     {
//       pizzaId: 5,
//       name: 'Diavola',
//       quantity: 2,
//       unitPrice: 16,
//       totalPrice: 32,
//     },
//     {
//       pizzaId: 3,
//       name: 'Romana',
//       quantity: 1,
//       unitPrice: 15,
//       totalPrice: 15,
//     },
//   ],
//   position: '-9.000,38.000',
//   orderPrice: 95,
//   priorityPrice: 19,
// };

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  // eslint-disable-next-line no-unused-vars
  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state) fetcher.load('/menu');
  }, [fetcher]);
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  console.log(order);
  return (
    <div className='p-3 space-y-5'>
      <div className='flex flex-wrap justify-between items-center sm:space-y-2'>
        <h2 className='font-bold'>Order number {id} status</h2>

        <div className='text-sm space-x-2'>
          {priority && (
            <span className='bg-red-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-red-50'>
              Priority
            </span>
          )}
          <span className='bg-green-500 rounded-full py-1 px-3 text-sm uppercase font-semibold tracking-wide text-green-50'>
            {status} order
          </span>
        </div>
      </div>

      <div className=' p-3 flex flex-wrap justify-between items-center sm:space-y-2 bg-sky-200'>
        <p className='font-bold'>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className='tracking-wider'>
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className='dive-stone-200 divide-y border-b border-t'>
        {cart.map((item, i) => (
          <OrderItem
            item={item}
            key={i}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className='bg-sky-300 p-2 divide-y space-y-2'>
        <p>Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className='py-1'>
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className='py-1'>
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
