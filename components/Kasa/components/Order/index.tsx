/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import IconSearch from '../../../Icon/IconSearch';
import IconMenu from '../../../Icon/IconMenu';
import IconClipboardText from '../../../Icon/IconClipboardText';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { Food, setOrder } from '../../../../store/kasaSlice';
import Image from 'next/image';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import IconDollarSignCircle from '../../../Icon/IconDollarSignCircle';
import { useDispatch } from 'react-redux';

interface OrderProps {
    idOrder: number;
    clickClose: Function;
    code: string;
    oldOrder?: NewOrderFood;
}

export interface NewOrderFood {
    id: number;
    code: string;
    foods?: [
        {
            quantity: number;
            food: Food;
        }
    ];
    total: number;
}

const OrderScreen = (props: OrderProps) => {
    const dispatch = useDispatch();
    const { idOrder, clickClose, code } = props;
    const kasaSlice = useSelector((state: IRootState) => state.kasaSlice);
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [isScreen, setIsScreen] = useState('');
    const [listFood, setListFood] = React.useState<Food[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [isSend, handlers] = useDisclosure(false);
    const [quantity, setQuantity] = useState<any>(1);
    const [currentFood, setCurrentFood] = useState<Food>();
    const [newOrderFood, setNewOrderFood] = useState<NewOrderFood>({ id: idOrder, code: code, total: 0 });
    const [totalFood, setTotalFood] = useState(0);
    console.log('kasaSlice', kasaSlice.orders);
    const toggleMenu = (e: string) => {
        setIsScreen(e);
        setIsShowTaskMenu(false);
    };
    useEffect(() => {
        const currentMenu = kasaSlice.menus.filter((menu) => menu.name_menu === isScreen);
        setListFood(currentMenu[0]?.foods);
    }, [isScreen]);

    const openOption = (food: Food) => {
        open();
        setCurrentFood(food);
    };

    const closeSetFood = () => {
        setQuantity(1);
        close();
    };

    const cancelOrder = () => {
        clickClose();
        setNewOrderFood({ id: idOrder, code: code, total: 0 });
    };

    const addFood = () => {
        if (currentFood) {
            let arrayFoods = newOrderFood.foods;
            const oldFood = arrayFoods?.filter((food) => food.food.id === currentFood.id);
            console.log('oldFood', oldFood);
            if (!arrayFoods) {
                let cal = quantity * currentFood.price;
                setNewOrderFood({ ...newOrderFood, foods: [{ food: currentFood, quantity: quantity }], total: cal });
                setTotalFood(totalFood + quantity);
            } else if (oldFood?.length != 0) {
                let cal = quantity * currentFood.price + newOrderFood.total;
                arrayFoods.map((food) => {
                    if (food.food.id === currentFood.id) {
                        food.quantity = food.quantity + quantity;
                    }
                });
                setNewOrderFood({ ...newOrderFood, foods: arrayFoods, total: cal });
                setTotalFood(totalFood + quantity);
            } else {
                let cal = quantity * currentFood.price + newOrderFood.total;
                arrayFoods?.push({ food: currentFood, quantity: quantity });
                setNewOrderFood({ ...newOrderFood, foods: arrayFoods, total: cal });
                setTotalFood(totalFood + quantity);
            }
        }

        closeSetFood();
    };

    const sendOrder = () => {
        handlers.open();
    };

    const sendOrderToStore = () => {
        dispatch(setOrder(newOrderFood));
        handlers.close();
        cancelOrder();
    };

    return (
        <>
            <div className="relative flex h-full gap-5 sm:h-[calc(100vh_-_150px)]">
                <div
                    className={`panel z-10 hidden h-full w-[500px] max-w-full flex-none space-y-4 p-4 xl:relative xl:block xl:h-auto ltr:rounded-r-none ltr:xl:rounded-r-md rtl:rounded-l-none rtl:xl:rounded-l-md ${
                        isShowTaskMenu && '!block'
                    }`}
                >
                    <div className="flex h-full flex-col pb-16">
                        <div className=" flex justify-between pb-5">
                            <div className="flex items-center text-center">
                                <div className="shrink-0">
                                    <IconClipboardText />
                                </div>
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">{`HaKaSu - ${code}: #${idOrder}`}</h3>
                            </div>
                            <button type="button" className="block hover:text-primary xl:hidden ltr:mr-3 rtl:ml-3" onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}>
                                <IconMenu />
                            </button>
                        </div>
                        <hr />
                        <div className="mt-2 flex flex-wrap justify-evenly gap-5">
                            {kasaSlice.menus.map((item) => (
                                <div onClick={() => toggleMenu(item.name_menu)} key={item.id} className="py-2">
                                    <div
                                        className={`flex h-[100px] w-[150px] cursor-grab flex-col items-center justify-center rounded-md border border-white-light bg-gray-300 text-center text-base font-medium uppercase shadow dark:border-dark
                                                ${isScreen === item.name_menu ? `bg-success text-white` : null}`}
                                    >
                                        <Image src={item.background} width={150} height={80} priority={true} alt={item.name_menu} />
                                        <h2 className="ml-1">{item.name_menu}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowTaskMenu && '!block xl:!hidden'}`} onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}></div>
                <div className="panel flex-1 p-0">
                    <div className="flex flex-col">
                        <div className="flex w-full flex-col gap-4 p-4 sm:flex-row sm:items-center">
                            <div className="flex items-center ltr:mr-3 rtl:ml-3">
                                <button type="button" className="block hover:text-primary xl:hidden ltr:mr-3 rtl:ml-3" onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}>
                                    <IconMenu />
                                </button>
                                <div className="group relative flex-1">
                                    <input
                                        type="text"
                                        className="peer form-input ltr:!pr-10 rtl:!pl-10"
                                        placeholder="Search Item."
                                        // value={searchTask}
                                        // onChange={(e) => setSearchTask(e.target.value)}
                                        // onKeyUp={() => searchTasks()}
                                    />
                                    <div className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                                        <IconSearch />
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">{`HaKaSu - ${code}: #${idOrder}`}</h3>
                            </div>
                        </div>
                        <hr />
                        <div className="flex max-h-[480px] flex-wrap gap-5 overflow-x-scroll px-2">
                            {listFood?.map((item) => (
                                <div key={item.id} className="py-2 focus:bg-success" onClick={() => openOption(item)}>
                                    <div
                                        className={`flex h-[150px] w-[200px] cursor-grab flex-col items-center justify-around rounded-md border border-white-light bg-gray-300 text-center text-sm font-medium uppercase shadow active:bg-success dark:border-dark`}
                                    >
                                        <Image src={item.image} width={200} height={130} priority={true} alt={item.name_food} />
                                        <h2 className="ml-1">{item.name_food}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end">
                <button type="button" className="btn-lg btn-danger mx-5 rounded" onClick={cancelOrder}>
                    Cancel
                </button>
                <button type="button" className="btn-lg btn-success relative mx-5 rounded" onClick={sendOrder}>
                    <span className="flex items-center">Send Order</span>
                    <span className="badge absolute -top-3 rounded-full bg-danger p-0.5 px-1.5 ltr:right-0 rtl:left-0">{totalFood}</span>
                </button>
            </div>
            <Drawer opened={opened} onClose={closeSetFood}>
                <div className="flex h-[calc(100vh_-_50px)] flex-col items-center justify-between px-2">
                    <div className="mb-2">
                        <h1 className="mb-2 text-lg font-medium">{`#: ${currentFood?.id}`}</h1>
                        <Image src={currentFood?.image || '/favicon.png'} width={300} height={200} priority={true} alt={currentFood?.name_food || 'hatsolution'} />
                        <h1 className="mt-2 text-lg font-bold uppercase">{currentFood?.name_food}</h1>
                        <hr />
                        <div>
                            <h1 className="my-1 text-sm font-medium capitalize">quantity</h1>
                            <div className="flex">
                                <button
                                    type="button"
                                    className="flex items-center justify-center border border-r-0 border-primary bg-primary px-3 font-semibold text-white ltr:rounded-l-md rtl:rounded-r-md"
                                    onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                >
                                    -
                                </button>
                                <input type="number" placeholder="55" className="form-input rounded-none text-center" min={1} max={100} readOnly value={quantity} />
                                <button
                                    type="button"
                                    className="flex items-center justify-center border border-l-0 border-primary bg-primary px-3 font-semibold text-white ltr:rounded-r-md rtl:rounded-l-md"
                                    onClick={() => setQuantity(quantity < 100 ? quantity + 1 : 100)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="w-full">
                        <button type="button" className="btn btn-primary w-full text-lg" onClick={addFood}>
                            <span className="mr-2">
                                <IconDollarSignCircle />
                            </span>
                            Order
                        </button>
                    </div>
                </div>
            </Drawer>
            {newOrderFood.foods ? (
                <Drawer opened={isSend} onClose={handlers.close} size={'xl'}>
                    <div className="px-2">
                        <h1 className="text-lg font-medium capitalize">{`HAKASU - ${newOrderFood.code}: #${newOrderFood.id}`}</h1>
                        <hr />
                        <div className="flex h-[calc(100vh_-_100px)] flex-col items-center justify-between px-2">
                            {/* Table */}
                            <div className="table-responsive mb-5">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Image</th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {newOrderFood?.foods.map((data) => {
                                            return (
                                                <tr key={data.food.id}>
                                                    <td>{data.food.id}</td>
                                                    <td>
                                                        <div>
                                                            <Image src={data.food.image} alt={data.food.name_food} priority width={200} height={150} />
                                                        </div>
                                                    </td>
                                                    <td>{data.food.name_food}</td>
                                                    <td>
                                                        <div className="inline-flex w-[40px] flex-col">
                                                            <button
                                                                type="button"
                                                                className="flex items-center justify-center rounded-t-md border border-b-0 border-primary bg-primary p-3 font-semibold text-white"
                                                            >
                                                                +
                                                            </button>
                                                            <input type="text" placeholder="55" className="form-input rounded-none px-2 text-center" min="1" max="100" readOnly value={data.quantity} />
                                                            <button
                                                                type="button"
                                                                className="flex items-center justify-center rounded-b-md border border-t-0 border-primary bg-primary p-3 font-semibold text-white"
                                                            >
                                                                _
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                            <div className="w-full">
                                <div className="flex w-full justify-between">
                                    <h1 className="text-lg font-bold uppercase">total</h1>
                                    <h1 className="text-lg font-bold uppercase">{`${newOrderFood.total} kc`}</h1>
                                </div>
                                <button type="button" className="btn btn-primary mt-2 w-full text-lg" onClick={sendOrderToStore}>
                                    <span className="mr-2">
                                        <IconDollarSignCircle />
                                    </span>
                                    Send Order
                                </button>
                            </div>
                        </div>
                    </div>
                </Drawer>
            ) : (
                ''
            )}
        </>
    );
};

export default OrderScreen;
