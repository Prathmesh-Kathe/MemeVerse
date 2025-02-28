import { useState } from "react";

const MemeUpload = ({ onUpload }) => {
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  };

  const uploadFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      setError("Invalid file type. Please upload an image.");
      return;
    }

    setError("");
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=0841b1b8a0de6514cf36133849551849`, // Replace with your actual API key
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.success) {
        setPreview(data.data.url);
        onUpload(data.data.url);
        generateMemeCaption(data.data.url); // Call AI caption generator
      } else {
        setError(data.error?.message || "Image upload failed. Please try again.");
      }
    } catch (error) {
      setError("Error uploading image. Please check your internet connection.");
    }

    setUploading(false);
  };

  const generateMemeCaption = async (imageUrl) => {
    try {
      const response = await fetch("https://api.memegen.link/templates/ds/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer YOUR_AI_API_KEY", // Replace with actual API key
        },
        body: JSON.stringify({ imageUrl }),
      });

      const data = await response.json();
      setCaption(data.caption || "Funny Meme Caption 😂");
    } catch (error) {
      setCaption("Could not generate caption. Try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center border-2 border-dashed border-gray-400 p-6 rounded-lg w-80 bg-white cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="memeUpload"
      />
      <label
        htmlFor="memeUpload"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition"
      >
        {uploading ? "Uploading..." : "Upload Meme"}
      </label>

      <p className="text-gray-500 text-sm mt-2">or drag and drop an image</p>

      {preview && (
        <div className="mt-4">
          <img
            src={preview}
            alt="Uploaded Meme Preview"
            className="w-64 h-auto rounded-md shadow-md"
          />
          <p className="text-lg font-semibold text-center mt-2">{caption}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default MemeUpload;
