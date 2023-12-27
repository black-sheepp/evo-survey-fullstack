import React from 'react';
import Styles from './Loader.module.css';

function Loader() {
  return (
    <div className='flex justify-center items-center h-full'>
      <div className={Styles.spinner} />
    </div>
  );
}

export default Loader;
