import Button from '../../ui/Button';
import { formatCurrency } from '../../utilities/helpers';
import PropTypes from 'prop-types';

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    unitPrice: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    soldOut: PropTypes.bool.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

function MenuItem({ pizza }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  console.log(pizza);
  return (
    <li className='flex p-2 space-x-3'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex grow flex-col'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto text-sm font-medium text-stone-100 uppercase flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-stone-500'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-stone-500'>Sold out</p>
          )}
          {!soldOut && <Button type='small'>Add To Cart</Button>}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
