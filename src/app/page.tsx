import React from 'react';
import Hero from './components/Hero';
import Contact from './components/Contact';

const page = () => {
  return (
    <div id='bg' className='flex flex-col md:flex-row justify-center items-center'>
      <Hero />
      <Contact />
    </div>
  );
};

export default page;
