"use client";

import { useState } from "react";

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <main className="flex flex-col gap-20 w-full min-h-screen justify-center items-center bg-zinc-950 px-6 py-16">
      {/* for letting users Toggle between pricing */}
      <section className="flex flex-col gap-6 items-center">
        <h1 className="text-5xl font-extrabold text-gray-100">Upgrade Your Plan</h1>
        <div className="flex gap-3 bg-zinc-800 px-4 py-3 rounded-full border border-zinc-700 text-lg">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              !isYearly
                ? "bg-indigo-500 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-6 py-2 rounded-full font-semibold transition ${
              isYearly
                ? "bg-indigo-500 text-white"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            Yearly
          </button>
        </div>
        <p className="text-gray-400 text-lg">
          {isYearly ? "💡 Save 30% with yearly billing!" : "Pay monthly, cancel anytime."}
        </p>
      </section>

      
      <section className="grid md:grid-cols-2 gap-12">
        {/* Free Plan */}
        <div className="w-[360px] bg-zinc-900 rounded-3xl border border-zinc-700 p-8 flex flex-col gap-6 hover:border-zinc-600 hover:shadow-2xl transition">
          <div className="flex justify-between items-start">
            <p className="font-bold text-2xl text-gray-100">Free</p>
          </div>

          <div className="text-gray-400 text-base leading-relaxed flex flex-col gap-4">
            <p className="text-3xl font-extrabold text-gray-200">0$ / mo</p>
            <p className="text-gray-400 text-lg">For casual use</p>
            <button className="px-5 py-3 border border-zinc-600 rounded-full text-base text-gray-300">
              Your Current Plan
            </button>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-400">
              <li>Up to 1GB storage</li>
              <li>Limited file uploads</li>
              <li>Limited memory & context</li>
              <li>Basic search</li>
              <li>Email support</li>
            </ul>
          </div>
        </div>

        {/* Pro Plan */}
        <div className="w-[360px] bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl border border-indigo-500 p-8 flex flex-col gap-6 shadow-2xl hover:scale-105 transition">
          <div className="flex justify-between items-start">
            <p className="font-bold text-2xl text-white">Pro</p>
            <span className="text-sm bg-white/30 text-white px-3 py-1 rounded-full font-medium">
              ⭐ Most Popular
            </span>
          </div>

          <div className="text-white text-base leading-relaxed flex flex-col gap-4">
            <p className="text-3xl font-extrabold">
              {isYearly ? "7$ / mo" : "10$ / mo"}
            </p>
            <p className="opacity-90 text-lg">For power users & creators</p>
            <button className="px-6 py-3 bg-white text-indigo-700 rounded-full font-semibold text-base hover:bg-gray-100 transition">
              Upgrade to Pro
            </button>
            <ul className="list-disc list-inside space-y-2 text-sm opacity-90">
              <li>Up to 20GB storage</li>
              <li>Unlimited file uploads</li>
              <li>Fast & advanced image generation</li>
              <li>Extended memory & context</li>
              <li>Advanced search + filters</li>
              <li>Priority support</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
