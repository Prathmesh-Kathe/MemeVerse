import { Link } from "react-router-dom";
import MemeList from "../components/MemeList";

const Home = () => {
  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex gap-4">
        <Link to="/explorer">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition">
            Explore Now
          </button>
        </Link>

        <Link to="/upload"> {/* Fixed typo here */}
          <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition">
            Upload
          </button>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center my-6">Trending Memes</h1>
      <MemeList />
    </div>
  );
};

export default Home;
