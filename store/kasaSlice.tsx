import { createSlice } from '@reduxjs/toolkit';

interface Food {
    id: number;
    image: string;
    is_discount: boolean;
    value_discount: number;
    locale: string;
    name_food: string;
    price: number;
}
export interface Menu {
    id: number;
    locale: string;
    name_menu: string;
    dph: number;
    background: string;
    foods: Food[];
}
interface initialState {
    menus: Menu[];
    countTodo: number;
}

const initialState: initialState = {
    menus: [],
    countTodo: 0,
};

const kasaSlice = createSlice({
    name: 'kasa',
    initialState: initialState,
    reducers: {
        getMenu(state, { payload }) {
            state.menus = payload[0].menu;
        },
    },
});

export const { getMenu } = kasaSlice.actions;

export default kasaSlice.reducer;
