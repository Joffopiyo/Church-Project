import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    duties: [],
    assignedDuties: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Create new duty
export const createDuty = createAsyncThunk(
    'duties/create',
    async (dutyData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post('/api/duties', dutyData, config);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user duties
export const getMyDuties = createAsyncThunk(
    'duties/getAll',
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get('/api/duties/my', config);
            return response.data;
        } catch (error) {
            const message =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const dutySlice = createSlice({
    name: 'duty',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDuty.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createDuty.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.assignedDuties.push(action.payload);
            })
            .addCase(createDuty.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getMyDuties.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMyDuties.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.duties = action.payload;
            })
            .addCase(getMyDuties.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset } = dutySlice.actions;
export default dutySlice.reducer;
