import React, { useEffect, useState } from "react";
import { getProducts } from "../api.js";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const res = await getProducts();
      setProducts(res.results || res);
    }
    loadProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🛍️ Available Products
        </h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300"
              >
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-300 rounded-t-2xl flex items-center justify-center text-gray-600">
                    No Image
                  </div>
                )}

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-lg">
                      ${product.price}
                    </span>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
