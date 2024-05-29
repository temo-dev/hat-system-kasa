import React, { useEffect, useState } from 'react';
import IconMenu from '../../components/Icon/IconMenu';
import IconSearch from '../../components/Icon/IconSearch';
import IconClipboardText from '../../components/Icon/IconClipboardText';
import PerfectScrollbar from 'react-perfect-scrollbar';
import ToGoScreen from '../../components/Kasa/ToGo';
import DineInScreen from '../../components/Kasa/DineIn';
import DeliveyScreen from '../../components/Kasa/Delivery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const dataMainMenu = [
    {
        id: 1,
        name: 'Dine In',
        code: 'dine-in',
    },
    {
        id: 2,
        name: 'To Go',
        code: 'to-go',
    },
    {
        id: 3,
        name: 'Delivery',
        code: 'delivery',
    },
];

const MainKasa = () => {
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [isScreen, setIsScreen] = useState('to-go');

    const toggleMenu = (e: string) => {
        setIsScreen(e);
        setIsShowTaskMenu(false);
    };

    return (
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
                            <h3 className="text-lg font-semibold ltr:ml-3 rtl:mr-3">HaKaSu - Bristo System</h3>
                        </div>
                        <button type="button" className="block hover:text-primary xl:hidden ltr:mr-3 rtl:ml-3" onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}>
                            <IconMenu />
                        </button>
                    </div>
                    <hr />
                    <PerfectScrollbar className="relative h-full grow ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">
                        <div className="p-5">
                            <div className="flex flex-wrap justify-evenly gap-5">
                                {dataMainMenu.map((item) => (
                                    <div onClick={() => toggleMenu(item.code)} key={item.id}>
                                        <div
                                            className={`flex h-24 w-24 cursor-grab items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                ${isScreen === item.code ? `bg-success text-white` : null}`}
                                        >
                                            {item.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
            <div className={`overlay absolute z-[5] hidden h-full w-full rounded-md bg-black/60 ${isShowTaskMenu && '!block xl:!hidden'}`} onClick={() => setIsShowTaskMenu(!isShowTaskMenu)}></div>
            <div className="panel h-full flex-1 overflow-auto p-0">
                <div className="flex h-full flex-col">
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
                    <PerfectScrollbar className="relative h-full grow">
                        <div className="flex flex-wrap content-center justify-normal gap-5 p-5">
                            {isScreen === 'to-go' ? <ToGoScreen /> : isScreen === 'dine-in' ? <DineInScreen /> : isScreen === 'delivery' ? <DeliveyScreen /> : null}
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
};

export default MainKasa;
