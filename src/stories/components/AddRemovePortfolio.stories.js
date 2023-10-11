import React from 'react';
import { AddRemovePortfolio } from '../../../src/components/index';

export default {
    title: 'AddRemovePortfolio',
    component: AddRemovePortfolio,
};

export const PortfolioStoryFalse = () => (
    <div id="app-container">
        <AddRemovePortfolio isInPortfolio={false} onTogglePortfolio={() => { }} />
    </div>
);

export const PortfolioStoryTrue = () => (
    <div id="app-container">
        <AddRemovePortfolio isInPortfolio={true} onTogglePortfolio={() => { }} />
    </div>
);