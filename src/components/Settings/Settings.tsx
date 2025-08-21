"use client";

import { useState } from "react";
import { useOpenSettingsModal } from "@/context/Content.store";
import { X } from "lucide-react";

export default function Settings() {
  const [accent, setAccent] = useState("Blue");
  const [capture, setCapture] = useState("Inbox");
  const [appLock, setAppLock] = useState(false);

  const isOpen = useOpenSettingsModal((s) => s.isOpen);
  const closeModal = useOpenSettingsModal((s) => s.closeModal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900 text-white shadow-xl border border-neutral-800 p-6">
        {/* Header */}
        <div className="flex flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button
            onClick={closeModal}
            className="p-1 rounded-md hover:bg-neutral-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Theme */}
        <div className="flex justify-between items-center py-3 border-b border-neutral-800">
          <span>Theme</span>
          <select className="bg-neutral-800 rounded-md px-2 py-1 text-sm">
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        {/* Accent Color */}
        <div className="flex justify-between items-center py-3 border-b border-neutral-800">
          <span>Accent color</span>
          <select
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className="bg-neutral-800 rounded-md px-2 py-1 text-sm"
          >
            <option>Blue</option>
            <option>Green</option>
            <option>Purple</option>
          </select>
        </div>

        {/* Language */}
        <div className="flex justify-between items-center py-3 border-b border-neutral-800">
          <span>Language</span>
          <select className="bg-neutral-800 rounded-md px-2 py-1 text-sm">
            <option>Auto-detect</option>
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Default Capture Location */}
        <div className="flex justify-between items-center py-3 border-b border-neutral-800">
          <span>Default capture location</span>
          <select
            value={capture}
            onChange={(e) => setCapture(e.target.value)}
            className="bg-neutral-800 rounded-md px-2 py-1 text-sm"
          >
            <option>Inbox</option>
            <option>Daily Notes</option>
          </select>
        </div>

        {/* App Lock */}
        <div className="flex justify-between items-center py-3">
          <span>App lock</span>
          <button
            onClick={() => setAppLock(!appLock)}
            className={`w-10 h-6 rounded-full transition relative ${
              appLock ? "bg-blue-500" : "bg-neutral-600"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition ${
                appLock ? "translate-x-4" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
