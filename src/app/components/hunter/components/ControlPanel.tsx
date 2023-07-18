import React, { useCallback, useState } from 'react';
import { useCodeMaxStore } from '@/app/state/store';
import { getRandomNumber } from '../utils/common';
import { cardGeneratePrice, maxCardsNum } from '../constants';

export const ControlPanel = () => {
    const [points, setPoints] = useState('');
    const addPoints = useCodeMaxStore((state) => state.addPoints);
    const availablePoints = useCodeMaxStore((state) => state.availablePoints);
    const addCard = useCodeMaxStore((state) => state.addCard);
    const minusPoints = useCodeMaxStore((state) => state.minusPoints);

    const onAddRepClick = useCallback(() => {
        const integerPoints = Number(points);
        if (points && integerPoints > 0) {
            addPoints(integerPoints);
            setPoints('0');
        }
    }, [addPoints, points]);

    const abilityHandler = () => {
        if (availablePoints >= cardGeneratePrice) {
            addCard(getRandomNumber(maxCardsNum));
            minusPoints(availablePoints - cardGeneratePrice);
        }
    };

    const abilityBtn =
        availablePoints >= cardGeneratePrice ? (
            <div className="card-generator">
                <button onClick={abilityHandler} className="addAbility">
                    Create ability
                </button>
            </div>
        ) : null;

    return (
        <div className="hunter-panel">
            <div className="availablePoints">
                Points available: <div className="orange">{availablePoints}</div>
            </div>
            <div className="points-adder">
                <input
                    placeholder={points}
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="pointsInput"
                    type="number"
                />
                <button className="addPointBtn" onClick={onAddRepClick}>
                    Add Reputation
                </button>
            </div>
            {abilityBtn}
        </div>
    );
};
