import React from 'react';
import { Cards } from './components/Cards';
import logo from '../../../../public/img/logo.png';
import icon from '../../../../public/img/icon.png';
import Image from 'next/image';
import {ReputationBlock} from "./components/ReputationBlock";
import './css/style.css';

export const Hunter = () => {
    return (
        <div className="hunter-app">
            <div className="hunter-header-content">
                <div className="header">
                    <div className="logo-placeholder">
                        <a className="logo" href="/">
                            <Image src={logo} alt="Hunter Logo" />
                        </a>
                    </div>
                    <div className="header-right">
                        <div className="project-name">HUNTER REPUTATION BOARD</div>
                    </div>
                </div>
                <div className="circle-border"></div>
                <div className="circle">
                    <Image className="icon-logo" src={icon} alt="hunter icon" />
                </div>
            </div>
            <div className="main">
                <Cards />
                <ReputationBlock />
            </div>
        </div>
    );
};