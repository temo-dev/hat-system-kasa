import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import IconSearch from '../../../Icon/IconSearch';
import IconMenu from '../../../Icon/IconMenu';
import IconClipboardText from '../../../Icon/IconClipboardText';

interface OrderProps {
    idOrder: number;
}

const dataMenu = [
    {
        id: 1,
        name: 'Buger',
        code: 'buger',
    },
    {
        id: 2,
        name: 'Sushi',
        code: 'sushi',
    },
    {
        id: 3,
        name: 'Thai Cuisine',
        code: 'thai-cuisine',
    },
    {
        id: 4,
        name: 'Drink',
        code: 'thai-drink',
    },
];

const OrderScreen = (props: OrderProps) => {
    const [isShowTaskMenu, setIsShowTaskMenu] = useState(false);
    const [isScreen, setIsScreen] = useState('');
    const toggleMenu = (e: string) => {
        setIsScreen(e);
        setIsShowTaskMenu(false);
    };
    return (
        <div>
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
                        <PerfectScrollbar className="relative h-full grow ltr:-mr-3.5 ltr:pr-3.5 rtl:-ml-3.5 rtl:pl-3.5">
                            <div className="p-5">
                                <div className="flex flex-wrap justify-evenly gap-5">
                                    {dataMenu.map((item) => (
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
                        <PerfectScrollbar className="relative grow sm:h-[calc(100vh_-_150px)]">
                            <div className="m-5 flex flex-wrap gap-5">
                                {[0, 1, 2, 3, 5].map((item) => (
                                    <div key={item}>
                                        <div
                                            className={`flex h-24 w-24 cursor-grab items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                `}
                                        >
                                            {item}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
