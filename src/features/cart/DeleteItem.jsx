import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import PropTypes from 'prop-types';

DeleteItem.propTypes = {
  pizzaId: PropTypes.number.isRequired,
};

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type='danger' onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
