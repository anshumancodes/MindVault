"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useUserModal } from "@/context/Content.store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Settings, LogOut, HelpCircle, Star, Sliders } from "lucide-react";

export default function UserModal() {
  const isOpen = useUserModal((s) => s.isOpen);
  const closeModal = useUserModal((s) => s.closeModal);

  const modalRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={modalRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-16 left-4 w-72 rounded-xl border border-gray-700 bg-[#1c1c1c] text-gray-300 shadow-xl p-2 z-50"
    >
      {/* Header */}
      <div className="px-3 py-2 text-sm font-medium border-b border-gray-700">
        anshumanprof01@gmail.com
      </div>

      {/* Actions */}
      <div className="flex flex-col py-1">
        <Button variant="ghost" className="justify-start gap-2 w-full">
          <Star className="w-4 h-4" /> Upgrade plan
        </Button>
       
        <Button variant="ghost" className="justify-start gap-2 w-full">
          <Settings className="w-4 h-4" /> Settings
        </Button>
      </div>

      <Separator className="my-2" />

      {/* Secondary actions */}
      <div className="flex flex-col py-1">
        <Button variant="ghost" className="justify-start gap-2 w-full">
          <HelpCircle className="w-4 h-4" /> Help
        </Button>
        <Button
          variant="ghost"
          className="justify-start gap-2 w-full text-red-500"
        >
          <LogOut className="w-4 h-4" /> Log out
        </Button>
      </div>
    </motion.div>
  );
}
