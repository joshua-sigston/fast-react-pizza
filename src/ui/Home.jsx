import { CreateUser } from '../features';

function Home() {
  return (
    <div className='flex flex-col items-center justify-center text-center bg-slate-200 space-y-5 pt-3 pb-3 h-[100%]'>
      <h1 className='font-semibold'>
        The best pizza.
        <br />
        Straight out of the oven, straight to you.
      </h1>

      <CreateUser />
    </div>
  );
}

export default Home;
