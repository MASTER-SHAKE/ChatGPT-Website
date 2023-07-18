import React from 'react';
import cardsData from '../db/cards.json';
import { useCodeMaxStore } from '@/app/state/store';
import placeholder from '../../../../../public/img/card-placeholder.jpg';
import Image from 'next/image';

export const Cards = () => {
    const cards = useCodeMaxStore((state) => state.cards);

    const cardsList = cards.map((val, index) => {
        if (val >= 0) {
            return (
                <div key={index} className="cards">
                    <img src={cardsData[val].src} alt="" className="card card-obtained" />
                </div>
            );
        } else {
            return (
                <div key={index} className="cards">
                    <Image src={placeholder} alt="" className="card" />
                </div>
            );
        }
    });

    return (
        <div className="obtainedCards">
            <div className="cardsTitle">CARDS</div>
            <div className="cardsGrid">{cardsList}</div>
        </div>
    );
};
