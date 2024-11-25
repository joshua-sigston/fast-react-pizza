import Header from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className='h-screen grid grid-rows-[auto_1fr_auto]'>
      <Header />
      <main className='overflow-scroll relative'>
        {isLoading && <Loader />}
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
