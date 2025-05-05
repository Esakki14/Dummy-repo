import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FormDataType } from './type';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography
} from '@mui/material';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<FormDataType>({
    name: '',
    email: '',
    number: '',
    address: ''
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4004/api/product/${id}`);
        setData(response.data);
      } catch (error) {
        console.error(`User ID fetch failed: ${error}`);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4004/api/product/${id}`, data);
      alert('Item updated successfully!');
      navigate('/');
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Edit User
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
          Back
        </Button>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Number"
            name="number"
            value={data.number}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={data.address}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Update
          </Button>
        
        </form>
      </Box>
    </Container>
  );
};

export default Update;
