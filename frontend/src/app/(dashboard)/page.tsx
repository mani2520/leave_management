import React from 'react';

const page = () => {
  return (
    <div className='bg-background min-h-screen text-foreground transition-colors duration-300'>
      <div className='mx-auto p-8 container'>
        <h1 className='mb-4 font-bold text-3xl'>Welcome</h1>
        <p className='text-muted-foreground'>This is the home page.</p>
      </div>
    </div>
  );
};

export default page;
