import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import {FormDataType} from './type'

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState<FormDataType>({}); 

  useEffect(() => {
    const fetchUsers = async () => {
      try{
        const response = await axios.get(`http://localhost:4004/api/product/${id}`);
      setData(response.data);
      }catch(error){
        console.log(`User Id Not fetch it ${error}`)
      }
    };
    fetchUsers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target; 
    setData({
      ...data,
      [name]: value, 
    });
  };

  const handleSubmit = async (e) => {
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
    <div className="p-4">
      <h2 className="text-xl mb-4">Edit Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          className="border p-2 mb-4 block"
          value={data.name || ""}
          placeholder="Item Name"
          onChange={handleChange} 
        />
        <input
          name="email"
          className="border p-2 mb-4 block"
          type="email"
          value={data.email || ""}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          name="number"
          className="border p-2 mb-4 block"
          type="text"
          value={data.number || ""}
          placeholder="Number"
          onChange={handleChange}
        />
        <input
          name="address"
          className="border p-2 mb-4 block"
          type="text"
          value={data.address || ""}
          placeholder="Address"
          onChange={handleChange}
        />
        <button type="submit" className="bg-blue-500 text-white p-2">Update</button>
      </form>
    </div>
  )
}

export default Update;

// dummy test code git