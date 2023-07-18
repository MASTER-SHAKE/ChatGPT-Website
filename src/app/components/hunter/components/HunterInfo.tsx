import React from 'react';
import { useCodeMaxStore } from '@/app/state/store';
import Image from 'next/image';
import avatar from '../../../../../public/img/avatar.jpg'

export const HunterInfo = () => {
    const totalPoints = useCodeMaxStore((state) => state.points);
    const userName = useCodeMaxStore((state) => state.user);

    return (
        <div className="hunter-bio">
            <Image className="hunter-photo" src={avatar} alt="Hunter avatar" />
            <div className="hunter-nickname bio-label">
                HUNTER: <span className="orange">{userName}</span>
            </div>
            <div className="total-points bio-label">
                REPUTATION: <span className="orange">{totalPoints}</span>
            </div>
        </div>
    );
};
