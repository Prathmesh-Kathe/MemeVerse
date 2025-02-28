import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHeart, FaRegHeart, FaShareAlt, FaTrash } from "react-icons/fa";
import axios from "axios";

const MemeDetails = () => {
  const { id } = useParams();
  const [meme, setMeme] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const response = await axios.get("https://api.imgflip.com/get_memes");
        const memeData = response.data.data.memes.find(m => m.id.toString() === id);

        if (memeData) {
          setMeme(memeData);
          setLikes(Number(localStorage.getItem(`likes-${id}`)) || 0);
          setLiked(JSON.parse(localStorage.getItem(`liked-${id}`)) || false);
          setComments(JSON.parse(localStorage.getItem(`comments-${id}`)) || []);
        }
      } catch (error) {
        console.error("Error fetching meme:", error);
      }
    };

    fetchMeme();
  }, [id]);

  // Corrected Like Function
  const toggleLike = () => {
    const newLikedState = !liked;
    setLiked(newLikedState);

    const newLikes = newLikedState ? likes + 1 : likes - 1;
    setLikes(newLikes);

    // Update localStorage
    localStorage.setItem(`liked-${id}`, JSON.stringify(newLikedState));
    localStorage.setItem(`likes-${id}`, newLikes);

    let storedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];

    if (newLikedState) {
      if (!storedLikes.some(m => m.id === meme.id)) {
        storedLikes.push(meme);
      }
    } else {
      storedLikes = storedLikes.filter(m => m.id !== meme.id);
    }

    localStorage.setItem("likedMemes", JSON.stringify(storedLikes));
  };

  const addComment = () => {
    if (newComment.trim() === "") return;
    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const deleteComment = (index) => {
    const updatedComments = comments.filter((_, i) => i !== index);
    setComments(updatedComments);
    localStorage.setItem(`comments-${id}`, JSON.stringify(updatedComments));
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!meme) return <p className="text-center">Meme not found!</p>;

  return (
    <div className="p-6 max-w-screen-md mx-auto">
      <motion.h1 
        className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Meme Details
      </motion.h1>
      
      <div className="border rounded-lg p-6 bg-white dark:bg-gray-800 shadow-md">
        <img src={meme.url} alt={meme.name} className="w-full rounded-md mb-4" />
        
        {/* Like & Share Buttons */}
        <div className="flex items-center justify-between">
          <motion.button
            onClick={toggleLike}
            className="flex items-center space-x-2 text-red-500 text-lg"
            whileTap={{ scale: 1.2 }}
          >
            {liked ? <FaHeart className="animate-bounce" /> : <FaRegHeart />} 
            <span>{likes}</span>
          </motion.button>

          <motion.button 
            onClick={copyLink} 
            className="flex items-center space-x-2 text-blue-500 relative"
            whileTap={{ scale: 1.1 }}
          >
            <FaShareAlt /> <span>Share</span>
            {copied && (
              <motion.span 
                className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-sm p-1 rounded-md"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                Link Copied!
              </motion.span>
            )}
          </motion.button>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Comments</h2>
          <div className="space-y-3">
            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              comments.map((comment, index) => (
                <div key={index} className="flex justify-between items-center p-2 bg-gray-200 dark:bg-gray-700 rounded-md">
                  <span>{comment}</span>
                  <button onClick={() => deleteComment(index)} className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Input */}
          <div className="mt-3 flex">
            <input 
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 border rounded-l-md dark:bg-gray-800 dark:text-white"
              placeholder="Add a comment..."
            />
            <button 
              onClick={addComment}
              className="bg-green-500 text-white px-4 py-2 rounded-r-md hover:bg-green-600"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeDetails;
