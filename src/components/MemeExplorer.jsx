import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import MemeCard from "./MemeCard";

const MemeExplorer = ({ filters, searchQuery }) => {
  const [memes, setMemes] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  const fetchMemes = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get("https://api.imgflip.com/get_memes");
      let allMemes = res.data.data.memes;

      // Apply Search Filter
      if (searchQuery) {
        allMemes = allMemes.filter((meme) =>
          meme.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Apply Category Filter
      if (filters.category === "New") {
        allMemes = allMemes.reverse(); // Mocking New
      } else if (filters.category === "Classic") {
        allMemes = allMemes.slice(0, 50); // Mock Classic (top 50 old memes)
      } else if (filters.category === "Random") {
        allMemes = allMemes.sort(() => Math.random() - 0.5);
      }

      // Apply Sorting
      if (filters.sortBy === "Likes") {
        allMemes = allMemes.sort((a, b) => (b.likes || 0) - (a.likes || 0));
      } else if (filters.sortBy === "Date") {
        allMemes = allMemes.reverse(); // Mocking Newest First
      } else if (filters.sortBy === "Comments") {
        allMemes = allMemes.sort((a, b) => (b.comments || 0) - (a.comments || 0));
      }

      setMemes((prev) =>
        page === 1 ? allMemes.slice(0, 10) : [...prev, ...allMemes.slice((page - 1) * 10, page * 10)]
      );
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setLoading(false);
    }
  }, [page, filters, searchQuery]);

  useEffect(() => {
    fetchMemes();
  }, [page, filters, searchQuery]);

  useEffect(() => {
    if (inView) setPage((prev) => prev + 1);
  }, [inView]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {memes.map((meme) => (
        <MemeCard key={meme.id} meme={meme} />
      ))}
      <div ref={ref} className="col-span-full text-center">
        {loading && <p>Loading more memes...</p>}
      </div>
    </div>
  );
};

export default MemeExplorer;
