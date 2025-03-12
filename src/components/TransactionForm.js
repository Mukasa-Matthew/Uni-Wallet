   // Uni-Wallet/src/components/TransactionForm.js
   import React, { useState } from 'react';

   const TransactionForm = () => {
       const [amount, setAmount] = useState('');
       const [transactionType, setTransactionType] = useState('');
       const [provider, setProvider] = useState('');

       const processAirtelPayment = async (transaction) => {
           const headers = {
               'Content-Type': 'application/json',
               'Accept': '*/*',
               'X-Country': 'UG',
               'X-Currency': 'UGX',
               'Authorization': 'Bearer UC*****2w', // Replace with your actual token
               'x-signature': 'MGsp*********Ag==', // Replace with your actual signature
               'x-key': 'DVZC***********NM=' // Replace with your actual key
           };

           const inputBody = JSON.stringify({
               amount: transaction.amount,
               type: transaction.type,
               provider: transaction.provider,
               // Add other required fields based on the API documentation
           });

           try {
               const response = await fetch('https://openapiuat.airtel.africa/standard/v2/cashin/', {
                   method: 'POST',
                   body: inputBody,
                   headers: headers
               });

               const body = await response.json();
               console.log(body);
               return body; // Return the response body for further processing
           } catch (error) {
               console.error('Payment processing failed:', error);
               return false; // Handle error appropriately
           }
       };

       const processPayment = async (transaction) => {
           // Call the Airtel payment API
           const paymentSuccess = await processAirtelPayment(transaction);
           return paymentSuccess; // Return the result of the API call
       };

       const handleSubmit = async (e) => {
           e.preventDefault();
           const transaction = { amount, type: transactionType, provider };
           const paymentSuccess = await processPayment(transaction);
           if (paymentSuccess) {
               alert('Payment successful!');
           } else {
               alert('Payment failed. Please try again.');
           }
       };

       return (
           <form onSubmit={handleSubmit}>
               <div>
                   <label>Amount:</label>
                   <input
                       type="number"
                       value={amount}
                       onChange={(e) => setAmount(e.target.value)}
                       required
                   />
               </div>
               <div>
                   <label>Transaction Type:</label>
                   <input
                       type="text"
                       value={transactionType}
                       onChange={(e) => setTransactionType(e.target.value)}
                       required
                   />
               </div>
               <div>
                   <label>Provider:</label>
                   <input
                       type="text"
                       value={provider}
                       onChange={(e) => setProvider(e.target.value)}
                       required
                   />
               </div>
               <button type="submit">Submit Payment</button>
           </form>
       );
   };

   export default TransactionForm;