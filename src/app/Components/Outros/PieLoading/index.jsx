import React from 'react';
import style from './style.module.css'

const PieLoading = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.leftHalf}></div>
            <div className={style.spinner}></div>
            <div className={style.rightHalf}></div>
        </div>
    );
};

export default PieLoading;