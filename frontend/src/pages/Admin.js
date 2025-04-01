import React, { useState, useEffect } from "react";
import axios from "axios";

const Admin = () => {
  const [pizzas, setPizzas] = useState([]);
  const [form, setForm] = useState({ name: "", base: "", sauce: "", cheese: "", veggies: [], price: "", stock: "" });

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    const res = await axios.get("http://localhost:5000/api/pizzas");
    setPizzas(res.data);
  };

  const handleAddPizza = async () => {
    await axios.post("http://localhost:5000/api/pizzas/add", form);
    alert("Pizza added!");
    fetchPizzas();
  };

  const handleDeletePizza = async (id) => {
    await axios.delete(`http://localhost:5000/api/pizzas/delete/${id}`);
    alert("Pizza deleted!");
    fetchPizzas();
  };

  const handleEditPizza = async (id) => {
    await axios.put(`http://localhost:5000/api/pizzas/edit/${id}`, form);
    alert("Pizza updated!");
    fetchPizzas();
  };

  return (
    <div>
      <h1>Admin Dashboard - Inventory Management</h1>

      <div>
        <h2>Add / Edit Pizza</h2>
        <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input type="text" placeholder="Base" onChange={(e) => setForm({ ...form, base: e.target.value })} />
        <input type="text" placeholder="Sauce" onChange={(e) => setForm({ ...form, sauce: e.target.value })} />
        <input type="text" placeholder="Cheese" onChange={(e) => setForm({ ...form, cheese: e.target.value })} />
        <input type="text" placeholder="Veggies (comma separated)" onChange={(e) => setForm({ ...form, veggies: e.target.value.split(",") })} />
        <input type="number" placeholder="Price" onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input type="number" placeholder="Stock" onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <button onClick={handleAddPizza}>Add Pizza</button>
      </div>

      <h2>Manage Pizzas</h2>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza._id}>
            <strong>{pizza.name}</strong> - {pizza.base}, {pizza.sauce}, {pizza.cheese}  
            | Price: ${pizza.price} | Stock: {pizza.stock}  
            <button onClick={() => handleEditPizza(pizza._id)}>Edit</button>
            <button onClick={() => handleDeletePizza(pizza._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
