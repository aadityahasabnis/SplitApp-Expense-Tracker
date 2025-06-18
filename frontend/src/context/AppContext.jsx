import React, { createContext, useContext, useState, useEffect } from "react";

// API Base URL
const API_BASE_URL =
  "https://splitapp-expense-tracker.onrender.com/api" ||
  "http://localhost:5000/api";

// Context
const AppContext = createContext();

// Provider
export const AppProvider = ({ children }) => {
  // State management (simplified without Redux)
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState([]);
  const [settlements, setSettlements] = useState([]);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API Functions
  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses`);
      const data = await response.json();

      if (data.success) {
        setExpenses(data.data);
      } else {
        setError(data.message || "Failed to fetch expenses");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error fetching expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      const data = await response.json();

      if (data.success) {
        setExpenses((prev) => [data.data, ...prev]);
        // Refresh balances and settlements
        fetchBalances();
        fetchSettlements();
      } else {
        setError(data.message || "Failed to add expense");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error adding expense:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateExpense = async (id, expense) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      const data = await response.json();

      if (data.success) {
        setExpenses((prev) => prev.map((e) => (e._id === id ? data.data : e)));
        // Refresh balances and settlements
        fetchBalances();
        fetchSettlements();
      } else {
        setError(data.message || "Failed to update expense");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error updating expense:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setExpenses((prev) => prev.filter((e) => e._id !== id));
        // Refresh balances and settlements
        fetchBalances();
        fetchSettlements();
      } else {
        setError(data.message || "Failed to delete expense");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error deleting expense:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchBalances = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settlements/balances`);
      const data = await response.json();

      if (data.success) {
        setBalances(data.data);
      }
    } catch (err) {
      console.error("Error fetching balances:", err);
    }
  };

  const fetchSettlements = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settlements`);
      const data = await response.json();

      if (data.success) {
        setSettlements(data.data);
      }
    } catch (err) {
      console.error("Error fetching settlements:", err);
    }
  };

  const fetchPeople = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/settlements/people`);
      const data = await response.json();

      if (data.success) {
        setPeople(data.data);
      }
    } catch (err) {
      console.error("Error fetching people:", err);
    }
  };

  const markSettlementAsPaid = async (settlement) => {
    try {
      setLoading(true);
      setError(null);

      // Create a settlement record expense
      const settlementExpense = {
        amount: settlement.amount,
        description: `Settlement: ${settlement.from} paid ${settlement.to}`,
        paid_by: settlement.from,
        category: "Other",
        participants: [
          {
            name: settlement.to,
            share: 1,
            shareType: "equal",
          },
        ],
        date: new Date().toISOString(),
        isSettlement: true, // Mark as settlement for tracking
      };
      const response = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settlementExpense),
      });

      const data = await response.json();

      if (data.success) {
        setExpenses((prev) => [data.data, ...prev]);
        // Refresh balances and settlements
        await fetchBalances();
        await fetchSettlements();
        await fetchPeople();
      } else {
        setError(data.message || "Failed to record settlement");
      }
    } catch (err) {
      setError("Failed to connect to server");
      console.error("Error marking settlement as paid:", err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchExpenses();
    fetchBalances();
    fetchSettlements();
    fetchPeople();
  }, []);
  const value = {
    // State
    expenses,
    balances,
    settlements,
    people,
    loading,
    error,
    // Actions
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    fetchBalances,
    fetchSettlements,
    fetchPeople,
    markSettlementAsPaid,
    setError,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
