import './App.css'
import Main from './components/Main'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import LocationsSection from './components/LocationSection'

function App() {

  return (
    <>
      <Navbar/>
      <Main/>
      <MenuSection/>
      <AboutSection/>
      <LocationsSection/>
      <Footer/>
    </>
  )
}

export default App
