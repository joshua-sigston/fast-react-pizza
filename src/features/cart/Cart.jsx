import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className='h-[100%] p-3'>
      <LinkButton to='/menu'>&larr; Back to menu</LinkButton>

      <h2>Your cart, %NAME%</h2>

      <ul className='mt-3 divide-y divide-stone-200 border-b space-y-3'>
        {cart.map((item, i) => (
          <CartItem item={item} key={i} />
        ))}
      </ul>
      <div className='flex justify-between items-center pt-3'>
        <LinkButton to='/order/new'>Order pizzas</LinkButton>

        <button>Clear cart</button>
      </div>
    </div>
  );
}

export default Cart;
