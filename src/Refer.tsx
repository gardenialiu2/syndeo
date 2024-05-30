import React, { useState } from "react";

function Refer() {
  const [email, setEmail] = useState("");

  const handleClick = () => {
    alert(`Refer a friend to: ${email}`);
    // You can add additional logic here to handle the email, such as sending it to a server
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Refer a friend to earn more deos!
      </h1>
      <input
        type="email"
        placeholder="Enter friend's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4 w-full max-w-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Refer now
      </button>
    </div>
  );
}

export default Refer;
