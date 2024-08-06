// import { io, Socket } from "socket.io-client";
// import { useEffect, useState } from "react";
// import Button from "./Button";
// import html2canvas from "html2canvas";
// import "./App.css";
// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// const useUsers = () => {
//   const [users, setUsers] = useState<User[]>([]);
//   const [socket, setSocket] = useState<Socket | null>(null);

//   useEffect(() => {
//     const newSocket = io("http://localhost:5000");
//     setSocket(newSocket);

//     newSocket.on("updateUsers", (updatedUsers: User[]) => {
//       setUsers(updatedUsers);
//     });

//     return () => {
//       newSocket.disconnect();
//     };
//   }, []);

//   const updateUser = async (user: User) => {
//     await fetch(`http://localhost:5000/api/users/${user.id}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(user),
//     });
//   };

//   return { users, updateUser };
// };

// const App: React.FC = () => {
//   const { users, updateUser } = useUsers();
//   const [editingUserId, setEditingUserId] = useState<string | null>(null);
//   const [editedUser, setEditedUser] = useState<{ name: string; email: string }>(
//     { name: "", email: "" }
//   );

//   const handleEdit = (user: { id: string; name: string; email: string }) => {
//     setEditingUserId(user.id);
//     setEditedUser({ name: user.name, email: user.email });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleBlur = (userId: string) => {
//     updateUser({ id: userId, ...editedUser });
//     setEditingUserId(null);
//   };
//   const [mode, setMode] = useState(true);
//   const [text, setText] = useState("Image");
//   const handleMode = () => {
//     setMode(!mode);
//   };
//   useEffect(() => {
//     const handleKeyPress = (event: KeyboardEvent) => {
//       if (event.key === "F8") {
//         setMode((prevMode) => !prevMode);
//       } else if (event.key === "F7") {
//         captureScreen();
//       }
//     };

//     window.addEventListener("keydown", handleKeyPress);

//     return () => {
//       window.removeEventListener("keydown", handleKeyPress);
//     };
//   }, []); // Ensure this effect runs only once on component mount

//   const captureScreen = () => {
//     html2canvas(document.body).then((canvas) => {
//       const image = canvas.toDataURL();

//       setText(image);
//     });
//   };
//   return (
//     <div
//       className="App"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",

//           width: "90vw",
//         }}
//       >
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "content",
//           }}
//         >
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id} onClick={() => handleEdit(user)}>
//                   {editingUserId === user.id ? (
//                     <td>
//                       <input
//                         type="text"
//                         name="name"
//                         value={editedUser.name}
//                         onChange={handleChange}
//                         onBlur={() => handleBlur(user.id)}
//                       />
//                     </td>
//                   ) : (
//                     <td>{user.name}</td>
//                   )}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div
//           style={{
//             marginLeft: "20px",
//           }}
//         >
//           <h4
//             style={{
//               padding: "10px",
//               borderStyle: "solid",
//               borderWidth: "1px",
//               borderColor: "#333333",
//               maxWidth: "800px",
//               height: "auto",
//               wordWrap: "break-word", // Thêm thuộc tính này
//               overflowWrap: "break-word", // Thêm thuộc tính này
//             }}
//           >
//             {text}
//           </h4>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

// vong quay
// import React, { useState } from "react";
// import { Wheel } from "react-custom-roulette";

// const data = [
//   { option: "Option 1" },
//   { option: "Option 2" },
//   { option: "Option 3" },
//   { option: "Option 4" },
//   { option: "Option 5" },
// ];

// const App = () => {
//   const [mustSpin, setMustSpin] = useState(false);
//   const [prizeNumber, setPrizeNumber] = useState(0);

//   const handleSpinClick = () => {
//     const newPrizeNumber = Math.floor(Math.random() * data.length);
//     console.log(newPrizeNumber);
//     setPrizeNumber(newPrizeNumber);
//     setMustSpin(true);
//   };
//   console.log(mustSpin, prizeNumber);
//   return (
//     <div>
//       <Wheel
//         mustStartSpinning={mustSpin}
//         prizeNumber={prizeNumber}
//         textDistance={75}
//         data={data}
//         onStopSpinning={() => {
//           setMustSpin(false);
//         }}
//       />
//       <button onClick={handleSpinClick}>Spin</button>
//     </div>
//   );
// };

// export default App;

//

import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import ProductList from "./ProductList";
import Cart from "./Cart";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Real-Time Cart</h1>
          <nav>
            <Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
