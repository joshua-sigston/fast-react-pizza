import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import PropTypes from 'prop-types';

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }),
};

function CartItem({ item }) {
  const { name, quantity, totalPrice } = item;

  return (
    <li className='flex items-end justify-between p-3'>
      <div>
        <p>
          {quantity}&times; {name}
        </p>
        <div>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
      <Button type='danger'>Delete</Button>
    </li>
  );
}

export default CartItem;
