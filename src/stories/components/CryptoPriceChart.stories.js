import React from 'react';
import { CryptoPriceChart } from '../../components';

export default {
    title: 'CryptoPriceChart',
    component: CryptoPriceChart,
};

export const CryptoPriceChartBitcoin = () => (
    <div id="app-container"> <CryptoPriceChart cryptoId="bitcoin" /></div>)

export const CryptoPriceChartEthereum = () => (
    <div id="app-container"> <CryptoPriceChart cryptoId="ethereum" /></div>)