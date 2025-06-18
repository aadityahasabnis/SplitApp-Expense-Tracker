import React, { useState } from "react";
import { AppProvider } from "./context/AppContext";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import BalanceView from "./components/BalanceView";
import Analytics from "./components/Analytics";

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "add":
        return <ExpenseForm />;
      case "expenses":
        return <ExpenseList />;
      case "balances":
        return <BalanceView />;
      case "analytics":
        return <Analytics />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <AppProvider>
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-blue-50">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderContent()}
          </div>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;
