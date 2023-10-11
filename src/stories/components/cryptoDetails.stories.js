import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CryptoDetails } from '../../components/index';
import { ApolloProvider } from '@apollo/client';
import client from '../../apollo/client';
export default {
    title: 'CryptoDetails',
    component: CryptoDetails,
};
const args = {
    state: { idOfCrypto: 1 },
};
/// start only with main npm start!!!
export const Default = () => (
    <ApolloProvider client={client}>
        <MemoryRouter initialEntries={[{ state: args.state, pathname: '/crypto/bitcoin' }]}>
            <CryptoDetails />
        </MemoryRouter>
    </ApolloProvider>
);