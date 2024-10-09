import React, { useState } from "react";

const CountedSection = ({ countedProducts, onEditProduct, searchTerm }) => {
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  const handleCompleteStockTake = () => {
    setShowCompletePopup(true);
    setTimeout(() => {
      setShowCompletePopup(false);
    }, 2000);
  };

  const filteredCountedProducts = countedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Counted Products</h2>

      {countedProducts.length > 0 && (
        <button
          onClick={handleCompleteStockTake}
          className="mb-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
        >
          Complete Stock Take
        </button>
      )}

      {filteredCountedProducts.length === 0 ? (
        <p className="text-gray-600">No products counted yet.</p>
      ) : (
        filteredCountedProducts.map((product, index) => (
          <div key={product.id}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1.5">{product.name}</h3>
                <p className="text-gray-600">Department: {product.department}</p>
                <p className="text-gray-600">
                  Stock on Hand: {product.quantity}
                </p>
                <p className="text-gray-600">
                  Counted by: DMAN  
                </p>
              </div>
              <button
                onClick={() => onEditProduct(product)}
                className="bg-orange-500 text-white py-1 px-4 rounded-md hover:bg-orange-600"
              >
                Edit
              </button>
            </div>
            {index < filteredCountedProducts.length - 1 && (
              <hr className="my-2 border-gray-300" />
            )}
          </div>
        ))
      )}

      {showCompletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold text-blue-950">
              Stock Take Completed
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default CountedSection;
