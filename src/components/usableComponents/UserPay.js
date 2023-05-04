import React, { useState, useEffect } from "react";

const UserPay = ({ username }) => {
  const [paymentStatus, setPaymentStatus] = useState("");
  const [accountBalance, setAccountBalance] = useState(null);

  const fetchAccountBalance = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/user/me/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      setAccountBalance(data.AccountBalance);
    } catch (error) {
      console.error("Error fetching account balance:", error);
    }
  };

  useEffect(() => {
    fetchAccountBalance();
  }, [username]);

  const handlePayment = async (amount) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/payaccount", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({
          PaymentAmount: amount,
        }),
      });

      if (response.ok) {
        setPaymentStatus(`Payment of ${-amount} dollars was successful.`);
        fetchAccountBalance(); // Fetch the account balance after successful payment
      } else {
        setPaymentStatus(`Error processing the payment: ${response.status}`);
      }
    } catch (error) {
      setPaymentStatus(`Error processing the payment: ${error}`);
    }
  };
  return (
    <div className="user-pay-container w-full py-20 border-b-[1px] border-b-black">
      <h2 className="text-lg font-semibold text-center">User Payment</h2>
      <p className="text-2xl text-gray-400 uppercase tracking-wide text-center mb-4">
        Amount to pay: ${accountBalance}
      </p>
      {paymentStatus && (
        <p className="py-1 bg-gradient-to-r from-[#1e2024] to-[#23272b] shadow-shadowOne text-center text-green-500 text-base tracking-wide animate-bounce w-1/2 mx-auto mb-4">
          {paymentStatus}
        </p>
      )}
      <button
        onClick={() => handlePayment(20)}
        className="w-1/2 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-base py-1 px-2 lgl:px-4 rounded-lg shadow-shadowOne hover:shadow-shadowTwo transition duration-300 ease-in-out focus:outline-none mx-auto block mb-4"
      >
        Pay 20 dollars
      </button>
      <button
        onClick={() => handlePayment(accountBalance * 1)}
        className="w-1/2 bg-gradient-to-r from-red-500 to-yellow-500 text-white text-base py-1 px-2 lgl:px-4 rounded-lg shadow-shadowOne hover:shadow-shadowTwo transition duration-300 ease-in-out focus:outline-none mx-auto block"
      >
        Pay Full Amount
      </button>
    </div>
  );
};

export default UserPay;
