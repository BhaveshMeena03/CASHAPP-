"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { CreditCard, ArrowRight, Lock } from "lucide-react";

export default function CardsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading]);

  if (loading || !user) return null;

  return (
    <div className="pb-24 pt-8 px-6 min-h-screen bg-white dark:bg-black">
      <h1 className="text-2xl font-bold mb-6">Cash Card</h1>

      {/* Card Visual */}
      <div className="max-w-[300px] mx-auto bg-gradient-to-br from-zinc-900 to-zinc-700 rounded-3xl p-6 text-white mb-8 aspect-[1.6/1] flex flex-col justify-between shadow-2xl">
        <div className="flex items-center justify-between">
          <img
            src="/flowcash-logo.png"
            alt="FlowCash"
            className="w-10 h-10 rounded-lg"
          />
          <p className="text-xs opacity-60 font-bold tracking-widest">VISA</p>
        </div>
        <div>
          <p className="text-lg tracking-[0.3em] font-mono opacity-80">
            •••• •••• •••• 4242
          </p>
          <div className="flex justify-between items-end mt-3">
            <div>
              <p className="text-[10px] opacity-50 uppercase">Card Holder</p>
              <p className="text-sm font-bold">
                {user.fullName || user.full_name}
              </p>
            </div>
            <div>
              <p className="text-[10px] opacity-50 uppercase">Expires</p>
              <p className="text-sm font-bold">12/28</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="space-y-3">
        {[
          {
            title: "Card Details",
            desc: "View card number and CVV",
            icon: CreditCard,
          },
          {
            title: "Lock Card",
            desc: "Temporarily disable your card",
            icon: Lock,
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-2xl"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-cashapp/10 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-cashapp" />
              </div>
              <div>
                <p className="font-bold text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>

      <Navbar />
    </div>
  );
}
