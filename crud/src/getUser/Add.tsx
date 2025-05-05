import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FormDataType } from './type';
import {
  Box,
  TextField,
  Button,
  Typography,
  Container
} from '@mui/material';

const Add = () => {
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    number: '',
    address: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Add component mounted");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4004/api/products', formData);
      console.log(response.data);
      alert("User saved successfully!");
      setFormData({ name: '', email: '', number: '', address: '' });
      navigate('/');
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={4}>
        <Typography variant="h4" gutterBottom>
          Add User
        </Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mb: 2 }}>
          View User Data
        </Button>
        <form onSubmit={submit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Number"
            name="number"
            type="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Add;
