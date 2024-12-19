/**
 * This file defines routing information for all pages that the user can interact with,
 * and handles the user navigating between pages. With App exported, it will be able to 
 * communicate with root component of the app. 
 */

// Import libraries and modules
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home/Home'
import { Preferences } from './pages/Preferences/Preferences'
import { Weather } from './pages/Weather/Weather'
import { Profile } from './pages/Profile/Profile'
import { About } from './pages/About/About'
import { Login } from './pages/Login/Login'
import { Signup } from './pages/Signup/Signup'

// Defines routing and layout of app
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Layout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/Preferences" element={<Preferences/>}/>
            <Route path="/Weather" element={<Weather/>}/>
            <Route path="/Login" element={<Login/>}/>
            <Route path="/Signup" element={<Signup/>}/>
            <Route path="/Profile" element={<Profile/>}/>
            <Route path="/About" element={<About/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

// Make App default in all files
export default App
