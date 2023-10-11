import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { Main } from '../../../components/index';

import client from '../../../apollo/client';
import { theme } from '../../../theme';

export default {
    title: 'Main',
    component: Main,
};

export const Default = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[{ pathname: '/' }]}>
                <Main />
            </MemoryRouter>
        </ThemeProvider>
    </ApolloProvider>)