import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import useStore from 'app/Hooks/useStore';

const BadgeCount = ({ width = 5, height = 5, className, color = "bg-red-500", quantidade = 0 }) => {
   
    return (
        <div className={`${className} absolute inline-flex items-center justify-center w-${width} h-${height} text-[8px] font-bold text-white ${color} border-2 border-white rounded-full bottom-[29px] right-[29px]`}>
            {quantidade}
        </div>
    );
};

export default BadgeCount;
