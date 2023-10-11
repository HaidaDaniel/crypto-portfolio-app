import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import client from '../../apollo/client';
import { FavoriteTable } from '../../components';

export default {
    title: 'FavoriteTable',
    component: FavoriteTable,
};

export const Default = () => (
    <ApolloProvider client={client}>
        <MemoryRouter initialEntries={[{ pathname: '/favorites' }]}>
            <FavoriteTable />
        </MemoryRouter>
    </ApolloProvider>)