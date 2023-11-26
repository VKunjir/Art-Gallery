import React from 'react'
import Navbar from '../components/Navbar'
import CartTable from '../components/CartTable'
import { useState } from 'react'

const Cart = () => {

  const [cartItems, setCartItems] = useState(
    [
      {
        id: 1,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
        title: 'Mona Lisa',
        price: 5000,
        quantity: 1,
      },
      {
        id: 2,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg/1024px-Jan_Vermeer_van_Delft_-_The_Glass_of_Wine_-_Google_Art_Project.jpg',
        title: 'The Wine Glass',
        price: 4500,
        quantity: 1,
      },
    ]);

  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <div className='m-10'>
        <div className='text-3xl m-12'>Your Cart</div>
        <CartTable cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />
      </div>

      <div className="flex justify-end text-3xl mr-40 mt-9">
        Total: ₹{cartTotal.toFixed(2)}
        <div className='ml-10 bg-black text-white p-2 rounded-md'>Checkout</div>
      </div>

    </div>
  )
}

export default Cart