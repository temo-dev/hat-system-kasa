import React, { useState } from 'react';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import OrderScreen, { NewOrderFood } from '../components/Order';
import IconEdit from '../../Icon/IconEdit';
import IconPhoneCall from '../../Icon/IconPhoneCall';

interface ToGoScreenProps {
    orders?: NewOrderFood[];
}

const ToGoScreen = (props: ToGoScreenProps) => {
    const { orders } = props;
    console.log('orders', orders);
    const [isClicked, setIsClicked] = useState(Number(null));
    const [opened, { open, close }] = useDisclosure(false);
    const [currentOrder, setCurrentOrder] = useState(0);
    const [oldOrder, setOldOrder] = useState<NewOrderFood>();

    const toggleOrder = (item: NewOrderFood) => {
        setIsClicked(item.id);
        setOldOrder(item);
        open();
    };
    const createTogoOrder = () => {
        setCurrentOrder(currentOrder + 1);
        setIsClicked(currentOrder + 1);
        open();
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
                {orders?.map((item) => (
                    <div onClick={() => toggleOrder(item)} key={item.id}>
                        <div
                            className={`flex h-24 w-24 cursor-grab flex-col items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                ${isClicked === item.id ? `bg-success text-white` : null}`}
                        >
                            <IconPhoneCall />
                            To Go #{item.id}
                        </div>
                    </div>
                ))}
            </div>
            <Drawer opened={opened} onClose={close} size="100%">
                <OrderScreen idOrder={isClicked} clickClose={close} code="to-go" oldOrder={oldOrder} />
            </Drawer>
        </div>
    );
};

export default ToGoScreen;
