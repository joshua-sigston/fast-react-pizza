import { Link } from 'react-router-dom';
import { SearchOrder } from '../features';

export default function Header() {
  return (
    <header className='bg-rose-500 flex justify-between p-3 items-center'>
      <Link to='/' className='tracking-widest'>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
    </header>
  );
}
