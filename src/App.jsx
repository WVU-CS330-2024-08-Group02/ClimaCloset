import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Closet } from './pages/Closet'
import { Weather } from './pages/Weather'
import { Profile } from './pages/Profile'
import { About } from './pages/About'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Closet" element={<Closet/>}/>
            <Route path="/Weather" element={<Weather/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/About" element={<About/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
