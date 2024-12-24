import { formatCurrency } from '../../utilities/helpers';
import PropTypes from 'prop-types';
import DeleteItem from './DeleteItem';
import UpdateQuantity from './UpdateQuantity';
import { getQuantity } from './cartSlice';
import { useSelector } from 'react-redux';

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
  const totalQuantity = useSelector(getQuantity(pizzaId));

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
      <UpdateQuantity pizzaId={pizzaId} totalQuantity={totalQuantity} />
      <DeleteItem pizzaId={pizzaId} totalQuantity={totalQuantity} />
    </li>
  );
}

export default CartItem;
