import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import pharmacyLogo from '../assets/banner_center.png';

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const userName = localStorage.getItem('userName') || 'User';
  const userEmail = localStorage.getItem('userEmail') || 'user@example.com';

  useEffect(() => {
    // Fetch the product data from the JSON file
    fetch('../../public/respone.json')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleStockUpdate = (id, newQuantity) => {
    // Simulate updating the stock quantity by modifying the state
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex justify-between items-center">
          <img src={pharmacyLogo} alt="Pharmacy Logo" className="h-16" />
          <div>
            <h2 className="text-xl font-bold">{userName}</h2>
            <p className="text-gray-600">{userEmail}</p>
          </div>
        </div>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </header>

      <main className="w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Stock</h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          {filteredProducts.map((product) => (
            <div key={product.id} className="mb-4">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-lg font-bold">{product.name}</h3>
                  <p className="text-gray-600">
                    Trade Price: ${product.tradePrice.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Retail Price: ${product.retailPrice.toFixed(2)}
                  </p>
                  <p className="text-gray-600">
                    Quantity: {product.quantity}
                  </p>
                </div>
                <div>
                  <input
                    type="number"
                    min="0"
                    value={product.quantity}
                    onChange={(e) =>
                      handleStockUpdate(product.id, parseInt(e.target.value) || 0)
                    }
                    className="w-20 p-2 border rounded-md focus:outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate('/main-menu')}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Back to Main Menu
        </button>
      </main>
    </div>
  );
};

export default StockPage;
