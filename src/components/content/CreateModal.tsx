"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContentModal } from "@/context/Context.store";
import { motion } from "framer-motion";

export default function CreateModal() {
  const isOpen = useCreateContentModal((s) => s.isOpen);
  const closeModal = useCreateContentModal((s) => s.closeModal);

  const [formData, setFormData] = useState({
    link: "",
    type: "",
    title: "",
    tags: "",
    docContent: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const tagsArray = formData.tags.split(",").map((tag) => tag.trim());

      const payload = {
        link: formData.link,
        type: formData.type,
        title: formData.title,
        tags: tagsArray,
        description: formData.docContent,
      };

      const response = await fetch("/api/v1/content/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        console.error("Error creating content:", result.message);
        return;
      }

      console.log("Content created successfully:", result);
      closeModal();

      setFormData({
        link: "",
        type: "",
        title: "",
        tags: "",
        docContent: "",
      });
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg rounded-2xl shadow-xl border border-zinc-700 bg-zinc-900 text-gray-200 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-100">
              Add New Content
            </DialogTitle>
            <p className="text-sm text-gray-400">
              Fill in the details to save content to your vault.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Link */}
            <div className="space-y-1">
              <Label htmlFor="link" className="text-gray-300">
                Link
              </Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => handleChange("link", e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <Label htmlFor="title" className="text-gray-300">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Content title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <Label className="text-gray-300">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
                required
              >
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700 text-gray-200">
                  <SelectItem value="docs">Docs</SelectItem>
                  <SelectItem value="tweets">Tweets</SelectItem>
                  <SelectItem value="videos">Videos</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.type === "docs" && (
              <div className="space-y-1">
                <Label htmlFor="docContent" className="text-gray-300">
                  Document Content
                </Label>
                <textarea
                  id="docContent"
                  placeholder="Write or paste your document..."
                  maxLength={250}
                  value={formData.docContent}
                  onChange={(e) => handleChange("docContent", e.target.value)}
                  className="w-full min-h-[120px] rounded-md border border-zinc-700 bg-zinc-800 
                    p-3 text-sm text-gray-200 placeholder:text-gray-500
                    focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
                />
              </div>
            )}

            {/* Tags */}
            <div className="space-y-1">
              <Label htmlFor="tags" className="text-gray-300">
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="tag1, tag2, tag3"
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-gray-200 placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl border-zinc-700 text-gray-300 bg-zinc-800"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-md"
              >
                Save
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
