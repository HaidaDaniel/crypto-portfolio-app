import { ThemeProvider } from '@mui/material';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { PortfolioChart } from '../../components';

import { theme } from '../../theme';

export default {
    title: 'PortfolioChart',
    component: PortfolioChart,
};

export const OnlyBitcoin = () => (
    <ThemeProvider theme={theme}>
        <PortfolioChart
            portfolioData={[
                {
                    name: 'Bitcoin',
                    amount: 1.5,
                    priceUsd: 45000,
                },
            ]}
        /></ThemeProvider>
);

export const BitcoinAndEtherium = () => (
    <ThemeProvider theme={theme}>
        <PortfolioChart
            portfolioData={[
                {
                    name: 'Bitcoin',
                    amount: 1.5,
                    priceUsd: 45000,
                },
                {
                    name: 'Ethereum',
                    amount: 20,
                    priceUsd: 4500,
                }
            ]}
        /></ThemeProvider>
);
export const Empty = () => (
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <PortfolioChart
                portfolioData={[
                ]}
            /></BrowserRouter></ThemeProvider>
);