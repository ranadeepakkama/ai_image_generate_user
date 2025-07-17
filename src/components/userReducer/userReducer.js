import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export const loginUser = createAsyncThunk(
    'user/logIn',
    async({user,password},thunkApi) => {
        try{
            const userCrenditial = await signInWithEmailAndPassword(auth,user,password);
            return userCrenditial.user
        }catch(e){
            return thunkApi.rejectWithValue(e.message)
        }
    }
)

export const logOut = createAsyncThunk(
    'user/logOut',
    async () => {
        await signOut(auth)
    }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.pending,(state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(loginUser.rejected,(state,action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(logOut.fulfilled,(state) => {
            state.user = null;
        })
    }
})

export default userSlice.reducer