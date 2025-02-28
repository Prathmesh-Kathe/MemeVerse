import { useEffect, useState } from "react";
import axios from "axios";
import MemeCard from "./MemeCard";

const MemeList = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes")
      .then(res => setMemes(res.data.data.memes.slice(0, 10)))  // Limit to 10 memes
      .catch(err => console.error("Error fetching memes:", err));
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {memes.map(meme => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
    </div>
  );
};

export default MemeList;
