import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Users,
} from "lucide-react";

const BalanceView = () => {
  const { balances, settlements, loading, markSettlementAsPaid } = useApp();
  const [processingSettlement, setProcessingSettlement] = useState(null);

  const handleMarkAsPaid = async (settlement, index) => {
    if (
      window.confirm(
        `Mark settlement as paid?\n${settlement.from} will pay ${
          settlement.to
        } ₹${settlement.amount.toFixed(2)}`
      )
    ) {
      setProcessingSettlement(index);
      try {
        await markSettlementAsPaid(settlement);
      } finally {
        setProcessingSettlement(null);
      }
    }
  };

  if (loading) {
    return (
      <div className="p-8 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center justify-center">
          <div className="w-8 h-8 border-b-2 rounded-full animate-spin border-emerald-600"></div>
          <span className="ml-3 text-gray-600">Calculating balances...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Individual Balances */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Individual Balances
          </h2>
        </div>

        {balances.length === 0 ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg text-gray-600">All settled up!</p>
            <p className="text-sm text-gray-500">No outstanding balances</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {balances.map((balance) => (
              <div
                key={balance.name}
                className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ₹{
                  balance.status === "owed"
                    ? "border-green-200 bg-green-50"
                    : balance.status === "owes"
                    ? "border-red-200 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ₹{
                        balance.status === "owed"
                          ? "bg-green-100"
                          : balance.status === "owes"
                          ? "bg-red-100"
                          : "bg-gray-100"
                      }`}
                    >
                      {balance.status === "owed" ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : balance.status === "owes" ? (
                        <TrendingDown className="w-5 h-5 text-red-600" />
                      ) : (
                        <CheckCircle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {balance.name}
                      </h3>
                      <p
                        className={`text-sm ₹{
                          balance.status === "owed"
                            ? "text-green-600"
                            : balance.status === "owes"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {balance.status === "owed"
                          ? "Is owed"
                          : balance.status === "owes"
                          ? "Owes"
                          : "Settled"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {" "}
                    <p
                      className={`text-lg font-bold ${
                        balance.status === "owed"
                          ? "text-green-600"
                          : balance.status === "owes"
                          ? "text-red-600"
                          : "text-gray-600"
                      }`}
                    >
                      ₹{Math.abs(balance.balance).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Settlement Suggestions */}
      <div className="p-6 border shadow-lg bg-white/70 backdrop-blur-sm rounded-xl border-white/30">
        <div className="flex items-center mb-6 space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <AlertCircle className="w-6 h-6 text-orange-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900">
            Settlement Suggestions
          </h2>
        </div>

        {settlements.length === 0 ? (
          <div className="py-8 text-center">
            <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg text-gray-600">No settlements needed!</p>
            <p className="text-sm text-gray-500">Everyone is all squared up</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <p className="font-medium text-blue-800">
                  Simplified settlements to minimize transactions
                </p>
              </div>
              <p className="mt-1 text-sm text-blue-700">
                {settlements.length} transaction
                {settlements.length !== 1 ? "s" : ""} needed to settle all debts
              </p>
            </div>

            {settlements.map((settlement, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 transition-all duration-200 bg-white border border-gray-200 rounded-lg hover:shadow-md"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-100 rounded-full">
                    <TrendingDown className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      <span className="text-red-600">{settlement.from}</span>
                      <span className="mx-2 text-gray-500">should pay</span>
                      <span className="text-green-600">{settlement.to}</span>
                    </p>
                    <p className="text-sm text-gray-600">
                      Settlement #{index + 1}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{settlement.amount.toFixed(2)}
                  </p>{" "}
                  <button
                    onClick={() => handleMarkAsPaid(settlement, index)}
                    disabled={processingSettlement === index || loading}
                    className={`text-sm font-medium transition-colors ₹{
                      processingSettlement === index 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-emerald-600 hover:text-emerald-800'
                    }`}
                  >
                    {processingSettlement === index
                      ? "Processing..."
                      : "Mark as paid"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BalanceView;
