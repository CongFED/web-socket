// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import io from "socket.io-client";

// interface Product {
//   id: number;
//   name: string;
// }

// const Cart: React.FC = () => {
//   const [cart, setCart] = useState<Product[]>([]);

//   useEffect(() => {
//     axios.get("http://localhost:4000/cart").then((response) => {
//       console.log(1);
//       setCart(response.data);
//     });

//     const socket = io("http://localhost:4000");
//     socket.on("cart-updated", (updatedCart: Product[]) => {
//       console.log(2);
//       setCart(updatedCart);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Cart</h1>
//       <ul>
//         {cart.map((product) => (
//           <li key={product.id}>{product.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Cart;

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  id: number;
  name: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<Product[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    axios.get("http://localhost:4000/cart").then((response) => {
      setCart(response.data);
    });

    const socket = new WebSocket("ws://localhost:4000");
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.event === "cart-updated") {
        setCart(message.cart);
      }
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const removeFromCart = (product: Product) => {
    axios
      .post("http://localhost:4000/remove-from-cart", { id: product.id })
      .then((response) => {
        setCart(response.data);
      });
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cart.map((product) => (
          <li key={product.id}>
            {product.name}{" "}
            <button onClick={() => removeFromCart(product)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
