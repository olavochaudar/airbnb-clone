import React from 'react';
import Item from '../Item';

const Home = () => {
  return (
    <section>
      <div className='gap-8 grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] mx-auto max-w-7xl  px-8 py-8'>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </div>
    </section>
  );
};

export default Home;
