/** @format */
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import { Main } from './components/pages/Main';
import { Favorites } from './components/pages/Favorites'
import { Portfolio } from './components/pages/Portfolio';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/favorites' element={<Favorites />} />
      <Route path='/portfolio' element={<Portfolio />} />
      {/* <Route path='/crypto/:cryptoId' element={<CryptoPage />} /> */}
    </Routes>
  </BrowserRouter>
)
