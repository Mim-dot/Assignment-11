import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaTools, FaLightbulb } from "react-icons/fa";

const Abouts = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">About Us</h2>
        <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          Welcome to TaskLink — a modern platform where curiosity meets creativity. We empower users to share insights, explore trending topics, and connect with digital creators.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Mission */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition"
        >
          <FaLightbulb className="text-4xl text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            To provide a seamless space for users to discover, share, and engage with impactful digital content.
          </p>
        </motion.div>

        {/* Team */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition"
        >
          <FaUsers className="text-4xl text-pink-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Our Team</h3>
          <p className="text-gray-600 dark:text-gray-300">
            We're a passionate group of developers, designers, and writers committed to building experiences that matter.
          </p>
        </motion.div>

        {/* Innovation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center transition"
        >
          <FaTools className="text-4xl text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Innovation</h3>
          <p className="text-gray-600 dark:text-gray-300">
            From dark mode to real-time updates, we continuously improve with user feedback and fresh ideas.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Abouts;
