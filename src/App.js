import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import SignUpSignIn from "./components/Signup";
import TransactionForm from './components/TransactionForm'; // Import the TransactionForm component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpSignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<TransactionForm />} /> {/* Add a route for the payment form */}
      </Routes>
    </Router>
  );
}

export default App;