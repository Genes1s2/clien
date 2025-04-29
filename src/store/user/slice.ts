// store/user/slice.ts
import { createSlice } from '@reduxjs/toolkit';
import { LoadingType } from '../../models/store';
import { changeUserPassword, fetchUserProfile, getAllUsers, updateUserProfile } from './actions';

interface UserState {
    currentProfile: {
        data: any | null;
        status: LoadingType;
        error: string | null;
    };
    list: {
        data: any | null;
        status: LoadingType;
        error: string | null;
    };
}

const initialState: UserState = {
    currentProfile: {
        data: null,
        status: LoadingType.IDLE,
        error: null,
    },
    list: {
        data: [],
        status: LoadingType.IDLE,
        error: null
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // All user

        builder
            .addCase(getAllUsers.pending, (state) => {
                state.list.status = LoadingType.PENDING;
                state.list.error = null;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.list.status = LoadingType.SUCCESS;
                state.list.data = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.list.status = LoadingType.REJECTED;
                state.list.error = action.payload as string;
            });

        //  Fetch profile
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.currentProfile.status = LoadingType.PENDING;
                state.currentProfile.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action) => {
                state.currentProfile.status = LoadingType.SUCCESS;
                state.currentProfile.data = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.currentProfile.status = LoadingType.REJECTED;
                state.currentProfile.error = action.payload as string;
            })

        // Update profile
        builder
            .addCase(updateUserProfile.pending, (state) => {
                state.currentProfile.status = LoadingType.PENDING;
                state.currentProfile.error = null;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.currentProfile.status = LoadingType.SUCCESS;
                state.currentProfile.data = action.payload;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.currentProfile.status = LoadingType.REJECTED;
                state.currentProfile.error = action.payload as string;
            })

        // Change password
        builder
            .addCase(changeUserPassword.pending, (state) => {
                state.currentProfile.status = LoadingType.PENDING;
                state.currentProfile.error = null;
            })
            .addCase(changeUserPassword.fulfilled, (state, action) => {
                state.currentProfile.status = LoadingType.SUCCESS;
                state.currentProfile.data = action.payload;
            })
            .addCase(changeUserPassword.rejected, (state, action) => {
                state.currentProfile.status = LoadingType.REJECTED;
                state.currentProfile.error = action.payload as string;
            })


    },
});

export default userSlice.reducer;