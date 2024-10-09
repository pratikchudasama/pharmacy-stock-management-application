import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AvailableSection from "./AvailableSection";
import CountedSection from "./CountedSection";
import ProductEditScreen from "./ProductEditScreen";
import companyLogo from "../assets/banner_center.png";

const StockPage = () => {
  const [products, setProducts] = useState([]);
  const [countedProducts, setCountedProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLocationEdit, setShowLocationEdit] = useState(false);
  const [view, setView] = useState("available");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleCountProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );

    if (!countedProducts.find((p) => p.id === updatedProduct.id)) {
      setCountedProducts((prev) => [...prev, updatedProduct]);
    }

    setSelectedProduct(null);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <header className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center">
        <img src={companyLogo} alt="Company Logo" className="h-12 w-auto" />
        <div className="text-right">
          <h2 className="text-lg font-semibold text-blue-950">{userName}</h2>
          <p className="text-sm text-gray-600">{userEmail}</p>
        </div>
      </header>

      <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md mb-4 relative">
        <button
          onClick={() => navigate("/main-menu")}
          className="absolute top-2 left-2 flex items-center text-blue-950 py-1 px-2 rounded-md hover:bg-blue-100 focus:outline-none"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back
        </button>

        <h1 className="text-2xl font-bold text-blue-950 text-center">
          💊Stock
        </h1>

        <div className="flex flex-col mt-4 space-y-2">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-950"
            />
            <button
              onClick={() => handleSearch({ target: { value: searchTerm } })}
              className="bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-900"
            >
              Search
            </button>
          </div>
          <button
            className="bg-gray-200 text-gray-500 py-2 rounded-md hover:bg-gray-300"
            disabled
          >
            𝄃𝄃𝄂𝄂𝄀𝄁 Scan Barcode
          </button>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={() => setView("available")}
            className={`py-2 px-4 ${
              view === "available"
                ? "bg-white text-black border-b-2 border-blue-900 focus:outline-none"
                : "border-b-2 border-gray-100 text-gray-700"
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setView("counted")}
            className={`py-2 px-4 ${
              view === "counted"
                ? "bg-white text-black border-b-2 border-blue-900 focus:outline-none"
                : "border-b-2 border-gray-100 text-gray-700"
            }`}
          >
            Counted
          </button>
        </div>
      </div>

      <main className="w-full max-w-4xl space-y-6">
        {view === "available" ? (
          <AvailableSection
            products={products}
            onCountProduct={handleCountProduct}
            searchTerm={searchTerm}
          />
        ) : (
          <CountedSection
            countedProducts={countedProducts}
            onEditProduct={handleCountProduct}
            searchTerm={searchTerm}
          />
        )}
      </main>

      {selectedProduct && (
        <ProductEditScreen
          product={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          onSave={handleUpdateProduct}
          showLocationEdit={showLocationEdit}
          setShowLocationEdit={setShowLocationEdit}
        />
      )}

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-blue-950">
              Added to Stock Take
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockPage;
