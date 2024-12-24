import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalAmount, getTotalQuantity } from './cartSlice';
import { formatCurrency } from '../../utilities/helpers';

function CartOverview() {
  const totalQuantity = useSelector(getTotalQuantity);
  const totalCost = useSelector(getTotalAmount);

  if (!totalQuantity) return null;

  return (
    <div className='bg-cyan-400 flex justify-between p-3'>
      <p className='space-x-3'>
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalCost)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
