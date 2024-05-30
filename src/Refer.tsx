import React, { useState } from "react";

function Refer() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    const res = await fetch("http://localhost:3000/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        subject: "subject",
        message: "i love chicken biscuits",
      }),
    });
    const data = await res.json();
    // setResponse(data.success || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Refer a friend to earn more deos!
      </h1>
      <input
        type="email"
        placeholder="Enter friend's email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="text-black border border-gray-300 p-2 rounded mb-4 w-full max-w-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        onClick={sendEmail}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Refer now
      </button>
    </div>
  );
}

export default Refer;
