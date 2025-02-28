import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaHeartBroken, FaCamera } from "react-icons/fa";

const UserProfile = () => {
  const [userName, setUserName] = useState("Meme Lover");
  const [bio, setBio] = useState("I love memes! 😂");
  const [profilePic, setProfilePic] = useState("/default-avatar.png");
  const [banner, setBanner] = useState("/default-banner.jpg");
  const [uploadedMemes, setUploadedMemes] = useState([]);
  const [likedMemes, setLikedMemes] = useState([]);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("userProfile"));
    const savedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const savedLikes = JSON.parse(localStorage.getItem("likedMemes")) || [];

    if (savedUser) {
      setUserName(savedUser.name);
      setBio(savedUser.bio);
      setProfilePic(savedUser.profilePic);
      setBanner(savedUser.banner || "/default-banner.jpg");
    }
    setUploadedMemes(savedMemes);
    setLikedMemes(savedLikes);
  }, []);

  const saveProfile = (updatedProfile) => {
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  const handleProfileUpdate = () => {
    const updatedProfile = { name: userName, bio, profilePic, banner };
    saveProfile(updatedProfile);
  };

  const handleImageChange = (e, setImage, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        const updatedProfile = JSON.parse(localStorage.getItem("userProfile")) || {};
        updatedProfile[key] = reader.result;
        saveProfile(updatedProfile);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUnlikeMeme = (index) => {
    const newLikedMemes = likedMemes.filter((_, i) => i !== index);
    setLikedMemes(newLikedMemes);
    localStorage.setItem("likedMemes", JSON.stringify(newLikedMemes));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      {/* Banner Section */}
      <div className="relative h-40 w-full">
        <motion.img
          src={banner}
          alt="Banner"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <label className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
          <FaCamera />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setBanner, "banner")}
          />
        </label>
      </div>

      {/* Profile Section */}
      <div className="text-center p-6 relative">
        <div className="relative w-24 h-24 mx-auto">
          <motion.img
            src={profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto border-4 border-gray-300 dark:border-gray-600 object-cover"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
          <label className="absolute bottom-0 right-0 bg-gray-800 text-white p-2 rounded-full cursor-pointer">
            <FaCamera />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, setProfilePic, "profilePic")}
            />
          </label>
        </div>
        <div className="mt-4">
          {editingName ? (
            <input
              type="text"
              className="border p-2 rounded w-full text-center"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onBlur={() => setEditingName(false)}
              autoFocus
            />
          ) : (
            <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
              {userName}{" "}
              <FaEdit
                className="cursor-pointer text-gray-500"
                onClick={() => setEditingName(true)}
              />
            </h1>
          )}
        </div>
        <textarea
          className="border p-2 rounded w-full mt-2 text-center"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <button
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleProfileUpdate}
        >
          Save Profile
        </button>
      </div>

      {/* Uploaded Memes Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">📤 Uploaded Memes</h2>
        {uploadedMemes.length === 0 ? (
          <p className="text-gray-500 text-center">You haven't uploaded any memes yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {uploadedMemes.map((meme, index) => (
              <motion.div key={index} className="relative group" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img src={meme.url} alt={`Uploaded Meme ${index}`} className="w-full rounded-lg object-cover" />
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  onClick={() => {
                    const newUploadedMemes = uploadedMemes.filter((_, i) => i !== index);
                    setUploadedMemes(newUploadedMemes);
                    localStorage.setItem("uploadedMemes", JSON.stringify(newUploadedMemes));
                  }}
                >
                  <FaTrash />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Liked Memes Section */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">❤️ Liked Memes</h2>
        {likedMemes.length === 0 ? (
          <p className="text-gray-500 text-center">You haven't liked any memes yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {likedMemes.map((meme, index) => (
              <motion.div key={index} className="relative group" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <img src={meme.url} alt={`Liked Meme ${index}`} className="w-full rounded-lg object-cover" />
                <button
                  className="absolute top-2 right-2 bg-gray-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  onClick={() => handleUnlikeMeme(index)}
                >
                  <FaHeartBroken />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
