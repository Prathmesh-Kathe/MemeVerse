import { useState } from "react";

const CaptionEditor = ({ onCaptionChange }) => {
  const [text, setText] = useState("Funny Meme");
  const [fontSize, setFontSize] = useState(24);
  const [color, setColor] = useState("#ffffff");

  const handleUpdate = () => {
    onCaptionChange(text, fontSize, color);
  };

  return (
    <div className="flex flex-col items-center space-y-2 mt-4">
      <input 
        type="text" 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        className="p-2 border rounded-md"
      />
      <input 
        type="number" 
        value={fontSize} 
        onChange={(e) => setFontSize(Number(e.target.value))} 
        className="p-2 border rounded-md"
      />
      <input 
        type="color" 
        value={color} 
        onChange={(e) => setColor(e.target.value)} 
      />
      <button 
        onClick={handleUpdate} 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Caption
      </button>
    </div>
  );
};

export default CaptionEditor;
