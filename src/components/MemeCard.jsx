import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MemeCard = ({ meme }) => {
  return (
    <motion.div 
      className="border rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-transform duration-200 hover:shadow-xl"
      whileHover={{ scale: 1.03 }}
    >
      <Link to={`/meme/${meme.id}`} className="block">
        <div className="relative">
          <img 
            src={meme.url} 
            alt={meme.name} 
            className="w-full h-48 object-cover rounded-t-2xl"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black/60 to-transparent w-full p-2">
            <h2 className="text-white text-lg font-semibold text-center truncate">
              {meme.name}
            </h2>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default MemeCard;
