import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import globalDictionary from '../../Dictionary';
import logoNav from 'assets/images/leafIcon.svg';

const WpNavBar: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    // Add translations
    globalDictionary.addTranslation('Home', 'Acasa');
    globalDictionary.addTranslation('Orders', 'Comenzi');
    globalDictionary.addTranslation('Projects', 'Proiecte');
    globalDictionary.addTranslation('Calendar', 'Calendar');
    globalDictionary.addTranslation('Reports', 'Rapoarte');
    globalDictionary.addTranslation('Create Order', 'Creați Comandă');
    globalDictionary.addTranslation('Customize', 'Personalizați');
    globalDictionary.addTranslation('Option 1', 'Opțiunea 1');
    globalDictionary.addTranslation('Option 2', 'Opțiunea 2');
    globalDictionary.addTranslation('Option 3', 'Opțiunea 3');
  }, []);

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-8 w-8" src={logoNav} alt="Workflow" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Home') || 'Home'}
                  </Link>
                  <div className="relative">
                    <button
                      onClick={handleToggleDropdown}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {globalDictionary.translateToRomanian('Orders') || 'Orders'}
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <Link
                          to="/create_orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {globalDictionary.translateToRomanian('Create Order') || 'Create Order'}
                        </Link>
                        <Link
                          to="/view_orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {globalDictionary.translateToRomanian('View Orders') || 'View Orders'}
                        </Link>
                       {/*  <div className="border-t border-gray-200"></div> */}
                        <button
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          {globalDictionary.translateToRomanian('Customize') || 'Customize'}
                        </button>
                        <div className="pl-4">
                          <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                            {globalDictionary.translateToRomanian('Option 1') || 'Option 1'}
                          </button>
                          <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                            {globalDictionary.translateToRomanian('Option 2') || 'Option 2'}
                          </button>
                          <button className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                            {globalDictionary.translateToRomanian('Option 3') || 'Option 3'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <Link
                    to="/projects"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Projects') || 'Projects'}
                  </Link>
                  <Link
                    to="/calendar"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Calendar') || 'Calendar'}
                  </Link>
                  <Link
                    to="/reports"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Reports') || 'Reports'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default WpNavBar;
