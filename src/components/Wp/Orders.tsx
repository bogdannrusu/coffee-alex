import React, { useEffect, useState } from 'react';
import axios from 'axios';
import globalDictionary from '../../Dictionary';
import WpNavBar from './WpNavbar';

interface Order {
  id?: number;
  good_name: string;
  quantity: number;
  price: number;
  total_price: number;
  user_id: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [newOrder, setNewOrder] = useState<Order>({
    good_name: '',
    quantity: 0,
    price: 0,
    total_price: 0,
    user_id: 0,
  });
  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
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

    fetchOrders();
  }, []);

  const handleCreateOrder = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/orders', newOrder);
      setOrders([...orders, response.data]);
      setNewOrder({good_name: '', quantity: 0, price: 0, total_price: 0, user_id: 0 });
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

  return (
    <>
      <WpNavBar />
      <div className="container mx-auto p-4">
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
            onClick={() => window.location.reload()}
          >
            {globalDictionary.translateToRomanian('View Orders') || 'View Orders'}
          </button>
        </div>
        {showCreateForm && (
          <form onSubmit={handleCreateOrder} className="mb-4 space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Good Name') || 'Denumirea produsului'}</label>
              <input
                type="text"
                name="good_name"
                placeholder={globalDictionary.translateToRomanian('Good Name') || 'Denumirea produsului'}
                value={newOrder.good_name}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the ID of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Quantity') || 'Cantitatea'}</label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={newOrder.quantity}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the quantity of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Price') || 'Pret'}</label>
              <input
                type="number"
                name="price"
                placeholder={globalDictionary.translateToRomanian('Price') || 'Pret'}
                value={newOrder.price}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the price per unit of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Total Price') || 'Pret Total'}</label>
              <input
                type="number"
                name="total_price"
                placeholder="Total Price"
                value={newOrder.total_price}
                onChange={handleInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the total price (quantity * price).</span>
            </div>
          
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              {globalDictionary.translateToRomanian('Create') || 'Create'}
            </button>
          </form>
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {orders.map((order) => (
            <div key={order.id} className="p-4 mb-2 bg-gray-100 rounded shadow">
              <p><strong>{globalDictionary.translateToRomanian('Order ID')}:</strong> {order.id}</p>
              <p><strong>{globalDictionary.translateToRomanian('Good ID')}:</strong> {order.good_name}</p>
              <p><strong>{globalDictionary.translateToRomanian('Quantity')}:</strong> {order.quantity}</p>
              <p><strong>{globalDictionary.translateToRomanian('Price')}:</strong> ${order.price}</p>
              <p><strong>{globalDictionary.translateToRomanian('Total Price')}:</strong> ${order.total_price}</p>
              <p><strong>{globalDictionary.translateToRomanian('User ID')}:</strong> {order.user_id}</p>
              <button onClick={() => handleEditOrder(order)} className="px-2 py-1 bg-yellow-500 text-white rounded">
                {globalDictionary.translateToRomanian('Edit') || 'Edit'}
              </button>
              <button onClick={() => handleDeleteOrder(order.id!)} className="px-2 py-1 bg-red-500 text-white rounded">
                {globalDictionary.translateToRomanian('Delete') || 'Delete'}
              </button>
            </div>
          ))}
        </div>
        {editOrder && (
          <form onSubmit={handleUpdateOrder} className="mb-4 space-y-4">
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Good ID') || 'Good ID'}</label>
              <input
                type="number"
                name="good_name"
                placeholder="Good Name"
                value={editOrder.good_name}
                onChange={handleEditInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the ID of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Quantity') || 'Quantity'}</label>
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                value={editOrder.quantity}
                onChange={handleEditInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the quantity of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Price') || 'Price'}</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={editOrder.price}
                onChange={handleEditInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the price per unit of the good.</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('Total Price') || 'Total Price'}</label>
              <input
                type="number"
                name="total_price"
                placeholder="Total Price"
                value={editOrder.total_price}
                onChange={handleEditInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the total price (quantity * price).</span>
            </div>
            <div className="flex flex-col">
              <label className="font-semibold">{globalDictionary.translateToRomanian('User ID') || 'User ID'}</label>
              <input
                type="number"
                name="user_id"
                placeholder="User ID"
                value={editOrder.user_id}
                onChange={handleEditInputChange}
                className="border rounded px-2 py-1"
              />
              <span className="text-gray-400 text-xs">Enter the ID of the user placing the order.</span>
            </div>
            <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
              {globalDictionary.translateToRomanian('Update') || 'Update'}
            </button>
          </form>
        )}
      </div>
    </>
  );
};

export default Orders;
