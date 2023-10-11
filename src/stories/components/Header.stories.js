import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../../src/components/index';

export default {
    title: 'Header',
    component: Header,
};

export const HeaderStory = () => (
    <MemoryRouter>
        <div id="app-container">
            <Header />
        </div>
    </MemoryRouter>
)