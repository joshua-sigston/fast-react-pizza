import { formatCurrency } from '../../utilities/helpers';

import PropTypes from 'prop-types';

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number,
    name: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,

  isLoadingIngredients: PropTypes.bool.isRequired,
  ingredients: PropTypes.array.isRequired,
};

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className='p-3'>
      <div className='flex items-center justify-between gap-4 text-sm font-bold'>
        <p>
          <span>{quantity}&times;</span> {name}
        </p>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
      <p className='text-sm capitalize italic text-stone-500'>
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
