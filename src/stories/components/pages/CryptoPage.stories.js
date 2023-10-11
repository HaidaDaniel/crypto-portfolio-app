import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { CryptoPage } from '../../../components/index';

import client from '../../../apollo/client';
import { theme } from '../../../theme';

export default {
    title: 'CryptoPage',
    component: CryptoPage,
};

const args = {
    state: { idOfCrypto: 1 },
};

export const Default = () => (
    <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
            <MemoryRouter initialEntries={[{ state: args.state, pathname: '/crypto/bitcoin' }]}>
                <CryptoPage />
            </MemoryRouter>
        </ThemeProvider>
    </ApolloProvider>)