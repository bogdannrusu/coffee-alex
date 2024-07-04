/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@mui/material';
import axios from 'axios';

const defaultTheme = createTheme();

interface Order {
  id: number;
  good_name: string;
  quantity: number;
  good_package_id: number;
  userId: number;
}

interface Good {
  id: number;
  name: string;
  package_id: number;
}

interface Package {
  id: number;
  name: string;
  gross_weight: number;
}

export default function CreateOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [goods, setGoods] = useState<Good[]>([]);
  const [goodId, setGoodId] = useState<number | string>('');
  const [quantity, setQuantity] = useState(0);
  const [packages, setPackages] = useState<Package[]>([]);
  const [packageId, setPackageId] = useState<number | string>('');
  const [goodPackageId, setGoodPackageId] = useState<number | string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchOrders(token);
      fetchGoods();
      fetchPackages();
    }
  }, [navigate]);

  const fetchOrders = async (token: string) => {
    try {
      const response = await axios.get('http://localhost:5259/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data);
    } catch (error: any) {
      console.error('Error fetching orders:', error.response?.data?.detail || error.message);
    }
  };

  const fetchGoods = async () => {
    try {
      const response = await axios.get('http://localhost:5259/api/goods');
      setGoods(response.data);
    } catch (error: any) {
      console.error('Error fetching goods:', error.response?.data?.detail || error.message);
    }
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5259/api/packages');
      setPackages(response.data);
    } catch (error: any) {
      console.error('Error fetching packages:', error.response?.data?.detail || error.message);
    }
  };

  const handleCreateOrder = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      alert('You need to be logged in to create an order');
      return;
    }

    try {
      const selectedGood = goods.find((good) => good.id === goodId);
      const selectedPackage = packages.find((pack) => pack.id === packageId);
      const response = await axios.post(
        'http://localhost:5259/api/orders',
        {
          good_name: selectedGood?.name,
          quantity,
          good_package_id: selectedPackage?.id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOrders([...orders, response.data]);
    } catch (error: any) {
      console.error('Error creating order:', error.response?.data?.detail || error.message);
    }
  };

  const handleUpdateOrder = async (orderId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      alert('You need to be logged in to update an order');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5259/api/orders/${orderId}`,
        {
          quantity,
          good_package_id: goodPackageId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchOrders(token);
    } catch (error: any) {
      console.error('Error updating order:', error.response?.data?.detail || error.message);
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      alert('You need to be logged in to delete an order');
      return;
    }

    try {
      await axios.delete(`http://localhost:5259/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error: any) {
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
                <FormControl fullWidth margin="normal">
                  <InputLabel id="good-select-label">Produs</InputLabel>
                  <Select
                    labelId="good-select-label"
                    id="good-select"
                    value={goodId}
                    onChange={(e) => setGoodId(e.target.value as number)}
                    label="Produs"
                  >
                    {goods.map((good) => (
                      <MenuItem key={good.id} value={good.id}>
                        {good.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="quantity"
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseFloat(e.target.value))}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="package-select-label">Ambalaj</InputLabel>
                  <Select
                    labelId="package-select-label"
                    id="package-select"
                    value={packageId}
                    onChange={(e) => setPackageId(e.target.value as number)}
                    label="Ambalaj"
                  >
                    {packages.map((pack) => (
                      <MenuItem key={pack.id} value={pack.id}>
                        {pack.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  onClick={handleCreateOrder}
                >
                  Create Order
                </Button>
              </Box>
              {orders.map((order) => (
                <Box key={order.id} sx={{ mt: 2 }}>
                  <Typography>
                    Produsul dat: {order.good_name}, Quantity: {order.quantity}, Package ID: {order.good_package_id}
                  </Typography>
                  <TextField
                    margin="normal"
                    fullWidth
                    id="updateQuantity"
                    label="Update Quantity"
                    name="updateQuantity"
                    type="number"
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    id="updatePackageId"
                    label="Update Package ID"
                    name="updatePackageId"
                    type="number"
                    onChange={(e) => setGoodPackageId(parseInt(e.target.value))}
                  />
                  <Button
                    type="button"
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => handleUpdateOrder(order.id)}
                  >
                    Update Order
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, mb: 1 }}
                    onClick={() => handleDeleteOrder(order.id)}
                  >
                    Delete Order
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}
