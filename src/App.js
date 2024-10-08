import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import QuizForm from './pages/QuizForm';
import HomePage from './pages/Home';
import SettingsPage from './pages/Settings';
import QrScan from './pages/QrScan';
import Navbar from './components/Navbar';
import Visualization from './pages/Visualization';
import UpdateEntriesPage from './pages/UpdateEntriesPage';

function App() {

  // Function to initialize localStorage values
  useEffect(() => {
    const initializeLocalStorage = () => {
      if (!localStorage.getItem('config')) {
        localStorage.setItem('config', JSON.stringify({}));
      }

      if (!localStorage.getItem('scouting_data_dcmp')) {
        localStorage.setItem('scouting_data_dcmp', JSON.stringify({}));
      }

      if (!localStorage.getItem('submissions')) {
        localStorage.setItem('submissions', JSON.stringify([])); // Assuming submissions are an array
      }

      if (!localStorage.getItem('scouting_data_url')) {
        localStorage.setItem('scouting_data_url', ''); // Set default URL if needed
      }
    };

    // Call the function to initialize localStorage
    initializeLocalStorage();
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/quizform" element={<QuizForm />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/qrscan" element={<QrScan />} />
          <Route path="/visualization" element={<Visualization />} />
          <Route path="/update-entries" element={<UpdateEntriesPage />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;