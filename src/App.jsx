import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Closet } from './pages/Closet'
import { Weather } from './pages/Weather'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Closet" element={<Closet/>}/>
            <Route path="/Weather" element={<Weather/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
