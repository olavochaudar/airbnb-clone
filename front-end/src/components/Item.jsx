import React from 'react';

const Item = () => {
  return (
    <a href='/' className='flex flex-col gap-2'>
      <img
        src='https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTQ3MDMyOTQ0NzkxNzU4ODEyNg==/original/9e52ab81-e8fe-430d-99e2-8467711634ba.jpeg?im_w=240'
        className='aspect-square object-cover rounded-2xl'
      />
      <div>
        <h3 className='text-xl font-semibold'>Apartamento em Bertioga</h3>
        <p className='truncate text-gray-600'>
          4 hóspedes, quartos, 3 camas, 2 banheiros
        </p>
      </div>
      <p>
        <span className='font-semibold'>R$ 550 </span> por noite
      </p>
    </a>
  );
};

export default Item;
