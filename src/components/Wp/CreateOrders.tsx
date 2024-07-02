// frontend/src/Orders.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WpNavBar from './WpNavbar';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  CssBaseline,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import axios from 'axios';

const defaultTheme = createTheme();

interface Order {
  id: number;
  coffee_type: string;
  quantity: number;
  total_price: number;
  user_id: number;
}

export default function CreateOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [coffeeType, setCoffeeType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchOrders(token);
    }
  }, [navigate]);

  const fetchOrders = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:8000/orders/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error: string) {
      console.error('Error fetching orders:', error.response?.data?.detail || error.message);
    }
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        'http://localhost:8000/orders/',
        {
          coffee_type: coffeeType,
          quantity: quantity,
          total_price: totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        } 
      );
      setOrders([...orders, response.data]);
    } catch (error) {
      console.error('Error creating order:', error.response?.data?.detail || error.message);
    }
  };

  const handleUpdateOrder = async (orderId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(
        `http://localhost:8000/orders/${orderId}`,
        {
          quantity: quantity,
          total_price: totalPrice,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(token);
    } catch (error) {
      console.error('Error updating order:', error.response?.data?.detail || error.message);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:8000/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error: string) {
      console.error('Error deleting order:', error.response?.data?.detail || error.message);
    }
  };

  return (
    <>
    <WpNavBar />
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Orders
            </Typography>
            <Box component="form" sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="coffeeType"
                label="Coffee Type"
                name="coffeeType"
                value={coffeeType}
                onChange={(e) => setCoffeeType(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="totalPrice"
                label="Total Price"
                name="totalPrice"
                type="number"
                value={totalPrice}
                onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
              />
              <Button
                onClick={handleCreateOrder}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Create Order
              </Button>
            </Box>
            <Box sx={{ mt: 2 }}>
              {orders.map((order) => (
                <Paper key={order.id} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body1">
                    Coffee Type: {order.coffee_type}
                  </Typography>
                  <Typography variant="body1">
                    Quantity: {order.quantity}
                  </Typography>
                  <Typography variant="body1">
                    Total Price: {order.total_price}
                  </Typography>
                  <Button
                    onClick={() => handleUpdateOrder(order.id)}
                    variant="contained"
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Update Order
                  </Button>
                  <Button
                    onClick={() => handleDeleteOrder(order.id)}
                    variant="contained"
                    sx={{ mt: 1 }}
                  >
                    Delete Order
                  </Button>
                </Paper>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    </>
    
  );
}
