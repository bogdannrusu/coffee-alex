import React, { useState } from 'react';
import TopNav from '../Header/TopNav';
import Navbar from '../Header/Navbar';

const App: React.FC = () => {
  const [language, setLanguage] = useState<'en' | 'ro'>('en');

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'en' ? 'ro' : 'en'));
  };

  return (
    <div>
      <TopNav language={language} toggleLanguage={toggleLanguage} />
      <Navbar language={language} />
    </div>
  );
};

export default App;
