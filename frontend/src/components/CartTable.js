import React from 'react';

const CartTable = ({ cartItems, increaseQuantity, decreaseQuantity }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subtotal
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {cartItems.map((item) => (
                    <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <img src={item.image} alt={item.title} className="h-10 w-10 object-cover" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {item.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            ₹{item.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                                <button onClick={() => decreaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md mr-2">
                                    -
                                </button>
                                {item.quantity}
                                <button onClick={() => increaseQuantity(item.id)} className="bg-gray-200 px-2 py-1 rounded-md ml-2">
                                    +
                                </button>
                            </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            ${(item.price * item.quantity).toFixed(2)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CartTable;
