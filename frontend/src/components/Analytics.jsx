import React from "react";
import { useApp } from "../context/AppContext";
import {
  PieChart,
  BarChart,
  TrendingUp,
  Calendar,
  IndianRupee,
} from "lucide-react";

const Analytics = () => {
  const { expenses } = useApp();

  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  // Calculate monthly spending
  const monthlySpending = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  // Calculate person totals
  const personTotals = expenses.reduce((acc, expense) => {
    acc[expense.paid_by] = (acc[expense.paid_by] || 0) + expense.amount;
    return acc;
  }, {});

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const averageExpense =
    expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const getCategoryColor = (category, index) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-100">
              <IndianRupee className="w-6 h-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Average Expense
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{averageExpense.toFixed(2)}
              </p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Expenses
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {expenses.length}
              </p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <PieChart className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Spending by Category
          </h2>
        </div>

        {Object.keys(categoryTotals).length === 0 ? (
          <div className="py-8 text-center">
            <PieChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No expenses to analyze yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(categoryTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([category, amount], index) => {
                const percentage = (amount / totalExpenses) * 100;
                return (
                  <div key={category} className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full ₹{getCategoryColor(
                        category,
                        index
                      )}`}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {category}
                        </span>
                        <span className="text-sm text-gray-600">
                          ₹{amount.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ₹{getCategoryColor(
                            category,
                            index
                          )}`}
                          style={{ width: `₹{percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="w-12 text-sm text-right text-gray-500">
                      {percentage.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Monthly Spending */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <BarChart className="w-6 h-6 text-green-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Monthly Spending
          </h2>
        </div>

        {Object.keys(monthlySpending).length === 0 ? (
          <div className="py-8 text-center">
            <BarChart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No monthly data available yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(monthlySpending)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([month, amount]) => {
                const maxAmount = Math.max(...Object.values(monthlySpending));
                const percentage = (amount / maxAmount) * 100;
                return (
                  <div key={month} className="flex items-center space-x-4">
                    <div className="w-20 text-sm text-gray-600">{month}</div>
                    <div className="flex-1">
                      <div className="w-full h-3 bg-gray-200 rounded-full">
                        <div
                          className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                          style={{ width: `₹{percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="w-16 text-sm font-medium text-right text-gray-900">
                      ₹{amount.toFixed(2)}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      {/* Top Spenders */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-yellow-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">Top Spenders</h2>
        </div>

        {Object.keys(personTotals).length === 0 ? (
          <div className="py-8 text-center">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">No spending data available yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(personTotals)
              .sort(([, a], [, b]) => b - a)
              .map(([person, amount], index) => (
                <div
                  key={person}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-8 h-8 text-sm font-bold text-yellow-800 bg-yellow-100 rounded-full">
                      {index + 1}
                    </div>
                    <span className="font-medium text-gray-900">{person}</span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ₹{amount.toFixed(2)}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
