import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const memeImages = [
  "/memes/404-1.jpg",
  "/memes/404-2.jpg",
  "/memes/404-3.jpg",
  "/memes/404-4.jpg",
];

const NotFound = () => {
  const [randomMeme, setRandomMeme] = useState(memeImages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomMeme(memeImages[Math.floor(Math.random() * memeImages.length)]);
    }, 3000); // Change meme every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white p-6 relative overflow-hidden">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full opacity-50"
            style={{
              width: `${Math.random() * 4}px`,
              height: `${Math.random() * 4}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 20],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
          />
        ))}
      </div>

      {/* 404 Text with Animation */}
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
      
      {/* Meme Image with Carousel Effect */}
      <motion.img
        src={randomMeme}
        alt="Funny Meme"
        className="w-80 h-auto rounded-lg shadow-lg"
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5 }}
      />
      
      <p className="mt-4 text-lg">Oops! Looks like you're lost in the meme universe. 🤣</p>
      
      {/* Home Button with Animated Hover Effect */}
      <Link to="/">
        <motion.button
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg text-lg hover:bg-blue-600 transition"
          whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
          transition={{ duration: 0.3 }}
        >
          Go Home 🏠
        </motion.button>
      </Link>
    </div>
  );
};

export default NotFound;
