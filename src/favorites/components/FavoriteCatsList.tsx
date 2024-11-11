import React from "react";
import { useRecoilState } from "recoil";
import { favoriteCatsState } from "../../RandomCatPic/state/FavoriteCatsState";
import { List, ListItem, IconButton, Typography, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export const FavoriteCatsList: React.FC = () => {
  const [favoriteCats, setFavoriteCats] = useRecoilState(favoriteCatsState);

  const removeCat = (catId: string) => {
    setFavoriteCats(favoriteCats.filter((cat) => cat.id !== catId));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Typography variant="h5" gutterBottom>
        Your Favorite Cats
      </Typography>
      {favoriteCats.length > 0 ? (
        <List>
          {favoriteCats.map((cat) => (
            <ListItem
              key={cat.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1,
                alignItems: "center",
              }}
            >
              <Box
                component="img"
                src={cat.url}
                alt="Favorite Cat"
                sx={{ maxWidth: "80%", borderRadius: 1 }}
              />
              <IconButton onClick={() => removeCat(cat.id)} aria-label="remove">
                <DeleteIcon color="error" />
              </IconButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No favorite cats yet!
        </Typography>
      )}
    </Box>
  );
};
