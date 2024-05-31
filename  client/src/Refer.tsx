import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Refer(
  { referrerEmail }: { referrerEmail: string | undefined },
) {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        referrerEmail,
      }),
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Email sent successfully!");
    } else {
      toast.error("Failed to send email. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4 text-blue-600">
        Refer a friend to earn more Deos and Sui!
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
