import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <section className='flex items-center'>
      <div className='mx-auto flex max-w-96 flex-col items-center gap-4 w-full '>
        <h1 className='text-3xl font-bold'>Faça seu Login</h1>

        <form className='flex flex-col gap-2 w-full'>
          <input
            type='email'
            className=' rounded-full border border-gray-300 px-4 py-2 w-full'
            placeholder='Digite se E-mail'
          />
          <input
            type='password'
            className=' rounded-full border border-gray-300 px-4 py-2 w-full'
            placeholder='Digite sua senha'
          />

          <button className=' rounded-full border border-gray-300 px-4 py-2 w-full cursor-pointer bg-primary-400 font-bold text-white'>
            Login
          </button>
        </form>

        <p>
          Ainda não tem uma conta?{''}
          <Link to='register' className='underline font-semibold'>
            Registre-se aqui!
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
