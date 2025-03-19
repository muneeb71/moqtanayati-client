import { useState } from 'react';

const ShippingAddressPopup = ({ onClose, onSave }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const handleSave = () => {
        if (name && address) {
            onSave({ name, address });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl w-[350px] p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                    <button onClick={onClose} className="text-gray-600">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M6 18L18 6M6 6l12 12" 
                            />
                        </svg>
                    </button>
                    <h2 className="text-xl font-semibold text-center flex-grow">
                        Add Shipping Address
                    </h2>
                    <div className="w-6"></div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Enter name"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            placeholder="Enter full address"
                            rows={4}
                        />
                    </div>
                </div>

                <button 
                    onClick={handleSave}
                    className="w-full mt-4 bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600"
                >
                    Save Address
                </button>
            </div>
        </div>
    );
};

export default ShippingAddressPopup; 