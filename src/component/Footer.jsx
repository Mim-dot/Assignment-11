import React from 'react';
import { motion } from 'framer-motion';

const floatingVariants = {
  animate: {
    x: [0, 40, -40, 0],
    y: [0, -30, 30, 0],
    rotate: [0, 15, -15, 0],
    scale: [1, 1.05, 0.95, 1],
    transition: {
      duration: 25,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const floatingVariants2 = {
  animate: {
    x: [0, -30, 30, 0],
    y: [0, 30, -30, 0],
    rotate: [0, -10, 10, 0],
    scale: [1, 1.1, 0.9, 1],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: 'easeInOut',
      delay: 10,
    },
  },
};

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-white text-black py-20 px-6 ">
      {/* Floating background blobs */}
      <motion.div
        className="hidden md:block absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-25 z-0"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div
        className="hidden md:block absolute bottom-[-130px] right-[-100px] w-[280px] h-[280px] bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500 rounded-full blur-2xl opacity-20 z-0"
        variants={floatingVariants2}
        animate="animate"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-3 gap-16">
       
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold tracking-wide">Lilo</h2>
          <p className="mt-3 text-sm text-gray-800 footer-p">
            Stay with Us and Be Safe
          </p>
        </motion.div>

        
        <motion.div
          className="flex flex-col space-y-2 text-sm"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <a href="#" className="hover:text-indigo-400 transition-colors duration-300 footer-a">About Us</a>
          <a href="#" className="hover:text-indigo-400 transition-colors duration-300 footer-a">Contact</a>
          <a href="#" className="hover:text-indigo-400 transition-colors duration-300 footer-a">Terms & Conditions</a>
        </motion.div>

       
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <motion.a
            href="#"
            aria-label="Twitter"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neutral-800 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition motion-footer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <title>Twitter</title>
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53C19.86 3.14 18.29 2 16.5 2c-3.18 0-5.63 3.02-4.9 6.09C8.25 8.03 5.48 6.13 3.74 3.48c-.84 1.45-.42 3.34 1.02 4.3a4.52 4.52 0 01-2.07-.57c-.05 1.99 1.38 3.86 3.45 4.28A4.48 4.48 0 012 12v.05c1.51 1.04 3.3 1.63 5.22 1.67a9.03 9.03 0 01-5.6 1.94c-.37 0-.73-.02-1.09-.06A12.8 12.8 0 008.29 21c7.55 0 11.68-6.26 11.68-11.69 0-.18 0-.35-.01-.53A8.18 8.18 0 0023 3z" />
            </svg>
          </motion.a>

          <motion.a
            href="#"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.3, rotate: 10 }}
            whileTap={{ scale: 0.95 }}
            className="bg-neutral-800 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg transition motion-footer"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <title>LinkedIn</title>
              <path d="M4.98 3.5a2.5 2.5 0 11.01 5.001A2.5 2.5 0 014.98 3.5zM2 9h6v12H2zM9 9h5.5v1.69h.08a6 6 0 015.42-2.98c5.82 0 6.9 3.83 6.9 8.81V21h-6v-6.42c0-1.53-.03-3.5-2.13-3.5-2.13 0-2.46 1.66-2.46 3.38V21h-6z" />
            </svg>
          </motion.a>
        </motion.div>
      </div>

     
      <motion.div
        className="text-xs text-center text-gray-500 mt-16 border-t border-neutral-800 pt-6 footer-all"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        © {new Date().getFullYear()} Lilo. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
