import { useEffect } from 'react';
import { Routes, Route } from 'react-router';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
    </Routes>
  );
}

export default App;
