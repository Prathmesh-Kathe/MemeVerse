import axios from "axios";

export const generateAICaption = async (imageUrl) => {
  if (!imageUrl) {
    console.error("No image URL provided!");
    return "No image found!";
  }

  try {
    const response = await axios.post(
      "https://memegen.link/", // Ensure correct API path
      { image: imageUrl },
      { timeout: 10000 } // Set timeout to 10 seconds
    );

    return response.data.caption || "AI couldn't generate a caption!";
  } catch (error) {
    console.error("AI Caption Error:", error?.response?.data || error.message);
    return "Couldn't fetch AI caption!";
  }
};
