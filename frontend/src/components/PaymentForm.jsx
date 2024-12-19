import React, { useState } from 'react';

const PaymentForm = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send payment details to backend (ensure to use HTTPS)
    const paymentData = {
      cardNumber,
      expiryDate,
      cvv,
      name,
    };

    // Call your backend payment processor
    fetch('/api/process-payment', {
      method: 'POST',
      body: JSON.stringify(paymentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert('Payment successful!');
        } else {
          alert('Payment failed, please try again!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred, please try again later!');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Cardholder Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Card Number</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Expiry Date</label>
        <input
          type="text"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CVV</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
        />
      </div>
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
