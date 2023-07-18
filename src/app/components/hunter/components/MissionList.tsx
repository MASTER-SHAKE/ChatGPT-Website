import React, { useCallback } from 'react';
import { FC } from 'react';
import missions from './../db/missions.json';
import { useCodeMaxStore } from '@/app/state/store';

export const MissionList: FC = () => {
    const addPoints = useCodeMaxStore((state) => state.addPoints);
    //const [btnDisable, setButtonDisable] = useState(false);

    const missionDoneHandler = useCallback(
        (points: number) => {
            addPoints(points);
            //setButtonDisable(true);
        },
        [addPoints],
    );

    const missionsList = missions.map((val, index) => {
        return (
            <div key={val.id} className="mission">
                {index + 1}. {val.title} <span className="orange">({val.points})</span>
                <button className="mission-done-btn" onClick={() => missionDoneHandler(val.points)}>
                    Done
                </button>
            </div>
        );
    });
    return (
        <>
            <div className="rep-board">Missions Board</div>
            <div className="mission-list">{missionsList}</div>
        </>
    );
};
