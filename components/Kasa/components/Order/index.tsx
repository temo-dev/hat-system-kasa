/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import IconSearch from '../../../Icon/IconSearch';
import IconMenu from '../../../Icon/IconMenu';
import IconClipboardText from '../../../Icon/IconClipboardText';
import { useSelector } from 'react-redux';
import { IRootState } from '../../../../store';
import { Food } from '../../../../store/kasaSlice';
import Image from 'next/image';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
interface OrderProps {
    idOrder: number;
    clickClose: Function;
}

const OrderScreen = (props: OrderProps) => {
    const { clickClose } = props;
    const kasaSlice = useSelector((state: IRootState) => state.kasaSlice);
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [isScreen, setIsScreen] = useState('');
    const [listFood, setListFood] = React.useState<Food[]>([]);
    const [opened, { open, close }] = useDisclosure(false);
    const [quantity, setQuantity] = useState<any>(1);
    const [currentFood, setCurrentFood] = useState<Food>();
    console.log('listFood', listFood);
    const toggleMenu = (e: string) => {
        setIsScreen(e);
        setIsShowTaskMenu(false);
    };
    useEffect(() => {
        const currentMenu = kasaSlice.menus.filter((menu) => menu.name_menu === isScreen);
        setListFood(currentMenu[0]?.foods);
    }, [isScreen]);

    const addFood = (food: Food) => {
        open();
        setCurrentFood(food);
    };

    const closeSetFood = () => {
        setQuantity(1);
        close();
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
                                <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">HaKaSu - Order: #{props.idOrder}</h3>
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
                                        <Image src={item.background} width={150} height={80} priority alt={item.name_menu} />
                                        <h2>{item.name_menu}</h2>
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
                            </div>
                        </div>
                        <hr />
                        <div className="flex max-h-[480px] flex-wrap gap-5 overflow-x-scroll px-2">
                            {listFood?.map((item) => (
                                <div key={item.id} className="py-2 focus:bg-success" onClick={() => addFood(item)}>
                                    <div
                                        className={`flex h-[150px] w-[200px] cursor-grab flex-col items-center justify-around rounded-md border border-white-light bg-gray-300 text-center text-sm font-medium uppercase shadow active:bg-success dark:border-dark`}
                                    >
                                        <Image src={item.image} width={200} height={130} priority alt={item.name_food} />
                                        <h2>{item.name_food}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-end">
                <button type="button" className="btn-lg btn-danger mx-5 rounded" onClick={() => clickClose()}>
                    Cancel
                </button>
                <button type="button" className="btn-lg btn-success mx-5 rounded">
                    Order
                </button>
            </div>
            <Drawer opened={opened} onClose={closeSetFood}>
                <div className="flex h-[calc(100vh_-_50px)] flex-col items-center justify-between px-2">
                    <div className="mb-2">
                        <h1 className="mb-2 text-lg font-medium">{`#: ${currentFood?.id}`}</h1>
                        <Image src={currentFood?.image || '/favicon.png'} width={300} height={200} priority alt={currentFood?.name_food || 'hatsolution'} />
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
                        <button type="button" className="btn btn-primary w-full text-lg">
                            Order
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};

export default OrderScreen;
