import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { PortfolioTable } from '../../components';

import client from '../../apollo/client';
import { theme } from '../../theme';

export default {
    title: 'PortfolioTable',
    component: PortfolioTable,
};

export const Default = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[{ pathname: '/portfolio' }]}>
                <PortfolioTable />
            </MemoryRouter>
        </ThemeProvider>
    </ApolloProvider>)