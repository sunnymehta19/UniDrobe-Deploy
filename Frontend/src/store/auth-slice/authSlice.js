import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,

    //for deploy on render
    token: null,

}

//async thunk for registerUser
export const registerUser = createAsyncThunk(
    "/auth/register",
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/register`,
                formData,
                { withCredentials: true }
            );
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Registration failed"
            )
        }
    }
);


//async thunk for loginUser
export const loginUser = createAsyncThunk(
    "/auth/login",
    async (formData, thunkAPI) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                formData,
                { withCredentials: true }
            );
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error?.response?.data?.message || "Login failed"
            )
        }
    }
);


//async thunk for logOutUser
export const logOutUser = createAsyncThunk(
    "/auth/logout",
    async (_, thunkAPI) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {},
                { withCredentials: true }
            );
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue("Logout failed!")
        }
    }
);


//async thunk for check authenticate user
// export const checkAuth = createAsyncThunk(
//     "/auth/checkauth",
//     async (thunkAPI) => {
//         try {
//             const response = await axios.get(
//                 `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
//                 {
//                     withCredentials: true,
//                     headers: {
//                         "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
//                     }
//                 }
//             );
//             return response.data
//         } catch (error) {
//             return thunkAPI.rejectWithValue(
//                 error?.response?.data?.message
//             )
//         }
//     }
// );


//for deploy on render
export const checkAuth = createAsyncThunk(
    "/auth/checkauth",
    async (token) => {
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/auth/checkauth`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
                }
            }
        );
        return response.data

    }
);




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {},
        //for deploy on render
        resetTokenAndCredentials: (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
        }
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
                //for deploy on render
                state.token = action.payload.token;
                sessionStorage.setItem("token", JSON.stringify(action.payload.token));

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                //for deploy on render
                state.token = null;

            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logOutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.isLoading = false;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.success ? action.payload.user : null;
                state.isAuthenticated = action.payload.success;
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })


    }

})

export const { setUser, resetTokenAndCredentials } = authSlice.actions;
export default authSlice.reducer