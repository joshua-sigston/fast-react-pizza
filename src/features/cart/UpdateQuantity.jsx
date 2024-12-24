import PropTypes from 'prop-types';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseItem, increaseItem } from './cartSlice';

UpdateQuantity.propTypes = {
  pizzaId: PropTypes.number.isRequired,
  totalQuantity: PropTypes.number.isRequired,
};

export default function UpdateQuantity({ pizzaId, totalQuantity }) {
  const dispatch = useDispatch();
  return (
    <div className='flex gap-1 items-center md:gap-3'>
      <Button type='round' onClick={() => dispatch(increaseItem(pizzaId))}>
        +
      </Button>
      <span>{totalQuantity}</span>
      <Button type='round' onClick={() => dispatch(decreaseItem(pizzaId))}>
        -
      </Button>
    </div>
  );
}
