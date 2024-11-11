
import axios from "axios";
import { toast } from "sonner";
import { Cat } from "../model/Cat";

// Function to fetch a random cat image
export const fetchRandomCatPic = async (): Promise<Cat | null> => {
  try {
    const response = await axios.get<{ _id: string }>("https://cataas.com/cat?json=true");
    console.log("API Response:", response.data);

    // Construct the full URL using the _id
    return { id: response.data._id, url: `https://cataas.com/cat/${response.data._id}` };
  } catch (error) {
    console.error("Error fetching cat image:", error);
    toast.error("Error getting cat image");
    return null;
  }
};
