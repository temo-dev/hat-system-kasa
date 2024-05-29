import React, { useState } from 'react';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import OrderScreen from '../components/Order';
import IconEdit from '../../Icon/IconEdit';
import IconPhoneCall from '../../Icon/IconPhoneCall';

const ToGoScreen = () => {
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
            <button type="button" className="btn btn-success mb-5" onClick={createTogoOrder}>
                <span className="mr-2">
                    <IconEdit />
                </span>
                Create a new order
            </button>
            <div className="flex flex-wrap gap-5">
                {Array.from(Array(currentOrder), (_x, i) => i).map((item) => (
                    <div onClick={() => toggleOrder(item)} key={item}>
                        <div
                            className={`flex h-24 w-24 cursor-grab flex-col items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                ${isClicked === item ? `bg-success text-white` : null}`}
                        >
                            <IconPhoneCall />
                            To Go #{item}
                        </div>
                    </div>
                ))}
            </div>
            <Drawer opened={opened} onClose={close} size="100%">
                <OrderScreen idOrder={isClicked} clickClose={close} code="To Go" />
            </Drawer>
        </div>
    );
};

export default ToGoScreen;
