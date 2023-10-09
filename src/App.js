/** @format */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import { Portfolio, Favorites, Main, CryptoPage } from './components/';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/portfolio' element={<Portfolio />} />
      <Route path='/crypto/:name' element={<CryptoPage />} />
    </Routes>
  </BrowserRouter>
)
