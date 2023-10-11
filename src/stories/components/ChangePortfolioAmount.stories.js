import React from 'react';
import { action } from '@storybook/addon-actions';
import { ChangePortfolioAmount } from '../../components/index';

export default {
    title: 'ChangePortfolioAmount',
    component: ChangePortfolioAmount,
};

export const Default = () => (
    <ChangePortfolioAmount
        onAdd={action('Add clicked')}
        onSubtract={action('Subtract clicked')}
        onDelete={action('Delete clicked')}
    />
);