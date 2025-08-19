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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateContentModal } from "@/context/Content.store";
import { motion } from "framer-motion";

export default function CreateModal() {
  const isOpen = useCreateContentModal((s) => s.isOpen);
  const closeModal = useCreateContentModal((s) => s.closeModal);

  const [formData, setFormData] = useState({
    link: "",
    type: "",
    title: "",
    tags: "",
    owner: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    closeModal(); // close after submit
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="sm:max-w-lg rounded-2xl shadow-xl border border-gray-200 bg-white/90 backdrop-blur-lg p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Add New Content
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Fill in the details to save content to your vault.
            </p>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-5 mt-4">
            {/* Link */}
            <div className="space-y-1">
              <Label htmlFor="link" className="text-gray-700">
                Link
              </Label>
              <Input
                id="link"
                placeholder="https://example.com"
                value={formData.link}
                onChange={(e) => handleChange("link", e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Title */}
            <div className="space-y-1">
              <Label htmlFor="title" className="text-gray-700">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Content title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                required
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Type */}
            <div className="space-y-1">
              <Label className="text-gray-700">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleChange("type", value)}
                required
              >
                <SelectTrigger className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <SelectValue
                    placeholder="Select type"
                    className="text-gray-700"
                  />
                </SelectTrigger>
                <SelectContent className="text-gray-700">
                  <SelectItem value="docs" className="">
                    <p className="text-gray-700">Docs</p>
                  </SelectItem>
                  <SelectItem value="tweets">
                    <p className="text-gray-700">Tweets</p>
                  </SelectItem>
                  <SelectItem value="videos">
                    <p className="text-gray-700">Videos</p>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              {formData.type === "docs" && (
                <div className="space-y-1">
                  <Label htmlFor="docContent" className="text-gray-700">
                    Document Content
                  </Label>
                  <textarea
                    id="docContent"
                    placeholder="Write or paste your document..."
                    maxLength={250}
                    className="w-full min-h-[120px] rounded-md border border-gray-300 
                 p-3 text-sm text-gray-700 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 placeholder:text-gray-400 resize-y"
                    onChange={(e) => handleChange("content", e.target.value)}
                  />
                </div>
              )}
            </div>
            {/* Tags */}
            <div className="space-y-1">
              <Label htmlFor="tags" className="text-gray-700">
                Tags
              </Label>
              <Input
                id="tags"
                placeholder="tag1, tag2, tag3"
                value={formData.tags}
                onChange={(e) => handleChange("tags", e.target.value)}
                className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
              />
            </div>

            {/* Footer */}
            <DialogFooter className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl text-gray-700 border-gray-300 hover:bg-gray-100"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md"
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
