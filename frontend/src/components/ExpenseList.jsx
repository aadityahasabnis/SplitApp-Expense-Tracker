import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Trash2, Edit, Calendar, Tag, User, IndianRupee } from "lucide-react";

const ExpenseList = () => {
  const { expenses, loading, deleteExpense, updateExpense } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [editingExpense, setEditingExpense] = useState(null);
  const [editForm, setEditForm] = useState({});

  const categories = [
    "All",
    "Food",
    "Travel",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Other",
  ];

  const filteredExpenses =
    selectedCategory === "All"
      ? expenses
      : expenses.filter((expense) => expense.category === selectedCategory);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      await deleteExpense(id);
    }
  };
  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setEditForm({
      amount: expense.amount,
      description: expense.description,
      category: expense.category,
      paid_by: expense.paid_by, // Add this missing field
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      await updateExpense(id, editForm);
      setEditingExpense(null);
      setEditForm({});
    } catch (error) {
      alert("Failed to update expense");
    }
  };

  const handleCancelEdit = () => {
    setEditingExpense(null);
    setEditForm({});
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Food: "bg-orange-100 text-orange-800",
      Travel: "bg-blue-100 text-blue-800",
      Utilities: "bg-green-100 text-green-800",
      Entertainment: "bg-purple-100 text-purple-800",
      Shopping: "bg-pink-100 text-pink-800",
      Other: "bg-gray-100 text-gray-800",
    };
    return colors[category] || colors.Other;
  };

  if (loading) {
    return (
      <div className="p-8 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Loading expenses...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Expenses</h2>
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-600" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredExpenses.length === 0 ? (
        <div className="py-12 text-center">
          <IndianRupee className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-lg text-gray-600">No expenses found</p>
          <p className="text-sm text-gray-500">
            {selectedCategory === "All"
              ? "Add your first expense to get started"
              : `No expenses in ${selectedCategory} category`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredExpenses.map((expense) => (
            <div
              key={expense._id}
              className="p-4 transition-all duration-200 border border-gray-200 rounded-lg hover:shadow-md bg-white/50"
            >
              <div className="flex items-start justify-between">
                {" "}
                <div className="flex-1">
                  {editingExpense === expense._id ? ( // Edit mode
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 text-lg font-semibold border border-gray-300 rounded-lg"
                        placeholder="Description"
                      />
                      <div className="flex space-x-3">
                        <input
                          type="number"
                          step="0.01"
                          value={editForm.amount}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              amount: parseFloat(e.target.value),
                            })
                          }
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Amount"
                        />
                        <input
                          type="text"
                          value={editForm.paid_by}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              paid_by: e.target.value,
                            })
                          }
                          className="w-32 px-3 py-2 border border-gray-300 rounded-lg"
                          placeholder="Paid by"
                        />
                        <select
                          value={editForm.category}
                          onChange={(e) =>
                            setEditForm({
                              ...editForm,
                              category: e.target.value,
                            })
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg"
                        >
                          {[
                            "Food",
                            "Travel",
                            "Utilities",
                            "Entertainment",
                            "Shopping",
                            "Other",
                          ].map((cat) => (
                            <option key={cat} value={cat}>
                              {cat}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    // Display mode
                    <div>
                      <div className="flex items-center mb-2 space-x-3">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {expense.description}
                        </h3>{" "}
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            expense.category
                          )}`}
                        >
                          {expense.category}
                        </span>
                        {expense.isSettlement && (
                          <span className="px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                            Settlement
                          </span>
                        )}
                        {expense.isRecurring && (
                          <span className="px-2 py-1 text-xs font-medium text-indigo-800 bg-indigo-100 rounded-full">
                            {expense.recurringFrequency}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center mb-3 space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>Paid by {expense.paid_by}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(expense.date)}</span>
                    </div>
                  </div>

                  {expense.participants && expense.participants.length > 0 && (
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Split between:</span>
                      <span className="ml-1">
                        {expense.participants.map((p) => p.name).join(", ")}
                      </span>{" "}
                      <div className="mt-1 text-xs text-gray-500">
                        {expense.participants.map((p, index) => (
                          <span key={index} className="mr-3">
                            {p.name}:{" "}
                            {p.shareType === "percentage"
                              ? `${p.share}% (₹${(
                                  (expense.amount * p.share) /
                                  100
                                ).toFixed(2)})`
                              : "Equal share"}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">
                      ₹{expense.amount.toFixed(2)}
                    </div>{" "}
                    {expense.participants &&
                      expense.participants.length > 0 && (
                        <div className="text-sm text-gray-500">
                          {expense.participants[0]?.shareType ===
                          "percentage" ? (
                            <span>Split by percentage</span>
                          ) : (
                            <span>
                              ₹
                              {(
                                expense.amount / expense.participants.length
                              ).toFixed(2)}{" "}
                              per person
                            </span>
                          )}
                        </div>
                      )}
                  </div>{" "}
                  <div className="flex flex-col space-y-2">
                    {editingExpense === expense._id ? (
                      <>
                        <button
                          onClick={() => handleSaveEdit(expense._id)}
                          className="p-2 text-green-600 transition-colors rounded-lg hover:bg-green-50"
                          title="Save changes"
                        >
                          ✓
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
                          title="Cancel edit"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(expense)}
                          className="p-2 text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
                          title="Edit expense"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(expense._id)}
                          className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                          title="Delete expense"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>{" "}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
