import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Plus, X, Users, IndianRupee, Percent, Calculator } from "lucide-react";

const ExpenseForm = () => {
  const { addExpense, people } = useApp();
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    paid_by: "",
    category: "Other",
    isRecurring: false,
    recurringFrequency: "monthly",
  });

  const [participants, setParticipants] = useState([]);
  const [participantName, setParticipantName] = useState("");
  const [splitType, setSplitType] = useState("equal"); // 'equal' or 'percentage'

  const categories = [
    "Food",
    "Travel",
    "Utilities",
    "Entertainment",
    "Shopping",
    "Other",
  ];

  // Get unique people names for the dropdown
  const peopleNames = people.map((person) => person.name);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description || !formData.paid_by) {
      alert("Please fill in all required fields");
      return;
    }

    // Process participants based on split type
    let processedParticipants = [...participants];

    if (splitType === "equal") {
      // For equal split, each participant gets equal share (1 means equal)
      processedParticipants = participants.map((p) => ({
        ...p,
        share: 1,
        shareType: "equal",
      }));
    } else if (splitType === "percentage") {
      // For percentage split, validate that percentages add up to 100
      const totalPercentage = participants.reduce(
        (sum, p) => sum + (parseFloat(p.share) || 0),
        0
      );
      if (Math.abs(totalPercentage - 100) > 0.01) {
        alert("Percentages must add up to 100%");
        return;
      }
      // Keep the actual percentage values for percentage type
      processedParticipants = participants.map((p) => ({
        ...p,
        share: parseFloat(p.share) || 0,
        shareType: "percentage",
      }));
    }

    // If no participants, add the payer as the only participant
    if (processedParticipants.length === 0) {
      processedParticipants = [
        { name: formData.paid_by, share: 1, shareType: "equal" },
      ];
    }

    const expenseData = {
      amount: parseFloat(formData.amount),
      description: formData.description,
      paid_by: formData.paid_by,
      category: formData.category,
      participants: processedParticipants,
      isRecurring: formData.isRecurring,
      recurringFrequency: formData.isRecurring
        ? formData.recurringFrequency
        : undefined,
      date: new Date().toISOString(),
    };

    await addExpense(expenseData);

    // Reset form
    setFormData({
      amount: "",
      description: "",
      paid_by: "",
      category: "Other",
      isRecurring: false,
      recurringFrequency: "monthly",
    });
    setParticipants([]);
    setParticipantName("");
    setSplitType("equal");
  };

  const addParticipant = () => {
    if (participantName.trim()) {
      const newParticipant = {
        name: participantName.trim(),
        share: splitType === "equal" ? 1 : 0,
        shareType: splitType,
      };
      setParticipants([...participants, newParticipant]);
      setParticipantName("");
    }
  };

  const removeParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipantShare = (index, share) => {
    const updated = [...participants];
    updated[index] = {
      ...updated[index],
      share: splitType === "percentage" ? parseFloat(share) || 0 : 1,
    };
    setParticipants(updated);
  };

  const changeSplitType = (newType) => {
    setSplitType(newType);
    // Reset participant shares based on new type
    const updated = participants.map((p) => ({
      ...p,
      share: newType === "equal" ? 1 : 0,
      shareType: newType,
    }));
    setParticipants(updated);
  };
  const getTotalPercentage = () => {
    return participants.reduce((sum, p) => sum + (parseFloat(p.share) || 0), 0);
  };

  return (
    <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
      <div className="flex items-center mb-6 space-x-3">
        <div className="p-2 rounded-lg bg-emerald-100">
          <Plus className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Add New Expense</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Amount *
            </label>
            <div className="relative">
              <IndianRupee className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                className="w-full py-3 pl-10 pr-4 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="0.00"
                required
              />
            </div>
          </div>{" "}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Paid By *
            </label>
            <div className="relative">
              <input
                type="text"
                list="people-list"
                value={formData.paid_by}
                onChange={(e) =>
                  setFormData({ ...formData, paid_by: e.target.value })
                }
                className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Enter or select person's name"
                required
              />
              <datalist id="people-list">
                {peopleNames.map((name, index) => (
                  <option key={index} value={name} />
                ))}
              </datalist>
            </div>
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Description *
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            placeholder="What was this expense for?"
            required
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 transition-all duration-200 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) =>
                  setFormData({ ...formData, isRecurring: e.target.checked })
                }
                className="w-4 h-4 border-gray-300 rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Recurring
              </span>
            </label>

            {formData.isRecurring && (
              <select
                value={formData.recurringFrequency}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    recurringFrequency: e.target.value,
                  })
                }
                className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            )}
          </div>
        </div>

        {/* Split Settings */}
        <div className="pt-6 border-t">
          <div className="flex items-center mb-4 space-x-3">
            <Users className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-900">Split Between</h3>
          </div>

          {/* Split Type Selection */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Split Method
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => changeSplitType("equal")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  splitType === "equal"
                    ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Equal Split</span>
              </button>
              <button
                type="button"
                onClick={() => changeSplitType("percentage")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                  splitType === "percentage"
                    ? "bg-emerald-100 border-emerald-500 text-emerald-700"
                    : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Percent className="w-4 h-4" />
                <span>Percentage Split</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {" "}
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  list="participants-list"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Add person to split with"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addParticipant())
                  }
                />
                <datalist id="participants-list">
                  {peopleNames.map((name, index) => (
                    <option key={index} value={name} />
                  ))}
                </datalist>
              </div>
              <button
                type="button"
                onClick={addParticipant}
                className="px-4 py-2 text-white transition-colors rounded-lg bg-emerald-600 hover:bg-emerald-700"
              >
                Add
              </button>
            </div>
            {participants.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Split between {participants.length} people
                  </p>
                  {splitType === "percentage" && (
                    <div
                      className={`text-sm font-medium ${
                        Math.abs(getTotalPercentage() - 100) < 0.01
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      Total: {getTotalPercentage().toFixed(1)}%
                    </div>
                  )}
                </div>

                {participants.map((participant, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    {" "}
                    <div className="flex items-center space-x-3">
                      <span className="font-medium">{participant.name}</span>
                      {splitType === "equal" && (
                        <span className="text-sm text-gray-500">
                          (₹
                          {formData.amount
                            ? (
                                parseFloat(formData.amount) /
                                participants.length
                              ).toFixed(2)
                            : "0.00"}
                          )
                        </span>
                      )}
                      {splitType === "percentage" && formData.amount && (
                        <span className="text-sm text-gray-500">
                          (₹
                          {(
                            (parseFloat(formData.amount) *
                              (parseFloat(participant.share) || 0)) /
                            100
                          ).toFixed(2)}
                          )
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {splitType === "percentage" && (
                        <div className="flex items-center space-x-1">
                          <input
                            type="number"
                            value={participant.share}
                            onChange={(e) =>
                              updateParticipantShare(index, e.target.value)
                            }
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded"
                            placeholder="0"
                            min="0"
                            max="100"
                            step="0.1"
                          />
                          <Percent className="w-4 h-4 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => removeParticipant(index)}
                        className="text-red-600 transition-colors hover:text-red-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 font-medium text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 hover:scale-105"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
