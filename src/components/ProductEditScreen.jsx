import React, { useState, useEffect } from "react";

const ProductEditScreen = ({
  product,
  setSelectedProduct,
  onSave,
  showLocationEdit,
  setShowLocationEdit,
}) => {
  const [onHand, setOnHand] = useState(product.quantity.toString());
  const [locations, setLocations] = useState([
    { name: "Front Shop", quantity: 2 },
    { name: "Stock Room", quantity: 3 },
  ]);
  const [printLabelCount, setPrintLabelCount] = useState("");
  const [printLabelChecked, setPrintLabelChecked] = useState(false);

  const totalOnHand = locations.reduce((sum, loc) => sum + loc.quantity, 0);

  useEffect(() => {
    setOnHand(totalOnHand.toString());
  }, [locations]);

  const handleLocationChange = (index, newQuantity) => {
    const updatedLocations = locations.map((location, i) =>
      i === index ? { ...location, quantity: newQuantity } : location
    );
    setLocations(updatedLocations);
  };

  const handleSave = () => {
    onSave({ ...product, quantity: totalOnHand });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full md:max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl text-center font-bold mb-4 text-blue-950">
          {product.name}
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-700">Barcode:</p>
            <p className="text-gray-900">1234567890</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Department:</p>
            <p className="text-gray-900">{product.department}</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Order List:</p>
            <p className="text-gray-900">UNITED DRUG</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Head Office Maintained:</p>
            <input type="checkbox" className="ml-2 h-4 w-4" />
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Last Received:</p>
            <p className="text-gray-900">2024-09-19</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Last Sold:</p>
            <p className="text-gray-900">2024-09-21</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Trade Price:</p>
            <p className="text-gray-900">€{product.tradePrice.toFixed(2)}</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Retail Price:</p>
            <p className="text-gray-900">€{product.retailPrice.toFixed(2)}</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Stock Location:</p>
            <p className="text-gray-900">ALL LOCATIONS</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">On Hand:</p>
            <div className="flex items-center">
              <input
                type="text"
                value={onHand}
                readOnly
                className="p-1 w-14 text-center border rounded-md bg-gray-100"
              />
              <button
                onClick={() => setShowLocationEdit(true)}
                className="ml-2 bg-gray-300 text-white py-1 px-2 rounded-md hover:bg-gray-400"
              >
                🖊️
              </button>
            </div>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Pack Size:</p>
            <p className="text-gray-900">12 ml</p>
          </div>
          <hr className="my-2 border-gray-300" />

          <div className="flex justify-between items-center">
            <p className="text-gray-700">Print Labels:</p>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={printLabelChecked}
                onChange={() => setPrintLabelChecked(!printLabelChecked)}
                className="mr-2 h-4 w-4"
              />
              <p className="mr-1">Labels #</p>
              <input
                type="number"
                value={printLabelCount}
                onChange={(e) => setPrintLabelCount(e.target.value)}
                placeholder="0"
                className="p-1 border rounded-md w-14"
                min="0"
                disabled={!printLabelChecked}
              />
            </div>
          </div>
          <hr className="my-2 border-gray-300" />
        </div>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setSelectedProduct(null)}
            className="bg-gray-300 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
          >
            Update
          </button>
        </div>
      </div>

      {showLocationEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-2 text-blue-950">
              {product.name}
            </h3>
            <p className="text-md font-semibold mb-2 text-blue-950">
              Dpt: {product.department}
            </p>
            <h4 className="text-md font-semibold mb-2 text-blue-950">
              On-Hand: {onHand}
            </h4>
            <table className="min-w-full text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-gray-600">Stock Location</th>
                  <th className="py-2 px-4 text-gray-600">On Hand</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-2 px-4">{location.name}</td>
                    <td className="py-2 px-4">
                      <input
                        type="number"
                        value={location.quantity.toString()}
                        onChange={(e) =>
                          handleLocationChange(
                            index,
                            parseInt(e.target.value) || ""
                          )
                        }
                        className="w-full p-1 border rounded-md"
                        placeholder="Enter quantity"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={() => setShowLocationEdit(false)}
                className="bg-gray-300 text-gray-800 py-1 px-4 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowLocationEdit(false)}
                className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductEditScreen;
