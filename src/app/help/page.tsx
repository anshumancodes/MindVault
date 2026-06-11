"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, HelpCircle } from "lucide-react";
import Link from "next/link";

const TOC = [
  { id: "getting-started",   label: "1. Getting Started" },
  { id: "saving-to-vault",   label: "2. Saving to Your Vault" },
  { id: "ai-search",         label: "3. AI-Powered Search" },
  { id: "tags-organization", label: "4. Tags & Organization" },
  { id: "account-settings",  label: "5. Account & Settings" },
  { id: "contact-support",   label: "6. Contact Support" },
];

export default function HelpPage() {
  const [activeId, setActiveId] = useState<string>(TOC[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const headings = TOC.map(({ id }) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topmost.target.id);
        }
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((el) => observerRef.current!.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ── Top bar ─────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <HelpCircle className="h-4 w-4 text-blue-400" />
            Help
          </div>
          <div className="w-14" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">

          {/* ── Sticky TOC ─────────────────────────────────────────── */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-widest text-neutral-500">
                On this page
              </p>
              <nav className="flex flex-col gap-0.5">
                {TOC.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    className={`rounded-md px-3 py-1.5 text-left text-sm transition-all duration-150 ${
                      activeId === id
                        ? "bg-neutral-800 text-white font-medium"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* ── Main document ──────────────────────────────────────── */}
          <motion.main
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Doc header */}
            <div className="mb-10 border-b border-neutral-800 pb-10">
              <h1 className="mb-3 text-4xl font-semibold tracking-tight text-white">
                Help Center
              </h1>
              <p className="max-w-2xl leading-7 text-neutral-400">
                Everything you need to get the most out of MindVault — your
                AI-powered second brain for saving, organizing, and rediscovering
                what matters.
              </p>
            </div>

            <div className="space-y-14">

              {/* 1. Getting Started */}
              <section id="getting-started" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  1. Getting Started
                </h2>
                <p className="mb-5 leading-7 text-neutral-400 text-sm">
                  MindVault is ready to use the moment you sign in. Here&apos;s
                  how to get set up in under a minute:
                </p>
                <ol className="space-y-4 text-sm text-neutral-400">
                  {[
                    ["Create an account", "Sign up with your email and a password, or use Google OAuth for one-click access."],
                    ["Open your Vault", "After signing in you land directly in your Vault — the home for everything you save."],
                    ["Save your first link", "Paste any URL into the save bar at the top. MindVault auto-fetches the title and description for you."],
                    ["Search instantly", "Use the search bar to find anything you&apos;ve saved — by keyword or meaning."],
                  ].map(([step, desc], i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-800 border border-neutral-700 text-xs font-semibold text-neutral-300">
                        {i + 1}
                      </span>
                      <span>
                        <strong className="text-neutral-200">{step}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ol>
              </section>

              <hr className="border-neutral-800" />

              {/* 2. Saving to Your Vault */}
              <section id="saving-to-vault" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  2. Saving to Your Vault
                </h2>
                <p className="mb-5 leading-7 text-neutral-400 text-sm">
                  Your Vault holds every link, article, or resource you want to
                  remember. Here&apos;s what you can do when saving:
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    ["URL", "Paste any public link — article, video, tool, or resource."],
                    ["Title", "Auto-filled from the page. Edit it to something more memorable if you like."],
                    ["Description", "A short note about why you saved this. Powers the AI search."],
                    ["Tags", "Add comma-separated tags to group related items (e.g. design, research, tools)."],
                  ].map(([field, desc]) => (
                    <li key={field} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span>
                        <strong className="text-neutral-200">{field}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-neutral-800" />

              {/* 3. AI-Powered Search */}
              <section id="ai-search" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  3. AI-Powered Search
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  MindVault&apos;s search understands <em>meaning</em>, not just
                  keywords. When you type a query, it runs a semantic similarity
                  search across your saved content using AI vector embeddings.
                </p>
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      How it works
                    </h3>
                    <p className="leading-7 text-neutral-400 text-sm">
                      When you save an item, MindVault generates a numerical
                      vector embedding from its title and description. When you
                      search, your query is also converted to a vector and
                      compared against your Vault to find the most relevant
                      matches — even if none of your exact words appear in the
                      saved content.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      Tips for better results
                    </h3>
                    <ul className="space-y-2 text-sm text-neutral-400">
                      {[
                        "Write descriptive descriptions when saving — the richer the text, the better the AI can find it later.",
                        "Search in natural language: try `articles about productivity` instead of just `productivity`.",
                        "If results feel off, try rephrasing your query or adding more detail to the saved description.",
                      ].map((tip, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <hr className="border-neutral-800" />

              {/* 4. Tags & Organization */}
              <section id="tags-organization" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  4. Tags & Organization
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  Tags are the primary way to organize your Vault into meaningful
                  groups.
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    ["Adding tags", "Enter comma-separated tags in the tag field when saving or editing an item."],
                    ["Filtering by tag", "Click any tag on a saved item to filter your Vault to items sharing that tag."],
                    ["Multiple tags", "An item can have as many tags as you like — use them freely."],
                    ["Editing tags", "Open an item and edit its tags at any time."],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-500" />
                      <span>
                        <strong className="text-neutral-200">{title}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-neutral-800" />

              {/* 5. Account & Settings */}
              <section id="account-settings" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  5. Account & Settings
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  Access your settings by clicking your profile at the bottom of
                  the sidebar.
                </p>
                <div className="overflow-hidden rounded-lg border border-neutral-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-900">
                        <th className="px-4 py-3 text-left font-medium text-neutral-300">
                          Setting
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-300">
                          What it does
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {[
                        ["Theme", "Switch between system default, light, or dark mode."],
                        ["Accent color", "Change the highlight color used across the interface."],
                        ["Language", "Set your preferred display language (auto-detect by default)."],
                        ["Default capture location", "Choose where newly saved items land — Inbox or Daily Notes."],
                        ["App lock", "Require authentication before opening MindVault on this device."],
                      ].map(([setting, desc]) => (
                        <tr key={setting} className="bg-neutral-900/40">
                          <td className="px-4 py-3 text-neutral-200">
                            {setting}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">{desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  To delete your account and all associated data, go to{" "}
                  <strong className="text-neutral-300">
                    Settings → Account → Delete Account
                  </strong>
                  . This action is permanent and cannot be undone.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 6. Contact Support */}
              <section id="contact-support" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  6. Contact Support
                </h2>
                <p className="mb-5 leading-7 text-neutral-400 text-sm">
                  Can&apos;t find what you&apos;re looking for? Reach out and
                  we&apos;ll get back to you as soon as possible.
                </p>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm space-y-2">
                  <p className="font-semibold text-neutral-200">MindVault Support</p>
                  <p className="text-neutral-400">
                    Email:{" "}
                    <a
                      href="mailto:anshumanprof01@gmail.com"
                      className="text-blue-400 hover:underline"
                    >
                      anshumanprof01@gmail.com
                    </a>
                  </p>
                  <p className="text-neutral-500 text-xs pt-1">
                    We typically respond within 1–2 business days.
                  </p>
                </div>
              </section>

            </div>

            {/* Footer */}
            <div className="mt-16 border-t border-neutral-800 pt-8 text-xs text-neutral-600">
              © {new Date().getFullYear()} MindVault · All rights reserved ·{" "}
              <Link
                href="/privacy-policy"
                className="text-neutral-500 hover:text-neutral-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
