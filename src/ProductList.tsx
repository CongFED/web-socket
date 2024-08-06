import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

interface Product {
  id: number;
  name: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/products").then((response) => {
      setProducts(response.data);
    });

    axios.get("http://localhost:4000/cart").then((response) => {
      setCart(response.data);
    });

    const socket = io("http://localhost:4000");
    socket.on("cart-updated", (updatedCart: Product[]) => {
      setCart(updatedCart); // Cập nhật giỏ hàng khi có sự thay đổi
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component unmount
    };
  }, []);

  const addToCart = (product: Product) => {
    axios
      .post("http://localhost:4000/add-to-cart", product)
      .then((response) => {
        setCart(response.data);
      });
  };

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name}{" "}
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
//server.js
// socket.on(eventName, callback);

// const io = require('socket.io')(server);

// // Khi một client kết nối
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   // Gửi dữ liệu đến client khi có sự kiện 'update'
//   socket.emit('update', { message: 'Hello from server!' });

//   // Lắng nghe sự kiện 'client-event' từ client
//   socket.on('client-event', (data) => {
//     console.log('Data received from client:', data);
//   });

//   // Xử lý khi client ngắt kết nối
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// client.js

// const socket = io('http://localhost:4000');

// // Lắng nghe sự kiện 'update' từ máy chủ
// socket.on('update', (data) => {
//   console.log('Update from server:', data.message);
// });

// // Gửi sự kiện 'client-event' đến máy chủ
// socket.emit('client-event', { info: 'Hello from client!' });
