// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors());
// app.use(express.json());
// let users = [
//   { id: "1", name: "John", email: "john@example.com" },
//   { id: "2", name: "Jane", email: "jane@example.com" },
//   { id: "3", name: "Alice", email: "alice@example.com" }
// ];

// app.get('/api/users', (req, res) => {
//   res.json({ users });
// });
// app.post('/api/users/:id', (req, res) => {
// 	console.log(users)
// 	const { id } = req.params;
// 	const { name, email } = req.body;
// 	users = users.map(user => user.id === id ? { ...user, name, email } : user);
// 	io.emit('updateUsers', users);
// 	console.log(users)
// 	res.status(200).send();
//   });
// io.on('connection', (socket) => {
//   console.log('New client connected');

//   socket.emit('updateUsers', users);
// 	console.log(users)
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"]
//   }
// });

// app.use(cors());
// app.use(express.json());

// const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
// const CART_FILE = path.join(__dirname, 'data', 'cart.json');

// // Kiểm tra và tạo file data nếu chưa tồn tại
// if (!fs.existsSync(PRODUCTS_FILE)) {
//   const initialProducts = [
//     { id: 1, name: 'Product 1' },
//     { id: 2, name: 'Product 2' },
//     { id: 3, name: 'Product 3' },
//     { id: 4, name: 'Product 4' },
//     { id: 5, name: 'Product 5' }
//   ];
//   fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts));
// }

// if (!fs.existsSync(CART_FILE)) {
//   fs.writeFileSync(CART_FILE, JSON.stringify([]));
// }

// app.get('/products', (req, res) => {
//   fs.readFile(PRODUCTS_FILE, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error reading data file' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.get('/cart', (req, res) => {
//   fs.readFile(CART_FILE, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error reading data file' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.post('/add-to-cart', (req, res) => {
//   const newProduct = req.body;

//   fs.readFile(CART_FILE, (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Error reading data file' });
//     }

//     const cart = JSON.parse(data);
//     cart.push(newProduct);

//     fs.writeFile(CART_FILE, JSON.stringify(cart), (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Error writing to data file' });
//       }

//       io.emit('cart-updated', cart);
//       res.status(201).json(cart);
//     });
//   });
// });

// io.on('connection', (socket) => {
//   console.log('New client connected');
//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// server.listen(4000, () => {
//   console.log('Server listening on port 4000');
// });


/// code trên có cart và product






// const JSON_SERVER_URL = 'http://localhost:3000'; // Assuming json-server runs on port 3000

// // Function to fetch users from json-server
// const fetchUsers = async () => {
//   const fetch = await import('node-fetch');
//   const response = await fetch.default(`${JSON_SERVER_URL}/users`);
//   const data = await response.json();
//   return data;
// };


// let users = [];
// fetchUsers().then(data => {
//   users = data;
//   io.emit('updateUsers', users); 
// });

// app.get('/api/users', async (req, res) => {
//   const data = await fetchUsers();
//   res.json(data);
// });

// app.post('/api/users/:id', async (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;

//   // Update user in the JSON server
//   const fetch = await import('node-fetch');
//   await fetch.default(`${JSON_SERVER_URL}/users/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ name, email }),
//   });

//   // Fetch updated users from JSON server
//   users = await fetchUsers();

//   // Emit updated users to all clients
//   io.emit('updateUsers', users);

//   res.status(200).send();
// });

// io.on('connection', (socket) => {
//   console.log('New client connected');

//   // Emit current users to new client
//   socket.emit('updateUsers', users);

//   socket.on('disconnect', () => {
//     console.log('Client disconnected');
//   });
// });

// const PORT = 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));



// server.js

const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const CART_FILE = path.join(__dirname, 'data', 'cart.json');

// Kiểm tra và tạo file data nếu chưa tồn tại
if (!fs.existsSync(PRODUCTS_FILE)) {
  const initialProducts = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' }
  ];
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(initialProducts));
}

if (!fs.existsSync(CART_FILE)) {
  fs.writeFileSync(CART_FILE, JSON.stringify([]));
}

app.get('/products', (req, res) => {
  fs.readFile(PRODUCTS_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }
    res.json(JSON.parse(data));
  });
});

app.get('/cart', (req, res) => {
  fs.readFile(CART_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/add-to-cart', (req, res) => {
  const newProduct = req.body;

  fs.readFile(CART_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }

    const cart = JSON.parse(data);
    cart.push(newProduct);

    fs.writeFile(CART_FILE, JSON.stringify(cart), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to data file' });
      }

      // Gửi thông điệp 'cart-updated' tới tất cả các client
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'cart-updated', cart }));
        }
      });

      res.status(201).json(cart);
    });
  });
});

app.post('/remove-from-cart', (req, res) => {
  const productId = req.body.id;

  fs.readFile(CART_FILE, (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading data file' });
    }

    let cart = JSON.parse(data);
    cart = cart.filter(product => product.id !== productId);

    fs.writeFile(CART_FILE, JSON.stringify(cart), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error writing to data file' });
      }

      // Gửi thông điệp 'cart-updated' tới tất cả các client
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ event: 'cart-updated', cart }));
        }
      });

      res.status(201).json(cart);
    });
  });
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server listening on port 4000');
});
