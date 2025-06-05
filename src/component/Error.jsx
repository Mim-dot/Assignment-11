import React from 'react';
import { Link } from 'react-router-dom'; // use react-router-dom for web projects
import { motion } from 'framer-motion';

const Error = () => {
  document.title = "Error";

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-center m-10 min-h-[80vh] flex flex-col justify-center items-center"
    >
      <h1 className="font-[700] text-[24px] m-4">No Data Found !!!</h1>
      <p className="text-[16px] text-[rgba(15,15,15,0.7)] m-4">
        Sorry, the page you're looking for doesn't exist.
      </p>

      <motion.img
        className="w-80 my-4"
        src="https://i.ibb.co/yFRFn6nW/Error.jpg"
        alt="Error illustration"
        initial={{ y: -10 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      />

      <Link to="/">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer bg-blue-800 w-40 h-9 text-white rounded-md shadow-md"
        >
          Go To Home Page
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default Error;
