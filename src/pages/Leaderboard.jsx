import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const likedMemes = JSON.parse(localStorage.getItem("likedMemes")) || [];
    const users = JSON.parse(localStorage.getItem("userEngagement")) || [];

    // Sort memes by likes (descending order) & get top 10
    const sortedMemes = [...likedMemes]
      .sort((a, b) => b.likes - a.likes)
      .slice(0, 10);

    // Sort users by engagement (descending order) & get top 10
    const sortedUsers = [...users]
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, 10);

    setTopMemes(sortedMemes);
    setTopUsers(sortedUsers);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">🏆 Leaderboard</h1>

      {/* Top 10 Most Liked Memes */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">🔥 Top 10 Most Liked Memes</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {topMemes.length === 0 ? (
            <p className="text-gray-500 text-center">No popular memes yet.</p>
          ) : (
            topMemes.map((meme, index) => (
              <motion.div key={index} className="relative group" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img src={meme.url} alt={`Meme ${index + 1}`} className="w-full rounded-lg object-cover" />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded-md text-sm">
                  ❤️ {meme.likes} Likes
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* User Rankings Based on Engagement */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">👑 Top 10 Engaged Users</h2>
        <ul className="space-y-3">
          {topUsers.length === 0 ? (
            <p className="text-gray-500 text-center">No active users yet.</p>
          ) : (
            topUsers.map((user, index) => (
              <motion.li
                key={index}
                className="p-3 flex justify-between items-center bg-gray-100 dark:bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="font-medium">{index + 1}. {user.name}</span>
                <span className="text-gray-600 dark:text-gray-400">🔥 {user.engagement} Points</span>
              </motion.li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
