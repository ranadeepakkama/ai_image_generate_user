import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/components/userReducer/userReducer";
import galleryReducer from "./components/GalleryReducer/galleryReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    gallery:galleryReducer
  },
});
