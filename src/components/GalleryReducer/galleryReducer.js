import { createSlice } from "@reduxjs/toolkit";

const gallerySlice = createSlice({
    name: 'gallery',
    initialState: {
        images: [],        // Changed from 'gallery' to more descriptive 'images'
        previewImage: null,
        promptText: ''     // Fixed typo (was promtText)
    },
    reducers: {
        setPrompt(state, action) {  // Fixed typo (was setPromt)
            state.promptText = action.payload;
        },
        setPreviewImages(state, action) {
            // Clean up previous object URL if it exists
            if (state.previewImage && state.previewImage.startsWith('blob:')) {
                URL.revokeObjectURL(state.previewImage);
            }
            state.previewImage = action.payload;
        },
        saveImageToGallery(state) {  // Renamed to match export
            if (state.previewImage) {
                state.images.push({
                    id: Date.now(),
                    src: state.previewImage,
                    prompt: state.promptText  // Save the prompt with the image
                });
                // Clean up state
                state.promptText = '';
                state.previewImage = null;
            }
        },
        cancelPreview(state) {
            // Clean up object URL if it exists
            if (state.previewImage && state.previewImage.startsWith('blob:')) {
                URL.revokeObjectURL(state.previewImage);
            }
            state.promptText = '';
            state.previewImage = null;
        },
        // Optional: Add a reducer to clean up all object URLs
        cleanUpGallery(state) {
            state.images.forEach(img => {
                if (img.src.startsWith('blob:')) {
                    URL.revokeObjectURL(img.src);
                }
            });
            if (state.previewImage && state.previewImage.startsWith('blob:')) {
                URL.revokeObjectURL(state.previewImage);
            }
        }
    }
});

// Corrected action exports
export const {
    setPrompt,           
    setPreviewImages,
    saveImageToGallery,   
    cancelPreview,
    cleanUpGallery        
} = gallerySlice.actions;

export default gallerySlice.reducer;