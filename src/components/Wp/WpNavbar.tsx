/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import globalDictionary from '../../Dictionary';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{globalDictionary.translateToRomanian('Orders') || 'Orders'}</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <div className="p-4 mb-2 bg-gray-100 rounded shadow">
              <p><strong>{globalDictionary.translateToRomanian('Order ID')}:</strong> {order.id}</p>
              <p><strong>{globalDictionary.translateToRomanian('Customer')}:</strong> {order.customer}</p>
              <p><strong>{globalDictionary.translateToRomanian('Total')}:</strong> ${order.total}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

function WpNavBar() {
  const [showOrders, setShowOrders] = useState(false);

  const handleShowOrders = () => {
    setShowOrders(true);
  };

  useEffect(() => {
    // Add translations
    globalDictionary.addTranslation('Home', 'Acasa');
    globalDictionary.addTranslation('Orders', 'Comenzi');
    globalDictionary.addTranslation('Projects', 'Proiecte');
    globalDictionary.addTranslation('Calendar', 'Calendar');
    globalDictionary.addTranslation('Reports', 'Rapoarte');
    globalDictionary.addTranslation('Order ID', 'ID Comandă');
    globalDictionary.addTranslation('Customer', 'Client');
    globalDictionary.addTranslation('Total', 'Suma Totală');
  }, []);

  return (
    <div>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                  alt="Workflow"
                />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Home') || 'Home'}
                  </Link>
                  <button
                    onClick={handleShowOrders}
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {globalDictionary.translateToRomanian('Orders') || 'Orders'}
                  </button>
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
            <div className="-mr-2 flex md:hidden">
              <button
                type="button"
                className="bg-secondary inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {globalDictionary.translateToRomanian('Home') || 'Home'}
            </Link>
            <button
              onClick={handleShowOrders}
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {globalDictionary.translateToRomanian('Orders') || 'Orders'}
            </button>
            <Link
              to="/projects"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {globalDictionary.translateToRomanian('Projects') || 'Projects'}
            </Link>
            <Link
              to="/calendar"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {globalDictionary.translateToRomanian('Calendar') || 'Calendar'}
            </Link>
            <Link
              to="/reports"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              {globalDictionary.translateToRomanian('Reports') || 'Reports'}
            </Link>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">{globalDictionary.translateToRomanian('Dashboard') || 'Dashboard'}</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {showOrders && <Orders />}
        </div>
      </main>
    </div>
  );
}

export default WpNavBar;
