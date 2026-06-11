"use client";

import { useState } from "react";
import { useOpenSettingsModal } from "@/context/Context.store";
import { X, Link2, AlertTriangle, Loader2 } from "lucide-react";

// Confirmation dialog
function ConfirmDialog({
  newHash,
  onConfirm,
  onCancel,
  loading,
}: {
  newHash: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-700 shadow-2xl p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-base font-semibold text-white">Update share link?</h3>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed">
          Are you sure you want to update your share link to{" "}
          <span className="font-mono text-white bg-neutral-800 px-1.5 py-0.5 rounded">
            {newHash}
          </span>
          ? Doing so will <span className="text-amber-400 font-medium">invalidate all old links</span> you&apos;ve
          shared with others.
        </p>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-neutral-800 text-sm text-neutral-300 hover:bg-neutral-700 transition disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2 rounded-lg bg-amber-500 text-sm font-medium text-black hover:bg-amber-400 transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating…
              </>
            ) : (
              "Yes, update"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

//  Main Settings modal 
export default function Settings() {
  const [accent, setAccent] = useState("Blue");
  const [capture, setCapture] = useState("Inbox");
  const [appLock, setAppLock] = useState(false);

  // Share-link hash state
  const [hashInput, setHashInput] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [hashLoading, setHashLoading] = useState(false);
  const [hashError, setHashError] = useState<string | null>(null);
  const [hashSuccess, setHashSuccess] = useState<string | null>(null);

  const isOpen = useOpenSettingsModal((s) => s.isOpen);
  const closeModal = useOpenSettingsModal((s) => s.closeModal);

  // Validate locally before opening the confirm dialog
  const handleHashSubmit = () => {
    setHashError(null);
    setHashSuccess(null);
    const trimmed = hashInput.trim().toLowerCase();
    if (!trimmed) {
      setHashError("Please enter a custom link slug.");
      return;
    }
    if (!/^[a-z0-9_-]{3,32}$/.test(trimmed)) {
      setHashError("3–32 chars: lowercase letters, digits, - or _ only.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setHashLoading(true);
    setHashError(null);
    setHashSuccess(null);
    try {
      const res = await fetch("/api/v1/hash/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newHash: hashInput.trim().toLowerCase() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHashError(data.message ?? "Something went wrong.");
      } else {
        setHashSuccess(
          `Link updated! ${data.updatesRemaining} update${data.updatesRemaining !== 1 ? "s" : ""} remaining.`
        );
        setHashInput("");
      }
    } catch {
      setHashError("Network error. Please try again.");
    } finally {
      setHashLoading(false);
      setShowConfirm(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/*Confirm dialog (rendered above Settings) */}
      {showConfirm && (
        <ConfirmDialog
          newHash={hashInput.trim().toLowerCase()}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          loading={hashLoading}
        />
      )}

      {/* Settings modal */}
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
          <div className="flex justify-between items-center py-3 border-b border-neutral-800">
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

          {/* Share link / custom hash */}
          <div className="pt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-neutral-300">
              <Link2 className="w-4 h-4" />
              Custom share link
            </div>
            <p className="text-xs text-neutral-500">
              Personalise your public vault URL. You can change this up to 5 times.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={hashInput}
                onChange={(e) => {
                  setHashInput(e.target.value);
                  setHashError(null);
                  setHashSuccess(null);
                }}
                placeholder="e.g. john-brain"
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 transition"
              />
              <button
                onClick={handleHashSubmit}
                className="px-4 py-2 rounded-lg bg-neutral-700 hover:bg-neutral-600 text-sm font-medium transition"
              >
                Save
              </button>
            </div>

            {hashError && (
              <p className="text-xs text-red-400">{hashError}</p>
            )}
            {hashSuccess && (
              <p className="text-xs text-emerald-400">{hashSuccess}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
