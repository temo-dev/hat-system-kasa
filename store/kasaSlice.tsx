import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    menus: [],
};

const kasaSlice = createSlice({
    name: 'kasa',
    initialState: initialState,
    reducers: {
        getMenu(state) {},
    },
});

export const { getMenu } = kasaSlice.actions;

export default kasaSlice.reducer;
