import React, { useState } from 'react';
import { Drawer, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const ToGoScreen = () => {
    const [isClicked, setIsClicked] = useState(Number(null));
    const [opened, { open, close }] = useDisclosure(false);
    const toggleOrder = (id: number) => {
        setIsClicked(id);
        open();
    };
    return (
        <div>
            <button type="button" className="btn btn-success mb-5">
                Create a new order
            </button>
            <div className="flex flex-wrap gap-5">
                {[0, 1, 2, 3, 5].map((item) => (
                    <div onClick={() => toggleOrder(item)} key={item}>
                        <div
                            className={`flex h-24 w-24 cursor-grab items-center justify-center rounded-md border border-white-light font-semibold shadow dark:border-dark
                                                ${isClicked === item ? `bg-success text-white` : null}`}
                        >
                            {item}
                        </div>
                    </div>
                ))}
            </div>
            <Drawer opened={opened} onClose={close}>
                <h1>{`Order: ${isClicked}`}</h1>
            </Drawer>
        </div>
    );
};

export default ToGoScreen;
