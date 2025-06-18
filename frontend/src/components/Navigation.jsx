import React from "react";
import { Home, Plus, BarChart3, Calculator, TrendingUp } from "lucide-react";

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "add", label: "Add Expense", icon: Plus },
    { id: "expenses", label: "Expenses", icon: BarChart3 },
    { id: "balances", label: "Balances", icon: Calculator },
    { id: "analytics", label: "Analytics", icon: TrendingUp },
  ];

  return (
    <nav className="p-2 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
      <div className="flex space-x-1 overflow-x-auto">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all duration-200 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              <IconComponent className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
