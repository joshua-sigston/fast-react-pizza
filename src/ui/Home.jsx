import { useSelector } from 'react-redux';
import { CreateUser } from '../features';
import LinkButton from './LinkButton';

function Home() {
  const username = useSelector((state) => state.user.username);
  return (
    <div className='flex flex-col items-center justify-center text-center bg-slate-200 space-y-5 pt-3 pb-3 h-[100%]'>
      <h1 className='font-semibold'>
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>

      {username === '' ? (
        <CreateUser />
      ) : (
        <LinkButton to='/menu'>Continue ordering, {username}</LinkButton>
      )}
    </div>
  );
}

export default Home;
