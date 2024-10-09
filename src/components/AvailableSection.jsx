import React from "react";

const AvailableSection = ({ products, onCountProduct, searchTerm }) => {
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Available Products</h2>
      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products available.</p>
      ) : (
        filteredProducts.map((product, index) => (
          <div key={product.id}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-bold mb-1.5">{product.name}</h3>
                <p className="text-gray-600 ">
                  Deptartment: {product.department}
                </p>
                <p className="text-gray-600 ">
                  Stock on Hand: {product.quantity}
                </p>
                <p className="text-gray-600 ">
                    Trade Price:{product.tradePrice} 
                </p>
                <p className="text-gray-600">
                    Retail Price:{product.retailPrice} 
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="bg-red-500 text-white hover:bg-red-600 py-1 px-4 rounded-md"
                  disabled
                >
                  Zero
                </button>
                <button
                  onClick={() => onCountProduct(product)}
                  className="bg-orange-500 text-white py-1 px-4 rounded-md hover:bg-orange-600"
                >
                  Count
                </button>
              </div>
            </div>
            {index < filteredProducts.length - 1 && (
              <hr className="my-2 border-gray-300" />
            )}
          </div>
        ))
      )}
    </section>
  );
};

export default AvailableSection;
