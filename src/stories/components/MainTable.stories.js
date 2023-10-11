import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { MainTable } from '../../components';

import client from '../../apollo/client';

export default {
    title: 'MainTable',
    component: MainTable,
};

export const Default = () => (
    <ApolloProvider client={client}>
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
            <MainTable />
        </MemoryRouter>
    </ApolloProvider>)