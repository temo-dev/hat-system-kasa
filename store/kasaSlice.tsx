import { createSlice } from '@reduxjs/toolkit';
import { NewOrderFood } from '../components/Kasa/components/Order';

export interface Food {
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
    orders: NewOrderFood[];
}

const initialState: initialState = {
    menus: [],
    countTodo: 0,
    orders: [],
};

const kasaSlice = createSlice({
    name: 'kasa',
    initialState: initialState,
    reducers: {
        getMenu(state, { payload }) {
            state.menus = payload[0].menu;
        },
        setOrder(state, { payload }) {
            state.orders.push(payload);
        },
    },
});

export const { getMenu, setOrder } = kasaSlice.actions;

export default kasaSlice.reducer;
