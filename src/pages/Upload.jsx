import { useState } from "react";
import MemeUpload from "../components/MemeUpload";
import CaptionEditor from "../components/CaptionEditor";
import { generateAICaption } from "../api/memeAI";

const Upload = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("Funny Meme");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCaptionChange = (text, size, color) => {
    setCaption(text);
    setFontSize(size);
    setColor(color);
  };

  const handleAI = async () => {
    if (!imageUrl) {
      setError("Please upload an image first.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const aiCaption = await generateAICaption(imageUrl);
      setCaption(aiCaption);
    } catch (err) {
      setError("Failed to generate caption. Try again!");
    }

    setLoading(false);
  };

  const handleClearMeme = () => {
    setImageUrl("");
    setCaption("Funny Meme");
    setFontSize(24);
    setColor("#ffffff");
    setError("");
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(caption);
    alert("Caption copied to clipboard!");
  };

  const handleUpload = (memeUrl) => {
    if (!memeUrl) {
      setError("Upload failed. Please try again.");
      return;
    }

    setImageUrl(memeUrl);
    setError("");

    // Store the meme in localStorage
    const storedMemes = JSON.parse(localStorage.getItem("uploadedMemes")) || [];
    const updatedMemes = [...storedMemes, { url: memeUrl }];
    localStorage.setItem("uploadedMemes", JSON.stringify(updatedMemes));
  };

  return (
    <div className="p-6 flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Create Your Meme
      </h1>
      
      {/* Meme Upload Component */}
      <MemeUpload onUpload={handleUpload} />

      {imageUrl && (
        <div className="mt-6 w-full max-w-md">
          {/* Caption Editor */}
          <CaptionEditor onCaptionChange={handleCaptionChange} />

          {/* Meme Display with Caption */}
          <div className="relative mt-6 bg-white p-4 shadow-lg rounded-lg">
            <img src={imageUrl} alt="Meme" className="w-full rounded-lg" />
            <p
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 font-bold text-center"
              style={{ fontSize: `${fontSize}px`, color }}
            >
              {caption}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleAI}
              disabled={loading}
              className={`px-6 py-2 rounded text-white ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? "Generating..." : "Generate AI Caption"}
            </button>

            <button
              onClick={handleCopyCaption}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Copy Caption
            </button>

            <button
              onClick={handleClearMeme}
              className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Clear Meme
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        </div>
      )}
    </div>
  );
};

export default Upload;
