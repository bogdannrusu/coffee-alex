import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import globalDictionary from '../../Dictionary';
import logoNav from 'assets/images/leafIcon.svg'

interface Order {
  id?: number;
  good_name: string;
  quantity: number;
  total_price: number;
  user_id: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({
    good_name: '',
    quantity: 0,
    total_price: 0,
    user_id: 0,
  });
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:8000/orders');
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data: Order[] = await response.json();
        if (Array.isArray(data)) {
          setOrders(data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleCreateOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/orders', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({ good_name: '', quantity: 0, total_price: 0, user_id: 0 });
      setShowCreateForm(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error creating order: ${error.response?.data.detail}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Error creating order:', error);
    }
  };

  const handleUpdateOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    if (editOrder && editOrder.id) {
      try {
        await axios.put(`http://localhost:8000/orders/${editOrder.id}`, editOrder);
        setOrders(orders.map(order => (order.id === editOrder.id ? editOrder : order)));
        setEditOrder(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setErrorMessage(`Error updating order: ${error.response?.data.detail}`);
        } else {
          setErrorMessage('An unknown error occurred.');
        }
        console.error('Error updating order:', error);
      }
    }
  };

  const handleDeleteOrder = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error deleting order: ${error.response?.data.detail}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Error deleting order:', error);
    }
  };

  const handleEditOrder = (order: Order) => {
    setEditOrder(order);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewOrder(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editOrder) {
      setEditOrder(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleShowOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8000/orders');
      setOrders(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(`Error fetching orders: ${error.response?.data.detail}`);
      } else {
        setErrorMessage('An unknown error occurred.');
      }
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{globalDictionary.translateToRomanian('Orders') || 'Orders'}</h2>
      {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
      <div className="flex space-x-4 mb-4">
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        {globalDictionary.translateToRomanian('Create Order') || 'Create Order'}
      </button>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleShowOrders}
      >
        {globalDictionary.translateToRomanian('View Orders') || 'View Orders'}
      </button>
      </div>
      {showCreateForm && (
        <form onSubmit={handleCreateOrder} className="mb-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            name="good_name"
            placeholder="Good Name"
            value={newOrder.good_name}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            name="total_price"
            placeholder="Total Price"
            value={newOrder.total_price}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
          <input
            type="number"
            name="user_id"
            placeholder="User ID"
            value={newOrder.user_id}
            onChange={handleInputChange}
            className="border rounded px-2 py-1"
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
            {globalDictionary.translateToRomanian('Create') || 'Create'}
          </button>
        </form>
      )}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {orders.map((order) => (
          <div key={order.id} className="p-4 mb-2 bg-gray-100 rounded shadow">
            <p><strong>{globalDictionary.translateToRomanian('Order ID')}:</strong> {order.id}</p>
            <p><strong>{globalDictionary.translateToRomanian('Good Name')}:</strong> {order.good_name}</p>
            <p><strong>{globalDictionary.translateToRomanian('Quantity')}:</strong> {order.quantity}</p>
            <p><strong>{globalDictionary.translateToRomanian('Total Price')}:</strong> ${order.total_price}</p>
            <p><strong>{globalDictionary.translateToRomanian('User ID')}:</strong> {order.user_id}</p>
            <button onClick={() => handleEditOrder(order)} className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
            <button onClick={() => handleDeleteOrder(order.id!)} className="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const WpNavBar: React.FC = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleShowOrders = () => {
    setShowOrders(true);
  };

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
    globalDictionary.addTranslation('Order ID', 'ID Comandă');
    globalDictionary.addTranslation('Good Name', 'Denumire produs');
    globalDictionary.addTranslation('Quantity', 'Cantitate');
    globalDictionary.addTranslation('Total Price', 'Preț Total');
    globalDictionary.addTranslation('User ID', 'ID Utilizator');
    globalDictionary.addTranslation('Create Order', 'Creați Comandă');
    globalDictionary.addTranslation('Customize', 'Personalizați');
    globalDictionary.addTranslation('Option 1', 'Opțiunea 1');
    globalDictionary.addTranslation('Option 2', 'Opțiunea 2');
    globalDictionary.addTranslation('Option 3', 'Opțiunea 3');
    globalDictionary.addTranslation('View Orders', 'Vizualizati comenzi');
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
                  src={ logoNav }
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
                  <div className="relative">
                    <button
                      onClick={handleToggleDropdown}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {globalDictionary.translateToRomanian('Orders') || 'Orders'}
                    </button>
                    {showDropdown && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                        <button
                          onClick={handleShowOrders}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left space-x-4"
                        >
                          {globalDictionary.translateToRomanian('View Orders') || 'View Orders'}
                        </button>
                        <div className="border-t border-gray-200"></div>
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
      {showOrders && <Orders />}
    </div>
  );
};

export default WpNavBar;

