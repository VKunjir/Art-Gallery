import React from 'react';

const OrderTable = ({ orders }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Art ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Shipping Address
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                    <tr key={order.orderId}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {order.orderId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {order.artId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {order.orderDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {order.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            ₹ {order.totalPrice.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {order.shippingAddress}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OrderTable;
