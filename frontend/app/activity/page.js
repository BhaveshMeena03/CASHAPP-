"use client";

import { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import api from "@/lib/api";
import {
  ArrowLeft,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Check,
  X,
  Building2,
} from "lucide-react";

import { STOCKS, CRYPTOS } from "@/lib/assets";

function StockLogo({ assetInfo, symbol, size = "w-12 h-12", textClass = "" }) {
  const [error, setError] = useState(false);
  const symbolStr = symbol.split("/")[0];

  return (
    <div
      className={`${size} rounded-full flex items-center justify-center text-xl overflow-hidden shadow-sm bg-white dark:bg-black border border-gray-100 dark:border-zinc-800`}
    >
      {assetInfo?.logo && !error ? (
        <img
          src={assetInfo.logo}
          alt={symbolStr}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <span className={textClass}>
          {assetInfo?.icon || symbolStr.charAt(0)}
        </span>
      )}
    </div>
  );
}

export default function ActivityPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [activity, setActivity] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filter, setFilter] = useState("all"); // all | sent | received | requests

  // Read filter from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilter = params.get("filter");
    if (
      urlFilter &&
      ["all", "sent", "received", "requests", "investing", "bitcoin"].includes(
        urlFilter,
      )
    ) {
      setFilter(urlFilter);
    }
  }, []);

  // Pull-to-refresh
  const [pullDistance, setPullDistance] = useState(0);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  useEffect(() => {
    if (user) fetchActivity();
  }, [user, filter]);

  const fetchActivity = async () => {
    setIsRefreshing(true);
    try {
      const filterParam = filter !== "all" ? `&type=${filter}` : "";
      const [transRes, fundingRes, tradeRes] = await Promise.all([
        filter !== "investing"
          ? api.get(`/transfer/history?limit=50${filterParam}`)
          : Promise.resolve({ data: { data: { transactions: [] } } }),
        filter === "all" || filter === "funding"
          ? api.get("/funding/history?limit=20")
          : Promise.resolve({ data: { data: { movements: [] } } }),
        filter === "all" || filter === "investing"
          ? api.get("/trading/orders?limit=30")
          : Promise.resolve({ data: { data: [] } }),
      ]);

      const transfers = (transRes.data.data?.transactions || []).map((t) => {
        const isSender = t.sender_id === user.id;
        let displayType, otherParty, otherCashtag;

        if (t.type === "request") {
          const isRequester = t.receiver_id === user.id;
          displayType = isRequester ? "Requested from" : "Request from";
          otherParty = isRequester ? t.sender_name : t.receiver_name;
          otherCashtag = isRequester ? t.sender_cashtag : t.receiver_cashtag;
        } else if (t.type === "bitcoin_send") {
          displayType = isSender ? "Sent Bitcoin to" : "Received Bitcoin from";
          otherParty = isSender ? t.receiver_name : t.sender_name;
          otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
        } else {
          displayType = isSender ? "Sent to" : "Received from";
          otherParty = isSender ? t.receiver_name : t.sender_name;
          otherCashtag = isSender ? t.receiver_cashtag : t.sender_cashtag;
        }

        return {
          ...t,
          displayType,
          otherParty: otherParty || otherCashtag || "Unknown",
          otherCashtag,
          isCashIn: false,
        };
      });

      const funding = (fundingRes.data.data?.movements || []).map((f) => ({
        ...f,
        displayType:
          f.direction === "cash_in" ? "Added from Bank" : "Withdrawal",
        otherParty: f.nickname || f.brand || "Bank Account",
        isCashIn: true,
        type: f.direction === "cash_in" ? "receive" : "send",
      }));

      const trades = (tradeRes.data.data || []).map((o) => {
        const isCrypto = o.asset_class === "crypto" || o.symbol.includes("/");
        const qtyStr =
          Number(o.filled_qty) > 0
            ? Number(o.filled_qty).toLocaleString(undefined, {
              maximumFractionDigits: isCrypto ? 6 : 4,
            }) + " "
            : "";
        const symbolStr = isCrypto ? o.symbol.split("/")[0] : o.symbol;

        return {
          id: o.id,
          displayType: o.side === "buy" ? `Bought ${qtyStr}` : `Sold ${qtyStr}`,
          otherParty: symbolStr,
          isCashIn: o.side === "sell",
          type: "trade",
          amount:
            parseFloat(o.notional || o.filled_avg_price * o.filled_qty || 0) *
            100,
          created_at: o.filled_at || o.submitted_at,
          status:
            o.status === "accepted" || o.status === "new"
              ? "pending"
              : o.status,
          isTrade: true,
        };
      });

      const combined = [...transfers, ...funding, ...trades].sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at),
      );

      setActivity(combined);
    } catch (err) {
      console.error("Failed to fetch activity");
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleRespondToRequest = async (transactionId, action) => {
    try {
      await api.post(`/transfer/respond/${transactionId}`, { action });
      await fetchActivity();
    } catch (err) {
      alert(
        `Failed to ${action} request: ` +
        (err.response?.data?.message || err.message),
      );
    }
  };

  const onTouchStart = (e) => {
    if (window.scrollY === 0) {
      touchStartY.current = e.touches[0].clientY;
      isPulling.current = true;
    }
  };
  const onTouchMove = (e) => {
    if (!isPulling.current) return;
    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff > 0 && window.scrollY === 0)
      setPullDistance(Math.min(diff * 0.4, 80));
  };
  const onTouchEnd = () => {
    if (pullDistance > 50) fetchActivity();
    setPullDistance(0);
    isPulling.current = false;
  };

  if (loading || !user) return null;

  const filters = [
    { key: "all", label: "All" },
    { key: "investing", label: "Investing" },
    { key: "bitcoin", label: "Bitcoin" },
    { key: "sent", label: "Sent" },
    { key: "received", label: "Received" },
    { key: "requests", label: "Requests" },
  ];

  return (
    <div
      className="pb-24 pt-8 px-6 min-h-screen flex flex-col bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull indicator */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-200"
        style={{
          height:
            pullDistance > 0
              ? `${pullDistance}px`
              : isRefreshing
                ? "40px"
                : "0px",
        }}
      >
        <RefreshCw
          className={`w-5 h-5 text-cashapp ${isRefreshing ? "animate-spin" : ""}`}
        />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.push("/")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Activity</h1>
        </div>
        <button
          onClick={fetchActivity}
          className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
        >
          <RefreshCw
            className={`w-5 h-5 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`}
          />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === f.key
              ? "bg-cashapp text-white shadow-sm"
              : "bg-gray-100 dark:bg-zinc-900 text-gray-500 hover:bg-gray-200 dark:hover:bg-zinc-800"
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Activity List */}
      <div className="space-y-3 flex-1">
        {activity.length > 0 ? (
          activity.map((item) => {
            const isSender = item.sender_id === user.id;

            return (
              <div
                key={item.id}
                className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-[0.98]"
                onClick={() =>
                  !item.isCashIn && router.push(`/activity/${item.id}`)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {item.isTrade ? (
                      <StockLogo
                        assetInfo={
                          CRYPTOS.find(c => c.symbol.startsWith(item.otherParty)) || STOCKS.find(s => s.symbol === item.otherParty)
                        }
                        symbol={item.otherParty}
                        textClass={item.isCashIn ? "text-cashapp" : "text-red-500"}
                      />
                    ) : item.type === "bitcoin_send" ? (
                      <StockLogo
                        assetInfo={CRYPTOS.find(c => c.alpacaSymbol === "BTCUSD")}
                        symbol="BTC"
                        textClass="text-[#F7931A]"
                      />
                    ) : (
                      <div
                        className={`w-12 h-12 bg-white dark:bg-black rounded-full flex items-center justify-center font-bold shadow-sm border border-gray-100 dark:border-zinc-800 text-cashapp`}
                      >
                        {item.isCashIn
                          ? "🏦"
                          : item.type === "request"
                            ? "🔔"
                            : isSender
                              ? "↑"
                              : "↓"}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-sm">
                        {item.displayType}{" "}
                        <span className="text-cashapp">
                          {item.otherCashtag || item.otherParty}
                        </span>
                      </p>
                      {item.note && (
                        <p className="text-xs text-gray-500 mt-0.5 italic truncate">
                          "{item.note}"
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">
                        {new Date(item.created_at).toLocaleDateString(
                          undefined,
                          { weekday: "short", month: "short", day: "numeric" },
                        )}{" "}
                        • {item.status}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-bold text-lg ml-4 ${item.isCashIn || (!isSender && item.type === "send")
                      ? "text-cashapp"
                      : ""
                      }`}
                  >
                    {item.isCashIn || (!isSender && item.type === "send")
                      ? "+"
                      : "-"}
                    ${(item.amount / 100).toFixed(2)}
                  </p>
                </div>

                {/* Accept/Decline for pending requests */}
                {item.type === "request" &&
                  item.status === "pending" &&
                  item.sender_id === user.id && (
                    <div className="flex space-x-3 mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
                      <button
                        onClick={() =>
                          handleRespondToRequest(item.id, "accept")
                        }
                        className="flex-1 flex items-center justify-center space-x-2 bg-cashapp text-white font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm shadow-sm"
                      >
                        <Check className="w-4 h-4" />
                        <span>Pay ${(item.amount / 100).toFixed(2)}</span>
                      </button>
                      <button
                        onClick={() =>
                          handleRespondToRequest(item.id, "decline")
                        }
                        className="flex-1 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-zinc-800 font-bold py-3 rounded-xl hover:scale-[1.02] active:scale-95 transition-all text-sm"
                      >
                        <X className="w-4 h-4" />
                        <span>Decline</span>
                      </button>
                    </div>
                  )}
              </div>
            );
          })
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-gray-500">
            <Clock className="w-16 h-16 mb-4 opacity-20" />
            <p className="font-medium">No activity yet</p>
          </div>
        )}

        {/* Load More Option */}
        {activity.length > 0 && (
          <button
            onClick={() => setFilter("all")}
            className="w-full mt-6 py-4 flex items-center justify-center space-x-2 text-cashapp font-bold hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-2xl transition-all"
          >
            <span>View all activity</span>
          </button>
        )}
      </div>

      <Navbar />
    </div>
  );
}
