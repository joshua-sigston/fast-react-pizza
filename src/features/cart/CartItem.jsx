import { formatCurrency } from '../../utilities/helpers';
import PropTypes from 'prop-types';
import DeleteItem from './DeleteItem';

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
  }),
};

function CartItem({ item }) {
  const { name, quantity, totalPrice, pizzaId } = item;

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
      <DeleteItem pizzaId={pizzaId} />
    </li>
  );
}

export default CartItem;
