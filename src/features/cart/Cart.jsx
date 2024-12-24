import { useDispatch, useSelector } from 'react-redux';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import { getUser } from '../user/userSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const username = useSelector(getUser);
  const cart = useSelector(getCart);
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='h-[100%] p-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2>Your cart, {username}</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b space-y-3'>
        {cart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </ul>
      <div className='flex justify-between items-center pt-3'>
        <LinkButton to='/order/new'>Order pizzas</LinkButton>

        <button onClick={() => dispatch(clearCart)}>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
