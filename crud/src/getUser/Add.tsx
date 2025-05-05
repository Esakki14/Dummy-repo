import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {FormDataType} from './type';

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

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const submit = async (e) => {
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
    <div>
      <div>
        <Link to="/">User Data</Link>
      </div>
      <form onSubmit={submit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default Add;
