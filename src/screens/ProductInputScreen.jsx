import React, { useState, useContext } from 'react';
import { ShoppingBag, X, ChevronRight } from 'lucide-react';
import AppContext from '../context/AppContext';

function ProductInputScreen() {
    const { products, setProducts, setPage, showNotification } = useContext(AppContext);
    const [currentProduct, setCurrentProduct] = useState({ title: '', description: '' });

    const addProduct = () => {
        if (currentProduct.title.trim() && currentProduct.description.trim()) {
            setProducts([...products, currentProduct]);
            setCurrentProduct({ title: '', description: '' });
        } else {
            showNotification("Please provide both product title and description.");
        }
    };
    
    const removeProduct = (index) => {
        const newProducts = products.filter((_, i) => i !== index);
        setProducts(newProducts);
    };

    const handleFinish = () => {
        if (products.length > 0) {
            localStorage.setItem('products', JSON.stringify(products));
            setPage('workspace');
        } else {
            showNotification("Please add at least one product.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-indigo-100 p-3 rounded-full">
                        <ShoppingBag className="w-8 h-8 text-indigo-600" />
                    </div>
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Add Your Products</h2>
                        <p className="text-slate-600">List the products you want to create posts for.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <input
                            type="text"
                            value={currentProduct.title}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, title: e.target.value })}
                            placeholder="Product Title (e.g., 'Choco-Loco Milkshake')"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                        />
                        <textarea
                            value={currentProduct.description}
                            onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                            placeholder="Product Description (e.g., 'A rich, creamy chocolate milkshake...')"
                            className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-slate-50"
                        ></textarea>
                        <button onClick={addProduct} className="w-full bg-indigo-500 text-white font-semibold py-3 rounded-lg hover:bg-indigo-600 transition">
                            Add Product
                        </button>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg h-full border border-slate-200">
                        <h3 className="font-bold mb-3 text-lg text-slate-800">Your Product List</h3>
                        {products.length === 0 ? (
                            <p className="text-slate-500 text-center py-8">Your products will appear here.</p>
                        ) : (
                            <ul className="space-y-2">
                                {products.map((p, i) => (
                                    <li key={i} className="flex justify-between items-center bg-white p-3 rounded-md shadow-sm border border-slate-200">
                                        <div>
                                            <p className="font-semibold">{p.title}</p>
                                            <p className="text-sm text-slate-500">{p.description.substring(0,30)}...</p>
                                        </div>
                                        <button onClick={() => removeProduct(i)} className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-100"><X className="w-4 h-4"/></button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                <div className="mt-8 flex justify-between items-center">
                    <button onClick={() => setPage('brand')} className="text-slate-600 hover:text-slate-900 font-semibold">
                        &larr; Back to Brand Voice
                    </button>
                    <button onClick={handleFinish} className="flex items-center justify-center gap-2 bg-green-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Go to Workspace <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductInputScreen;