import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NumberButton from './components/NumberButton'
import Form from './components/Form'
import Main from './components/Main'
import HarryPotterAPI from './components/HarryPotterAPI'
import Microblog from './components/Microblog'
import Login from './components/Microblog/Login'
import Feed from './components/Microblog/Feed'

export default function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/numberButton" element={<NumberButton />} />
          <Route path="/form" element={<Form />} />
          <Route path="/harry-potter-characters" element={<HarryPotterAPI />} />
          <Route path="/Microblog/cadastro" element={<Microblog />} />
          <Route path="/Microblog/inicio" element={<Feed />} />
          <Route path="/Microblog/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

