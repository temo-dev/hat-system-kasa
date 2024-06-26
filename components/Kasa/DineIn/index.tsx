import React, { useState } from 'react';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import OrderScreen, { NewOrderFood } from '../components/Order';
import IconCoffee from '../../Icon/IconCoffee';

interface DineInScreenProps {
    orders?: NewOrderFood[];
}

const DineInScreen = (props: DineInScreenProps) => {
    const [isClicked, setIsClicked] = useState(Number(null));
    const [opened, { open, close }] = useDisclosure(false);
    const [currentOrder, setCurrentOrder] = useState(0);

    const toggleOrder = (id: number) => {
        setIsClicked(id);
        open();
    };
    const createTogoOrder = () => {
        setCurrentOrder(currentOrder + 1);
    };
    return (
        <div>
            <div className="flex flex-wrap gap-5">
                {[0, 1, 2, 3, 4, 5, 6].map((item) => (
                    <div onClick={() => toggleOrder(item)} key={item}>
                        <div
                            className={`flex h-24 w-24 cursor-grab flex-col items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                ${isClicked === item ? `bg-success text-white` : null}`}
                        >
                            <IconCoffee />
                            Table #{item}
                        </div>
                    </div>
                ))}
            </div>
            <Drawer opened={opened} onClose={close} size="100%">
                <OrderScreen idOrder={isClicked} clickClose={close} code="dine-in" />
            </Drawer>
        </div>
    );
};

export default DineInScreen;
