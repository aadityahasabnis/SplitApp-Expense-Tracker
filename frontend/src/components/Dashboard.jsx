import React from "react";
import { useApp } from "../context/AppContext";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Receipt,
  IndianRupee,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const { expenses, balances, settlements } = useApp();
  // Calculate statistics
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const totalPeople = balances.length;
  const totalSettlements = settlements.length;

  // Find the first person's balance or use 0 if no balances
  const firstPersonBalance = balances.length > 0 ? balances[0].balance : 0;

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 transition-all duration-300 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Expenses
              </p>{" "}
              <p className="text-2xl font-bold text-gray-900">
                ₹{totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100">
              <Receipt className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="p-6 transition-all duration-300 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                People Involved
              </p>
              <p className="text-2xl font-bold text-gray-900">{totalPeople}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 transition-all duration-300 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30 hover:shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Settlements Due
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {totalSettlements}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="p-6 transition-all duration-300 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30 hover:shadow-xl">
          <div className="flex items-center justify-between">
            {" "}
            <div>
              <p className="text-sm font-medium text-gray-600">
                First Person Balance
              </p>
              <p
                className={`text-2xl font-bold ${
                  firstPersonBalance >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                ₹{Math.abs(firstPersonBalance).toFixed(2)}
              </p>
              <p className="text-xs text-gray-500">
                {firstPersonBalance >= 0 ? "Is owed" : "Owes"}
              </p>
            </div>{" "}
            <div
              className={`p-3 rounded-lg ${
                firstPersonBalance >= 0 ? "bg-green-100" : "bg-red-100"
              }`}
            >
              {firstPersonBalance >= 0 ? (
                <TrendingUp className="w-6 h-6 text-green-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Quick Overview
        </h3>

        {/* Recent Expenses */}
        <div className="mb-6">
          <h4 className="mb-3 font-medium text-gray-700 text-md">
            Recent Expenses
          </h4>
          <div className="space-y-2">
            {expenses.length === 0 ? (
              <p className="py-4 text-center text-gray-500">
                No expenses yet. Add your first expense!
              </p>
            ) : (
              expenses.slice(0, 3).map((expense) => (
                <div
                  key={expense._id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-emerald-100">
                      <IndianRupee className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {expense.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        Paid by {expense.paid_by}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">
                      ₹{expense.amount.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{expense.category}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Pending Settlements */}
        {settlements.length > 0 && (
          <div>
            <h4 className="mb-3 font-medium text-gray-700 text-md">
              Pending Settlements
            </h4>
            <div className="space-y-2">
              {settlements.slice(0, 3).map((settlement, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-red-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {settlement.from} owes {settlement.to}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-red-600">
                    ₹{settlement.amount.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
