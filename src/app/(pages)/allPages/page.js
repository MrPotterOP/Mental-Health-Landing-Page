"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Components ---

const Toast = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
            }`}>
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="text-current opacity-70 hover:opacity-100 font-bold">×</button>
        </div>
    );
};

// --- Main Page Component ---

const ManagePages = () => {
    const [passkey, setPasskey] = useState("");
    const [allPages, setAllPages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loadingPages, setLoadingPages] = useState(false);
    const [status, setStatus] = useState(null);

    useEffect(() => {
        const key = localStorage.getItem("passkey");
        if (key) {
            setPasskey(key);
            fetchPages(key);
        }
    }, []);

    // Clear status
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const showStatus = (type, message) => setStatus({ type, message });

    const fetchPages = async (key) => {
        setLoadingPages(true);
        try {
            const res = await fetch("/api/getPages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passkey: key })
            });
            const data = await res.json();
            if (res.ok) {
                setAllPages(data.pages || []);
            } else {
                showStatus("error", "Failed to load pages.");
            }
        } catch (err) {
            console.error("Fetch error:", err);
            showStatus("error", "Connection failed.");
        } finally {
            setLoadingPages(false);
        }
    };

    const handleDeletePage = async (slug) => {
        if (!confirm(`Are you sure you want to delete "${slug}"? This cannot be undone.`)) return;

        try {
            const res = await fetch("/api/deletePage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passkey, slug })
            });
            const data = await res.json();
            if (res.ok) {
                showStatus("success", "Page deleted successfully.");
                fetchPages(passkey);
            } else {
                showStatus("error", data.error || "Failed to delete page.");
            }
        } catch (err) {
            showStatus("error", "Delete error: " + err.message);
        }
    };

    const handleRevalidatePage = async (slug) => {
        if (!confirm(`Are you sure you want to revalidate "${slug}"?`)) return;

        try {
            const res = await fetch("/api/revalidatePage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ passkey, slug })
            });
            const data = await res.json();
            if (res.ok) {
                showStatus("success", "Page revalidated successfully.");
                fetchPages(passkey);
            } else {
                showStatus("error", data.error || "Failed to revalidate page.");
            }
        } catch (err) {
            showStatus("error", "Revalidate error: " + err.message);
        }
    };

    const filteredPages = allPages.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const EnhancedPageCard = ({ page, onDelete }) => (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[var(--clr-white)] rounded-xl border border-[var(--clr-black)]/5 hover:border-[var(--clr-primary)]/30 hover:shadow-lg transition-all p-5 flex flex-col justify-between group h-full relative overflow-hidden"
        >
            {/* Background decorative element */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--clr-primary)]/5 rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150" />

            <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {page.logo ? (
                            <img src={page.logo} alt="logo" className="w-12 h-12 object-contain rounded-lg bg-gray-50 border border-[var(--clr-black)]/5" />
                        ) : (
                            <div className="w-12 h-12 bg-[var(--clr-bg)] rounded-lg flex items-center justify-center text-xs font-bold text-[var(--clr-black)]/30">IMG</div>
                        )}
                        <div>
                            <h3 className="font-bold text-lg text-[var(--clr-black)] leading-tight">{page.name}</h3>
                            <p className="text-xs text-[var(--clr-black)]/50 font-mono">/{page.slug}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[var(--clr-black)]/70">
                        <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        <span className="truncate">{page.email || "No email"}</span>
                    </div>
                </div>

                {/* Revalidate and Copy Slug btns */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => handleRevalidatePage(page.slug)}
                        className="text-[var(--clr-primary)] hover:text-[var(--clr-primary)/80] text-xs font-semibold px-2 py-1 hover:bg-[var(--clr-primary)/10] rounded transition-colors flex items-center gap-1"
                    >
                        Revalidate
                    </button>
                    <button
                        onClick={() => navigator.clipboard.writeText(page.slug)}
                        className="text-[var(--clr-primary)] hover:text-[var(--clr-primary)/80] text-xs font-semibold px-2 py-1 hover:bg-[var(--clr-primary)/10] rounded transition-colors flex items-center gap-1"
                    >
                        Copy Slug
                    </button>
                </div>

            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[var(--clr-black)]/5 relative z-10">
                <button
                    onClick={() => onDelete(page.slug)}
                    className="text-red-400 hover:text-red-600 text-xs font-semibold px-2 py-1 hover:bg-red-50 rounded transition-colors flex items-center gap-1"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Delete
                </button>
                <a
                    href={`/${page.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-[var(--clr-primary)] hover:underline flex items-center gap-1"
                >
                    View Live Page
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
            </div>
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[var(--clr-bg)] py-12 px-4 md:px-8 font-sans">
            <div className="max-w-[1400px] mx-auto">
                {status && <Toast message={status.message} type={status.type} onClose={() => setStatus(null)} />}

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-[var(--clr-black)]/5">
                    <div>
                        <h1 className="text-[var(--fs-h3)] font-bold text-[var(--clr-primary)] leading-none mb-2">Manage Pages</h1>
                        <p className="text-[var(--fs-p1)] text-[var(--clr-black)]/60">
                            {loadingPages ? "Loading data..." : `${allPages.length} pages currently live.`}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                        <div className="relative group min-w-[300px]">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400 group-focus-within:text-[var(--clr-primary)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-[var(--clr-black)]/10 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[var(--clr-primary)]/20 focus:border-[var(--clr-primary)] transition-all sm:text-sm"
                                placeholder="Search by name or slug..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <a
                            href="/addPage"
                            className="bg-[var(--clr-primary)] text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[var(--clr-primary)]/20 hover:shadow-xl hover:translate-y-[-2px] transition-all text-center flex items-center justify-center gap-2"
                        >
                            <span>+ Create New</span>
                        </a>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="min-h-[400px]">
                    {loadingPages ? (
                        <div className="flex flex-col items-center justify-center h-64 text-[var(--clr-black)]/40 gap-4">
                            <div className="w-8 h-8 border-4 border-[var(--clr-primary)]/20 border-t-[var(--clr-primary)] rounded-full animate-spin"></div>
                            <p>Fetching pages...</p>
                        </div>
                    ) : filteredPages.length === 0 ? (
                        <div className="text-center py-20 bg-[var(--clr-white)] rounded-2xl border border-[var(--clr-black)]/5 border-dashed">
                            <div className="text-[var(--clr-black)]/20 mb-4">
                                <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <h3 className="text-lg font-medium text-[var(--clr-black)]/60">No pages found</h3>
                            <p className="text-sm text-[var(--clr-black)]/40 mt-1">
                                {searchQuery ? `No results for "${searchQuery}"` : "Get started by creating your first page."}
                            </p>
                            {!searchQuery && (
                                <a href="/admin/create" className="mt-4 inline-block text-[var(--clr-primary)] font-medium hover:underline">Create Page Now</a>
                            )}
                        </div>
                    ) : (
                        <motion.div
                            layout
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                        >
                            <AnimatePresence>
                                {filteredPages.map((page) => (
                                    <EnhancedPageCard key={page.slug} page={page} onDelete={handleDeletePage} />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManagePages;