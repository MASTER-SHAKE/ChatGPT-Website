import React, { Suspense } from 'react';
import { HunterInfo } from './HunterInfo';
import { ControlPanel } from './ControlPanel';
import { MissionList } from './MissionList';

export const ReputationBlock = () => {
    return (
        <div>
            <div className="reputationInfo">
                <div className="reputationTop">
                    <HunterInfo />
                    <ControlPanel />
                </div>
                <div className="reputationBottom">
                    <MissionList />
                </div>
            </div>
        </div>
    );
};
