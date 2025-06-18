import React from "react";
import { Split, IndianRupee, Users, Calculator } from "lucide-react";

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="text-white shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm">
              <Split className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">SplitApp</h1>
              <p className="text-sm text-emerald-100">Smart expense sharing</p>
            </div>
          </div>

          <div className="items-center hidden space-x-6 md:flex">
            <button
              onClick={() => setActiveTab("add")}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-200 ₹{
                activeTab === "add"
                  ? "bg-white/20"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              <span className="text-sm">Track</span>
            </button>
            <button
              onClick={() => setActiveTab("balances")}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-200 ₹{
                activeTab === "balances"
                  ? "bg-white/20"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="text-sm">Share</span>
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-all duration-200 ₹{
                activeTab === "analytics"
                  ? "bg-white/20"
                  : "bg-white/10 hover:bg-white/15"
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span className="text-sm">Settle</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
