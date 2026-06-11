"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, Shield } from "lucide-react";
import Link from "next/link";

const TOC = [
  { id: "information-we-collect", label: "1. Information We Collect" },
  { id: "how-we-use-data", label: "2. How We Use Your Data" },
  { id: "legal-basis", label: "3. Legal Basis for Processing" },
  { id: "data-sharing", label: "4. Data Sharing & Third Parties" },
  { id: "data-retention", label: "5. Data Retention" },
  { id: "cookies", label: "6. Cookies & Tracking" },
  { id: "security", label: "7. Security" },
  { id: "your-rights", label: "8. Your Rights" },
  { id: "children", label: "9. Children's Privacy" },
  { id: "changes", label: "10. Changes to This Policy" },
  { id: "contact", label: "11. Contact Us" },
];

export default function PrivacyPolicy() {
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
          // pick the top-most visible heading
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
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
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
            <Shield className="h-4 w-4 text-blue-400" />
            Privacy Policy
          </div>
          <div className="w-14" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* ── Sticky TOC sidebar ──────────────────────────────────── */}
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

          {/* ── Main document ───────────────────────────────────────── */}
          <motion.main
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Doc header */}
            <div className="mb-10 border-b border-neutral-800 pb-10">
              <p className="mb-3 text-xs text-neutral-500">
                Effective date:{" "}
                <span className="text-neutral-400">June 11, 2026</span>
                &nbsp;·&nbsp; Last updated:{" "}
                <span className="text-neutral-400">June 11, 2026</span>
              </p>
              <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white">
                Privacy Policy
              </h1>
              <p className="max-w-2xl leading-7 text-neutral-400">
                Welcome to MindVault. We believe your second brain belongs
                entirely to you. This Privacy Policy describes how MindVault
                (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects,
                uses, and protects your personal information when you use our
                service. By using MindVault, you agree to the collection and use
                of information in accordance with this policy.
              </p>
            </div>

            {/* Sections */}
            <div className="space-y-14 prose-headings:scroll-mt-24">
              {/* 1. Information We Collect */}
              <section id="information-we-collect" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  1. Information We Collect
                </h2>
                <p className="mb-4 leading-7 text-neutral-400">
                  MindVault is designed to be your AI-powered second brain. To
                  provide this service, we collect the following categories of
                  personal information:
                </p>
                <div className="space-y-5">
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      Account Information
                    </h3>
                    <p className="leading-7 text-neutral-400 text-sm">
                      When you create an account, we collect your name,
                      username, and email address. If you register with a
                      password, it is securely hashed using bcrypt before
                      storage — we never store your raw password. If you use
                      OAuth (e.g. Google), we receive only the profile details
                      granted by your OAuth provider.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      Vault Content
                    </h3>
                    <p className="leading-7 text-neutral-400 text-sm">
                      We store the links, titles, descriptions, tags, and any
                      other content you explicitly save to your Vault. This data
                      is associated with your account and used solely to provide
                      the MindVault service to you.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      AI Embeddings
                    </h3>
                    <p className="leading-7 text-neutral-400 text-sm">
                      To power our semantic search feature, we generate and
                      store numerical vector embeddings of your saved
                      content&apos;s titles and descriptions. These are
                      mathematical representations, not human-readable text, and
                      are stored in our vector database.
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-1.5 text-sm font-semibold text-neutral-200">
                      Usage Data
                    </h3>
                    <p className="leading-7 text-neutral-400 text-sm">
                      We may collect standard server log data such as your IP
                      address, browser type, pages visited, and timestamps to
                      help diagnose issues and improve performance. This data is
                      not linked to your identity in our systems.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-neutral-800" />

              {/* 2. How We Use Your Data */}
              <section id="how-we-use-data" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  2. How We Use Your Data
                </h2>
                <p className="mb-4 leading-7 text-neutral-400">
                  Your data is used strictly for the following purposes:
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    [
                      "Providing the service",
                      "To operate, maintain, and deliver all features of MindVault, including storing and retrieving your Vault content.",
                    ],
                    [
                      "AI-powered search",
                      "To generate embeddings from your content and run semantic similarity searches so you can find saved items by meaning, not just keywords.",
                    ],
                    [
                      "Authentication & security",
                      "To verify your identity when you log in and to protect your account from unauthorized access.",
                    ],
                    [
                      "Service improvements",
                      "To understand how MindVault is used in aggregate so we can improve performance, reliability, and new features.",
                    ],
                    [
                      "Communications",
                      "To send transactional emails such as password resets or account notifications. We do not send marketing emails without your explicit consent.",
                    ],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                      <span>
                        <strong className="text-neutral-200">{title}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-neutral-800" />

              {/* 3. Legal Basis */}
              <section id="legal-basis" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  3. Legal Basis for Processing
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  If you are located in the European Economic Area (EEA), we
                  process your personal data under the following legal bases as
                  defined by GDPR:
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    [
                      "Contract",
                      "Processing is necessary to perform our contract with you (i.e., to provide MindVault).",
                    ],
                    [
                      "Legitimate interests",
                      "We process usage data under our legitimate interest in improving and securing the service.",
                    ],
                    [
                      "Consent",
                      "Where you have given us explicit consent, such as for optional communications.",
                    ],
                    [
                      "Legal obligation",
                      "Where processing is required to comply with applicable laws.",
                    ],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500" />
                      <span>
                        <strong className="text-neutral-200">{title}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <hr className="border-neutral-800" />

              {/* 4. Data Sharing */}
              <section id="data-sharing" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  4. Data Sharing & Third Parties
                </h2>
                <p className="mb-5 leading-7 text-neutral-400 text-sm">
                  <strong className="text-white">
                    We do not sell, rent, or trade your personal data.
                  </strong>{" "}
                  We only share information with the following categories of
                  third parties, and only to the extent necessary to operate our
                  service:
                </p>
                <div className="overflow-hidden rounded-lg border border-neutral-800">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-800 bg-neutral-900">
                        <th className="px-4 py-3 text-left font-medium text-neutral-300">
                          Third Party
                        </th>
                        <th className="px-4 py-3 text-left font-medium text-neutral-300">
                          Purpose
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {[
                        [
                          "AI embedding providers",
                          "Generating semantic vector embeddings from your content titles/descriptions.",
                        ],
                        [
                          "Cloud infrastructure",
                          "Hosting the application, databases, and file storage.",
                        ],
                        [
                          "Authentication providers",
                          "OAuth sign-in (e.g., Google) when you choose to use it.",
                        ],
                        [
                          "Analytics (anonymous)",
                          "Aggregate, non-identifiable usage statistics to improve the product.",
                        ],
                      ].map(([party, purpose]) => (
                        <tr key={party} className="bg-neutral-900/40">
                          <td className="px-4 py-3 text-neutral-200">
                            {party}
                          </td>
                          <td className="px-4 py-3 text-neutral-400">
                            {purpose}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  All third-party providers are bound by confidentiality
                  agreements and data processing agreements where required by
                  law.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 5. Data Retention */}
              <section id="data-retention" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  5. Data Retention
                </h2>
                <p className="leading-7 text-neutral-400 text-sm">
                  We retain your personal data and Vault content for as long as
                  your account is active. If you delete your account, we will
                  permanently delete your account information and all associated
                  Vault content and embeddings within{" "}
                  <strong className="text-neutral-200">30 days</strong>.
                  Anonymized, aggregate analytics data may be retained
                  indefinitely as it cannot be linked back to you. We may retain
                  certain data longer if required by law or to resolve disputes.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 6. Cookies */}
              <section id="cookies" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  6. Cookies & Tracking
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  MindVault uses a minimal set of cookies necessary to operate
                  the service:
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    [
                      "Session cookies",
                      "Used to keep you logged in during your browsing session. These are deleted when you close your browser.",
                    ],
                    [
                      "Authentication tokens",
                      "Stored in a secure, HTTP-only cookie to remember your login across sessions. You can clear these by signing out.",
                    ],
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
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  We do not use third-party advertising or tracking cookies.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 7. Security */}
              <section id="security" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  7. Security
                </h2>
                <p className="leading-7 text-neutral-400 text-sm">
                  We apply industry-standard security practices to protect your
                  data, including password hashing with bcrypt, HTTPS encryption
                  for all data in transit, and access controls to limit who can
                  access production systems. However, no method of electronic
                  storage or internet transmission is 100% secure. We encourage
                  you to use a strong, unique password and to contact us
                  immediately if you suspect unauthorized access to your
                  account.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 8. Your Rights */}
              <section id="your-rights" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  8. Your Rights
                </h2>
                <p className="mb-4 leading-7 text-neutral-400 text-sm">
                  Depending on your jurisdiction, you may have the following
                  rights regarding your personal data:
                </p>
                <ul className="space-y-3 text-sm text-neutral-400">
                  {[
                    [
                      "Access",
                      "Request a copy of the personal data we hold about you.",
                    ],
                    [
                      "Rectification",
                      "Correct inaccurate or incomplete personal data.",
                    ],
                    [
                      "Erasure",
                      "Request deletion of your account and all associated data.",
                    ],
                    [
                      "Portability",
                      "Receive your Vault content in a machine-readable format.",
                    ],
                    [
                      "Objection",
                      "Object to certain types of processing, including direct marketing.",
                    ],
                    [
                      "Restriction",
                      "Request that we limit processing of your data in certain circumstances.",
                    ],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500" />
                      <span>
                        <strong className="text-neutral-200">{title}: </strong>
                        {desc}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  You can exercise most of these rights directly from your
                  account settings. For requests that cannot be fulfilled
                  in-app, contact us at the address below.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 9. Children's Privacy */}
              <section id="children" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  9. Children&apos;s Privacy
                </h2>
                <p className="leading-7 text-neutral-400 text-sm">
                  MindVault is not directed to children under the age of 13. We
                  do not knowingly collect personal data from children under 13.
                  If you believe a child has provided us with personal
                  information, please contact us and we will promptly delete it.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 10. Changes */}
              <section id="changes" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  10. Changes to This Policy
                </h2>
                <p className="leading-7 text-neutral-400 text-sm">
                  We may update this Privacy Policy from time to time. When we
                  do, we will update the &quot;Last updated&quot; date at the
                  top of this page and, where changes are material, notify you
                  via email or an in-app notice. Your continued use of MindVault
                  after changes become effective constitutes acceptance of the
                  revised policy.
                </p>
              </section>

              <hr className="border-neutral-800" />

              {/* 11. Contact */}
              <section id="contact" className="scroll-mt-24">
                <h2 className="mb-4 text-xl font-semibold text-white">
                  11. Contact Us
                </h2>
                <p className="mb-5 leading-7 text-neutral-400 text-sm">
                  If you have questions, concerns, or requests regarding this
                  Privacy Policy or our data practices, please reach out to us:
                </p>
                <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-5 text-sm space-y-2">
                  <p className="font-semibold text-neutral-200">MindVault</p>
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
                    We aim to respond to all privacy-related inquiries within 30
                    days.
                  </p>
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="mt-16 border-t border-neutral-800 pt-8 text-xs text-neutral-600">
              © {new Date().getFullYear()} MindVault · All rights reserved ·{" "}
              <span className="text-neutral-500">Privacy Policy</span>
            </div>
          </motion.main>
        </div>
      </div>
    </div>
  );
}
