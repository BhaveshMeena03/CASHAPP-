"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ThemeToggle from "@/components/ThemeToggle";
import Modal from "@/components/Modal";
import PinModal from "@/components/PinModal";
import { useToast } from "@/components/Toast";
import api from "@/lib/api";
import {
  User,
  Bell,
  QrCode,
  LogOut,
  Copy,
  CreditCard,
  ShieldCheck,
  Link2,
  Maximize,
  RefreshCw,
  Check,
  X,
  Search,
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import QrScanner from "react-qr-scanner";
import StockLogo from "@/components/StockLogo"; // Using the extracted component
import { STOCKS, CRYPTOS } from "@/lib/assets"; // Using the extracted constants

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const [balance, setBalance] = useState(0);
  const [activity, setActivity] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const toast = useToast();

  // Modals state
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [camError, setCamError] = useState(false);
  const [isAddCashOpen, setIsAddCashOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [isCashOutOpen, setIsCashOutOpen] = useState(false);
  const [cashOutAmount, setCashOutAmount] = useState("");
  const [cashOutSpeed, setCashOutSpeed] = useState("standard");
  const [isCashingOut, setIsCashingOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isPinOpen, setIsPinOpen] = useState(false);
  const pendingAction = useRef(null);
  const touchStartY = useRef(0);
  const isPulling = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [balRes, transRes, methodsRes, notifRes, fundingRes, tradeRes] =
        await Promise.all([
          api.get("/wallet/balance"),
          api.get("/transfer/history?limit=10"),
          api.get("/funding/methods"),
          api.get("/notifications?limit=10"),
          api.get("/funding/history?limit=10"),
          api.get("/trading/orders?limit=10"),
        ]);

      setBalance(balRes.data.data?.balance || 0);

      // Unify activities: Transfer Transactions + Fund Movements
      const transfers = (transRes.data.data?.transactions || []).map((t) => {
        const isSender = t.sender_id === user.id;
        let displayType, otherParty, otherCashtag;
        let isRequest = false;

        if (t.type === "request") {
          isRequest = true;
          // For requests: receiver = the requester, sender = person being asked
          const isRequester = t.receiver_id === user.id; // Is the current user the one who made the request?
          if (isRequester) {
            displayType = "Requested from"; // User requested from sender
            otherParty = t.sender_name;
            otherCashtag = t.sender_cashtag;
          } else {
            displayType = "Request from"; // User received a request from receiver
            otherParty = t.receiver_name;
            otherCashtag = t.receiver_cashtag;
          }
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
          isRequest: isRequest,
          isIncomingRequest:
            isRequest && t.receiver_id === user.id && t.status === "pending",
        };
      });

      const funding = (fundingRes.data.data?.movements || []).map((f) => ({
        ...f,
        displayType:
          f.direction === "cash_in" ? "Added from Bank" : "Withdrawal",
        otherParty: f.nickname || f.brand || "Bank Account",
        isCashIn: true,
        type: f.direction === "cash_in" ? "receive" : "send", // for color coding
      }));

      const trades = (tradeRes.data.data || []).map((o) => {
        const isCrypto = o.asset_class === "crypto" || o.symbol.includes("/");
        const symbolStr = isCrypto ? o.symbol.split("/")[0] : o.symbol;

        return {
          id: o.id,
          displayType: o.side === "buy" ? "Bought" : "Sold",
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

      const combined = [...transfers, ...funding, ...trades]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 10);

      setActivity(combined);
      setPaymentMethods(methodsRes.data.data?.paymentMethods || []);
      setNotifications(notifRes.data.data?.notifications || []);
      setUnreadCount(notifRes.data.data?.unreadCount || 0);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  const handlePullRefresh = async () => {
    setIsRefreshing(true);
    await fetchData();
    setTimeout(() => setIsRefreshing(false), 600);
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
    if (diff > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(diff * 0.4, 80));
    }
  };

  const onTouchEnd = () => {
    if (pullDistance > 50) {
      handlePullRefresh();
    }
    setPullDistance(0);
    isPulling.current = false;
  };

  // PIN gate helper: store an action, show PIN modal, execute on success
  const requirePin = (action) => {
    pendingAction.current = action;
    setIsPinOpen(true);
  };

  const onPinSuccess = () => {
    setIsPinOpen(false);
    if (pendingAction.current) {
      pendingAction.current();
      pendingAction.current = null;
    }
  };

  const handleRespondToRequest = async (transactionId, action) => {
    try {
      await api.post(`/transfer/respond/${transactionId}`, { action });
      await fetchData();
    } catch (err) {
      toast.error(
        `Failed to ${action} request: ` +
        (err.response?.data?.message || err.message),
      );
    }
  };

  const ensurePaymentMethod = async () => {
    if (paymentMethods && paymentMethods.length > 0)
      return paymentMethods[0].id;

    // Auto-link a test card if none exist
    try {
      const res = await api.post("/funding/methods", {
        stripe_payment_method_id: "pm_card_visa",
        nickname: "Test Visa",
      });
      return res.data.data?.paymentMethod?.id;
    } catch (err) {
      throw new Error(
        "Could not link test card: " +
        (err.response?.data?.message || err.message),
      );
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      fetchData();
    } catch (err) {
      console.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      fetchData();
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  const handleAddCashDirect = async () => {
    if (!addAmount || isNaN(addAmount)) return;
    setIsAdding(true);
    try {
      const pmId = await ensurePaymentMethod();

      await api.post("/funding/cash-in", {
        payment_method_db_id: pmId,
        amount: Math.round(parseFloat(addAmount) * 100),
      });
      await fetchData();
      setIsAddCashOpen(false);
      setAddAmount("");
    } catch (err) {
      toast.error(
        "Failed to add cash: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddCash = () => requirePin(handleAddCashDirect);

  const handleCashOutDirect = async () => {
    if (!cashOutAmount || isNaN(cashOutAmount)) return;
    setIsCashingOut(true);
    try {
      const amountCents = Math.round(parseFloat(cashOutAmount) * 100);
      await api.post("/funding/cash-out", {
        amount: amountCents,
        speed: cashOutSpeed,
      });
      await fetchData();
      setIsCashOutOpen(false);
      setCashOutAmount("");
    } catch (err) {
      toast.error(
        "Withdrawal failed: " + (err.response?.data?.message || err.message),
      );
    } finally {
      setIsCashingOut(false);
    }
  };

  const handleCashOut = () => requirePin(handleCashOutDirect);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-cashapp border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen bg-white dark:bg-black"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Pull-to-refresh indicator */}
      <div
        className="flex justify-center items-center overflow-hidden transition-all duration-200"
        style={{
          height:
            pullDistance > 0
              ? `${pullDistance}px`
              : isRefreshing
                ? "50px"
                : "0px",
        }}
      >
        <RefreshCw
          className={`w-6 h-6 text-cashapp ${isRefreshing ? "animate-spin" : ""}`}
          style={{ transform: `rotate(${pullDistance * 3}deg)` }}
        />
      </div>

      {/* ──── Sticky Header ──── */}
      <div className="sticky top-0 z-40 bg-white/80 dark:bg-black/80 backdrop-blur-md px-6 pt-4 pb-3 border-b border-gray-100/50 dark:border-zinc-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="w-9 h-9 bg-cashapp/10 rounded-full flex items-center justify-center border-2 border-transparent hover:border-cashapp transition-all active:scale-95"
            >
              <span className="text-cashapp font-bold text-sm">
                {(user.fullName || user.full_name || "?")
                  .charAt(0)
                  .toUpperCase()}
              </span>
            </button>
          </div>
          <h1 className="text-lg font-bold">Money</h1>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="p-2 relative hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            >
              <Bell className="w-5 h-5 text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-black">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* ──── Scrollable Content ──── */}
      <div className="flex-1 overflow-y-auto px-6 pb-28 pt-6 space-y-6">
        {/* Balance Card */}
        <div className="bg-gray-50 dark:bg-zinc-900 rounded-3xl p-6">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-gray-500 font-medium">Cash Balance</p>
            <button
              onClick={() => setIsQrOpen(true)}
              className="text-xs text-cashapp font-bold hover:underline"
            >
              Account & Routing
            </button>
          </div>
          <h2 className="text-4xl font-bold tracking-tight mb-6">
            $
            {(balance / 100).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
          </h2>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => setIsAddCashOpen(true)}
              className="flex-1 bg-white dark:bg-black font-bold py-3.5 rounded-xl text-sm border border-gray-200 dark:border-zinc-700 hover:border-cashapp hover:text-cashapp transition-all active:scale-95 shadow-sm"
            >
              Add Cash
            </button>
            <button
              onClick={() => setIsCashOutOpen(true)}
              className="flex-1 bg-white dark:bg-black font-bold py-3.5 rounded-xl text-sm border border-gray-200 dark:border-zinc-700 hover:border-cashapp hover:text-cashapp transition-all active:scale-95 shadow-sm"
            >
              Withdrawal
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => router.push("/crypto")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <span className="text-xl">₿</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Buy Crypto</p>
              <p className="text-[10px] text-gray-400 font-bold">Buy & Sell</p>
            </div>
          </button>
          <button
            onClick={() => router.push("/stocks")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-blue-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">📈</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Invest in stocks</p>
              <p className="text-[10px] text-gray-400 font-bold">Buy & Sell</p>
            </div>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group">
            <div className="w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">📋</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Free tax filing</p>
              <p className="text-[10px] text-gray-400 font-bold">Coming soon</p>
            </div>
          </button>
          <button
            onClick={() => router.push("/banking")}
            className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <div className="w-10 h-10 bg-amber-400/10 rounded-xl flex items-center justify-center">
              <span className="text-lg">💰</span>
            </div>
            <div className="text-left">
              <p className="font-bold text-sm">Banking and Saving</p>
              <p className="text-[10px] text-gray-400 font-bold">Coming soon</p>
            </div>
          </button>
        </div>

        {/* Savings Goal Banner */}
        <div className="bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/10 dark:to-amber-800/10 rounded-2xl p-5 border border-amber-200/30 dark:border-amber-700/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">💰 Savings</p>
              <p className="text-2xl font-bold mt-1">$0.00</p>
              <p className="text-xs text-gray-500 mt-1">Save for a goal</p>
            </div>
            <button className="px-4 py-2 bg-white dark:bg-black rounded-full text-sm font-bold border border-amber-200 dark:border-amber-700 hover:border-amber-400 transition-all text-amber-600">
              Start
            </button>
          </div>
        </div>

        {/* Scan / QR / Search Quick Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => router.push("/search")}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <Search className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">Search</span>
          </button>
          <button
            onClick={() => setIsScanOpen(true)}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <Maximize className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">Scan to Pay</span>
          </button>
          <button
            onClick={() => setIsQrOpen(true)}
            className="flex-1 flex flex-col items-center justify-center space-y-2 py-4 px-2 bg-gray-50 dark:bg-zinc-900 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all active:scale-95"
          >
            <QrCode className="w-6 h-6 text-gray-500" />
            <span className="font-bold text-xs text-center">My QR</span>
          </button>
        </div>
      </div>

      {/* ──── Modals (unchanged) ──── */}
      <Modal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        title="My Profile"
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-20 h-20 bg-cashapp/10 rounded-full flex items-center justify-center mb-4">
            <span className="text-cashapp text-2xl font-bold">
              {(user.fullName || user.full_name || "?").charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-2xl font-bold">
            {user.fullName || user.full_name}
          </h3>
          <p className="text-cashapp font-bold text-lg mb-8">{user.cashtag}</p>

          <div className="w-full space-y-2">
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/profile");
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">Edit Profile</span>
              </div>
            </button>
            <button
              onClick={() => {
                setIsProfileOpen(false);
                router.push("/settings");
              }}
              className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-800/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-700/50 transition-all"
            >
              <div className="flex items-center space-x-3">
                <ShieldCheck className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-sm">Settings</span>
              </div>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-2xl text-red-500"
            >
              <div className="flex items-center space-x-3">
                <LogOut className="w-5 h-5" />
                <span className="font-bold text-sm">Sign Out</span>
              </div>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title="My Cashtag"
      >
        <div className="flex flex-col items-center py-8">
          <div className="p-8 bg-white rounded-3xl mb-8 shadow-inner border-2 border-gray-100 flex items-center justify-center">
            <QRCodeSVG
              value={`${window.location.origin}/pay?cashtag=${user.cashtag}`}
              size={200}
              bgColor={"#ffffff"}
              fgColor={"#000000"}
              level={"Q"}
              includeMargin={false}
              imageSettings={{
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/2048px-Square_Cash_app_logo.svg.png",
                x: undefined,
                y: undefined,
                height: 40,
                width: 40,
                excavate: true,
              }}
            />
          </div>
          <h3 className="text-2xl font-bold mb-2">{user.cashtag}</h3>
          <p className="text-gray-500 text-sm mb-8">
            Scan to pay anyone on FlowCash
          </p>

          <div className="flex space-x-2">
            <button
              onClick={() => {
                navigator.clipboard.writeText(user.cashtag);
                toast.success("Cashtag copied!");
              }}
              className="flex items-center space-x-2 bg-gray-50 dark:bg-zinc-800 px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-100 dark:hover:bg-zinc-700 transition-all border border-gray-100 dark:border-zinc-800"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Cashtag</span>
            </button>
            <button
              onClick={() => {
                const link = `${window.location.origin}/pay?cashtag=${user.cashtag}`;
                navigator.clipboard.writeText(link);
                toast.success("Payment link copied!");
              }}
              className="flex items-center space-x-2 bg-cashapp text-white px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-cashapp/20"
            >
              <Link2 className="w-4 h-4" />
              <span>Pay Link</span>
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isScanOpen}
        onClose={() => {
          setIsScanOpen(false);
          setCamError(false);
        }}
        title="Scan to Pay"
      >
        <div className="flex flex-col items-center py-8">
          <div className="w-64 h-64 border-4 border-cashapp rounded-3xl relative overflow-hidden bg-black mb-8 flex items-center justify-center">
            {camError ? (
              <div className="text-center p-4">
                <QrCode className="w-12 h-12 text-zinc-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-white">Camera Access Needed</p>
                <p className="text-xs text-zinc-400 mt-1">Please allow camera permissions in your browser to scan QR codes.</p>
              </div>
            ) : (
              <>
                <QrScanner
                  delay={300}
                  onScan={(data) => {
                    if (data && data.text) {
                      const url = new URL(data.text);
                      const scannedCashtag = url.searchParams.get("cashtag");
                      if (scannedCashtag) {
                        setIsScanOpen(false);
                        router.push(`/pay?cashtag=${scannedCashtag}`);
                      }
                    }
                  }}
                  onError={(err) => {
                    if (err?.name === "NotAllowedError" || err?.message?.includes("Permission")) {
                      setCamError(true);
                    } else {
                      console.error(err);
                    }
                  }}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  constraints={{ video: { facingMode: "environment" } }}
                />
                <div className="w-full h-1 bg-cashapp absolute top-0 animate-[scan_2s_linear_infinite]" />
                <p className="absolute bottom-4 text-[10px] text-zinc-500 font-bold uppercase tracking-widest bg-black/50 px-2 py-1 rounded">
                  Point camera at QR
                </p>
              </>
            )}
          </div>
          <p className="text-gray-500 text-center mb-8 text-sm px-8">
            Align a FlowCash QR code within the frame to automatically pay or
            request.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        title="Notifications"
      >
        <div className="py-4 space-y-3 max-h-[60vh] overflow-y-auto pr-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-cashapp font-bold mb-2 ml-auto block"
            >
              Mark all as read
            </button>
          )}
          {notifications.length > 0 ? (
            notifications.map((n) => {
              const isRequest =
                n.type === "payment_request" ||
                (n.message && n.message.includes("requested"));
              return (
                <div
                  key={n.id}
                  onClick={() => {
                    if (!n.is_read) handleMarkAsRead(n.id);
                    if (isRequest) {
                      setIsNotificationsOpen(false);
                      router.push("/activity?filter=requests");
                    }
                  }}
                  className={`p-4 rounded-2xl flex items-start space-x-4 transition-all cursor-pointer ${n.is_read
                    ? "bg-transparent border border-gray-100 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-900"
                    : "bg-cashapp/5 border border-cashapp/10 shadow-sm"
                    }`}
                >
                  <div
                    className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.is_read ? "bg-transparent" : "bg-cashapp animate-pulse"}`}
                  />
                  <div className="flex-1">
                    <p
                      className={`text-sm ${n.is_read ? "text-gray-500" : "font-bold"}`}
                    >
                      {n.message}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                        {new Date(n.created_at).toLocaleString()}
                      </p>
                      {isRequest && (
                        <span className="text-[10px] text-cashapp font-bold uppercase tracking-wider">
                          Tap to respond →
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center py-12 text-gray-500">
              <Bell className="w-12 h-12 mb-4 opacity-10" />
              <p className="text-sm">You're all caught up!</p>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isAddCashOpen}
        onClose={() => setIsAddCashOpen(false)}
        title="Add Cash"
      >
        <div className="py-4 space-y-6">
          <div className="flex items-center space-x-4 bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
            <span className="text-3xl font-bold text-cashapp">$</span>
            <input
              type="number"
              autoFocus
              placeholder="0.00"
              className="bg-transparent text-3xl font-bold outline-none w-full"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
            />
          </div>

          <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-2xl flex items-center space-x-4 border border-transparent hover:border-cashapp transition-all cursor-pointer">
            <div className="w-12 h-10 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center overflow-hidden">
              <span className="text-[10px] text-zinc-400 font-bold tracking-tighter">
                VISA
              </span>
            </div>
            <div>
              <p className="font-bold text-sm">Visa •••• 4242</p>
              <p className="text-xs text-gray-500">Connected</p>
            </div>
          </div>

          <button
            disabled={!addAmount || isAdding}
            onClick={handleAddCash}
            className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center space-x-2 disabled:opacity-50 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isAdding
              ? "Processing..."
              : `Add $${parseFloat(addAmount || 0).toFixed(2)}`}
          </button>
        </div>
      </Modal>

      {/* Cash Out Modal */}
      <Modal
        isOpen={isCashOutOpen}
        onClose={() => setIsCashOutOpen(false)}
        title="Withdrawal"
      >
        <div className="py-4 space-y-6">
          <div className="flex items-center space-x-4 bg-gray-50 dark:bg-zinc-800 p-4 rounded-2xl">
            <span className="text-3xl font-bold text-cashapp">$</span>
            <input
              type="number"
              autoFocus
              placeholder="0.00"
              className="bg-transparent text-3xl font-bold outline-none w-full"
              value={cashOutAmount}
              onChange={(e) => setCashOutAmount(e.target.value)}
            />
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500 mb-3 font-bold uppercase tracking-widest">
              Transfer Speed
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setCashOutSpeed("standard")}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all border ${cashOutSpeed === "standard"
                  ? "bg-cashapp text-white border-cashapp shadow-lg shadow-cashapp/20"
                  : "bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800"
                  }`}
              >
                Standard
                <p className="text-[10px] opacity-70 mt-1">1-3 days • Free</p>
              </button>
              <button
                onClick={() => setCashOutSpeed("instant")}
                className={`flex-1 py-4 rounded-2xl font-bold text-sm transition-all border ${cashOutSpeed === "instant"
                  ? "bg-cashapp text-white border-cashapp shadow-lg shadow-cashapp/20"
                  : "bg-gray-50 dark:bg-zinc-900 border-gray-100 dark:border-zinc-800"
                  }`}
              >
                Instant
                <p className="text-[10px] opacity-70 mt-1">
                  Seconds • 1.5% fee
                </p>
              </button>
            </div>
          </div>

          {cashOutAmount &&
            !isNaN(cashOutAmount) &&
            parseFloat(cashOutAmount) > 0 && (
              <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-bold">
                    ${parseFloat(cashOutAmount).toFixed(2)}
                  </span>
                </div>
                {cashOutSpeed === "instant" && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fee (1.5%)</span>
                    <span className="font-bold text-amber-500">
                      -$
                      {Math.max(
                        0.25,
                        parseFloat(cashOutAmount) * 0.015,
                      ).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between border-t border-gray-100 dark:border-zinc-800 pt-2">
                  <span className="text-gray-500 font-bold">You receive</span>
                  <span className="font-bold text-cashapp">
                    $
                    {(
                      parseFloat(cashOutAmount) -
                      (cashOutSpeed === "instant"
                        ? Math.max(0.25, parseFloat(cashOutAmount) * 0.015)
                        : 0)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            )}

          <button
            disabled={
              !cashOutAmount || isCashingOut || parseFloat(cashOutAmount) <= 0
            }
            onClick={handleCashOut}
            className="w-full bg-cashapp text-white font-bold py-5 rounded-full flex items-center justify-center disabled:opacity-50 shadow-lg shadow-cashapp/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {isCashingOut
              ? "Processing..."
              : `Withdraw $${parseFloat(cashOutAmount || 0).toFixed(2)}`}
          </button>
        </div>
      </Modal>

      {/* Recent Activity */}
      <div className="mt-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Activity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={handlePullRefresh}
              className="p-1 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-full transition-all"
            >
              <RefreshCw
                className={`w-4 h-4 text-gray-400 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </button>
            <button
              onClick={() => router.push("/activity")}
              className="text-cashapp text-sm font-bold"
            >
              See All
            </button>
          </div>
        </div>
        <div className="space-y-3">
          {activity.length > 0 ? (
            activity.map((item) => (
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
                        className={`w-10 h-10 bg-white dark:bg-black rounded-full flex items-center justify-center font-bold shadow-sm border border-gray-100 dark:border-zinc-800 text-sm text-cashapp`}
                      >
                        {item.isCashIn
                          ? "🏦"
                          : item.type === "request"
                            ? "🔔"
                            : item.sender_id === user.id
                              ? "↑"
                              : "↓"}
                      </div>
                    )}
                    <div>
                      <p className="font-bold text-sm">
                        {item.displayType}{" "}
                        <span className="text-cashapp">
                          {item.otherCashtag || item.otherParty}
                        </span>
                      </p>
                      {item.note && (
                        <p className="text-xs text-gray-500 mt-0.5 italic">
                          "{item.note}"
                        </p>
                      )}
                      <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mt-1">
                        {new Date(item.created_at).toLocaleDateString()} •{" "}
                        {item.status}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`font-bold text-lg ${item.isCashIn || (item.receiver_id === user.id && item.type === "send") ? "text-cashapp" : ""}`}
                  >
                    {item.isCashIn ||
                      (item.receiver_id === user.id && item.type === "send")
                      ? "+"
                      : "-"}
                    ${(item.amount / 100).toFixed(2)}
                  </p>
                </div>
                {/* Accept/Decline for pending requests where the current user is the sender (person being asked to pay) */}
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
            ))
          ) : (
            <p className="text-center text-gray-500 py-8 italic">
              No recent activity
            </p>
          )}
        </div>
      </div>

      <PinModal
        isOpen={isPinOpen}
        onSuccess={onPinSuccess}
        onClose={() => {
          setIsPinOpen(false);
          pendingAction.current = null;
        }}
        userId={user.id}
      />

      <Navbar />
    </div>
  );
}
