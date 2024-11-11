import { useRecoilState } from "recoil";
import { favoritesState } from "../state/FavoriteState";
import { List, ListItem, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// Define the FavoriteJoke type
type FavoriteJoke = string | { text: string; isCustom: boolean };

export const FavoritesList: React.FC = () => {
  // Use Recoil state for accessing and updating favorites
  const [favorites, setFavorites] = useRecoilState<FavoriteJoke[]>(favoritesState);

  // Function to remove a joke from the favorites list
  const removeJoke = (joke: FavoriteJoke) => {
    setFavorites(favorites.filter((favorite) => favorite !== joke));
  };

  return (
    <Box sx={{ my: 4, p: 3, bgcolor: "background.paper", borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Your Favorite Jokes
      </Typography>

      {favorites.length > 0 ? (
        <List>
          {favorites.map((joke, index) => (
            <ListItem
              key={index}
              sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}
            >
              <Typography>
                {/* Check if joke is a string or an object and display accordingly */}
                {typeof joke === "string" ? joke : joke.text}
              </Typography>
              {/* Display an icon if the joke is custom */}
              {typeof joke === "object" && joke.isCustom && (
                <Typography color="secondary" variant="caption" sx={{ ml: 1 }}>
                  (Custom)
                </Typography>
              )}
              {/* Remove button for each joke */}
              <IconButton onClick={() => removeJoke(joke)} aria-label="remove">
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No favorite jokes yet!
        </Typography>
      )}
    </Box>
  );
};
