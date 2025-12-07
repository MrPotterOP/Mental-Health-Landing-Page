"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Shared Components ---

const Toast = ({ message, type, onClose }) => {
    return (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 ${type === "error" ? "bg-red-50 text-red-700 border border-red-200" : "bg-green-50 text-green-700 border border-green-200"
            }`}>
            <span className="font-medium">{message}</span>
            <button onClick={onClose} className="text-current opacity-70 hover:opacity-100 font-bold">×</button>
        </div>
    );
};

const Section = ({ title, children, className = "" }) => (
    <section className={`bg-[var(--clr-white)] rounded-[var(--rd-md)] p-6 shadow-sm border border-[var(--clr-black)]/5 mb-8 ${className}`}>
        {title && <h2 className="text-[var(--fs-h4)] font-semibold mb-6 pb-2 border-b border-[var(--clr-black)]/5">{title}</h2>}
        {children}
    </section>
);

const InputGroup = ({ label, children, description }) => (
    <div className="mb-4">
        <label className="block text-sm font-medium text-[var(--clr-black)]/80 mb-1">{label}</label>
        {children}
        {description && <p className="text-xs text-[var(--clr-black)]/50 mt-1">{description}</p>}
    </div>
);

const StdInput = ({ ...props }) => (
    <input
        className="w-full px-3 py-2 rounded-lg border border-[var(--clr-black)]/10 bg-[var(--clr-bg)]/50 focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-white)] transition-all"
        {...props}
    />
);

const StdTextArea = ({ ...props }) => (
    <textarea
        className="w-full px-3 py-2 rounded-lg border border-[var(--clr-black)]/10 bg-[var(--clr-bg)]/50 focus:outline-none focus:border-[var(--clr-primary)] focus:bg-[var(--clr-white)] transition-all min-h-[100px]"
        {...props}
    />
);

// --- Main Page Component ---

const CreatePage = () => {
    const [passkey, setPasskey] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    // Initial Form State
    const initialForm = {
        slug: "", name: "", email: "", number: "", members: 0,
        logo: "", logoLt: "", problems: [],
        team: [], services: [], faqs: [], address: []
    };
    const [formData, setFormData] = useState(initialForm);

    // Helper States
    const [problemInput, setProblemInput] = useState("");

    // Sub-form states
    const [subForms, setSubForms] = useState({
        team: { name: "", img: "", bio: "", experties: "", intro: "" },
        services: { title: "", desc: "", img: "" },
        faqs: { q: "", a: "" },
        address: { address: "", link: "" }
    });

    const [jsonInputs, setJsonInputs] = useState({ team: "", services: "", faqs: "", address: "" });
    const [modes, setModes] = useState({ team: "manual", services: "manual", faqs: "manual", address: "manual" });

    useEffect(() => {
        const key = localStorage.getItem("passkey");
        if (key) setPasskey(key);
    }, []);

    // Clear status after 5 seconds
    useEffect(() => {
        if (status) {
            const timer = setTimeout(() => setStatus(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);

    const showStatus = (type, message) => setStatus({ type, message });

    const handleBasicChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === "members" ? Number(value) : value
        }));
    };

    // --- Logic: Problems ---
    const addProblem = () => {
        if (!problemInput.trim()) return;
        if (formData.problems.includes(problemInput.trim())) {
            showStatus("error", "Problem already exists in list");
            return;
        }
        setFormData(prev => ({ ...prev, problems: [...prev.problems, problemInput.trim()] }));
        setProblemInput("");
    };

    const removeProblem = (idx) => {
        setFormData(prev => ({ ...prev, problems: prev.problems.filter((_, i) => i !== idx) }));
    };

    // --- Logic: Generic List Management ---
    const handleSubFormChange = (category, field, value) => {
        setSubForms(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: value }
        }));
    };

    const addManualItem = (category) => {
        const item = subForms[category];
        // Validate
        const isEmpty = Object.values(item).every(v => !v);
        if (isEmpty) {
            showStatus("error", "Please fill at least one field.");
            return;
        }

        // Process special fields
        let finalItem = { ...item };
        if (category === "team" && typeof finalItem.experties === "string") {
            finalItem.experties = finalItem.experties.split(",").map(s => s.trim()).filter(Boolean);
        }

        setFormData(prev => ({ ...prev, [category]: [...prev[category], finalItem] }));

        // Reset subform
        const reset = Object.keys(item).reduce((acc, k) => ({ ...acc, [k]: "" }), {});
        setSubForms(prev => ({ ...prev, [category]: reset }));
        showStatus("success", "Item added to list.");
    };

    const addJsonItems = (category) => {
        try {
            if (!jsonInputs[category]) return;
            const parsed = JSON.parse(jsonInputs[category]);
            if (!Array.isArray(parsed)) throw new Error("Root must be an array []");

            setFormData(prev => ({ ...prev, [category]: [...prev[category], ...parsed] }));
            setJsonInputs(prev => ({ ...prev, [category]: "" }));
            showStatus("success", `Successfully added ${parsed.length} items to ${category}.`);
        } catch (err) {
            showStatus("error", `JSON Error: ${err.message}`);
        }
    };

    const removeListItem = (category, idx) => {
        setFormData(prev => ({ ...prev, [category]: prev[category].filter((_, i) => i !== idx) }));
    };

    // --- Submit ---
    const handleSubmit = async () => {
        if (!passkey) {
            showStatus("error", "Missing Passkey. Set 'passkey' in localStorage.");
            return;
        }
        if (!formData.slug || !formData.name) {
            showStatus("error", "Slug and Name are required.");
            const slugInput = document.querySelector('input[name="slug"]');
            if (slugInput) slugInput.focus();
            return;
        }

        setLoading(true);
        try {
            const payload = {
                passkey,
                ...formData,
                team: formData.team,
                services: formData.services,
                faqs: formData.faqs,
                address: formData.address,
            };

            const res = await fetch("/api/createPage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Request failed");

            showStatus("success", `Page '${data.page.name}' created successfully!`);
            // Optional: clear form here if needed
        } catch (err) {
            showStatus("error", err.message);
        } finally {
            setLoading(false);
        }
    };

    // --- Render Helpers ---
    const renderListEditor = (key, label, fields) => (
        <Section title={label} className="relative">
            <div className="flex gap-4 mb-6 border-b border-[var(--clr-black)]/5">
                {['manual', 'json'].map(mode => (
                    <button
                        key={mode}
                        onClick={() => setModes(p => ({ ...p, [key]: mode }))}
                        className={`pb-2 px-4 capitalize text-sm font-medium transition-colors ${modes[key] === mode
                            ? "text-[var(--clr-primary)] border-b-2 border-[var(--clr-primary)]"
                            : "text-[var(--clr-black)]/40 hover:text-[var(--clr-black)]/70"
                            }`}
                    >
                        {mode} Entry
                    </button>
                ))}
                <div className="ml-auto text-xs font-mono bg-[var(--clr-black)]/5 px-2 py-1 rounded self-center">
                    Count: {formData[key].length}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {modes[key] === "manual" ? (
                    <motion.div
                        key="manual"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-[var(--clr-bg)]/30 p-4 rounded-lg border border-[var(--clr-black)]/5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {fields.map(f => (
                                <InputGroup key={f.name} label={f.label} description={f.desc}>
                                    <StdInput
                                        placeholder={f.ph}
                                        value={subForms[key][f.name]}
                                        onChange={(e) => handleSubFormChange(key, f.name, e.target.value)}
                                    />
                                </InputGroup>
                            ))}
                        </div>
                        <button
                            onClick={() => addManualItem(key)}
                            className="mt-2 bg-[var(--clr-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
                        >
                            Add {label} Item
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="json"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <InputGroup label={`Paste JSON Array for ${label}`}>
                            <StdTextArea
                                placeholder={`[\n  { "key": "value" },\n  ...\n]`}
                                value={jsonInputs[key]}
                                onChange={(e) => setJsonInputs(p => ({ ...p, [key]: e.target.value }))}
                                rows={8}
                                className="font-mono text-sm"
                            />
                        </InputGroup>
                        <button
                            onClick={() => addJsonItems(key)}
                            className="bg-[var(--clr-black)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-80 active:scale-95 transition-all"
                        >
                            Parse & Add Items
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List Preview */}
            {formData[key].length > 0 && (
                <div className="mt-6 space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {formData[key].map((item, idx) => (
                        <div key={idx} className="group flex justify-between items-start bg-[var(--clr-bg)] p-3 rounded-md text-sm cursor-default hover:bg-[var(--clr-black)]/5 transition-colors">
                            <pre className="whitespace-pre-wrap font-sans text-[var(--clr-black)]/80 flex-1">
                                {Object.entries(item).map(([k, v]) => {
                                    if (v && typeof v !== 'object') return <span key={k} className="mr-3"><strong className="opacity-50 text-xs uppercase">{k}:</strong> {v}</span>
                                    return null;
                                })}
                            </pre>
                            <button
                                onClick={() => removeListItem(key, idx)}
                                className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-4"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </Section>
    );

    return (
        <div className="min-h-screen bg-[var(--clr-bg)] py-12 px-4 md:px-8 font-sans">
            <div className="max-w-[1400px] mx-auto">
                {status && <Toast message={status.message} type={status.type} onClose={() => setStatus(null)} />}

                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[var(--clr-black)]/5 pb-6">
                    <div>
                        <h1 className="text-[var(--fs-h3)] font-bold text-[var(--clr-primary)] leading-none mb-2">Create New Page</h1>
                        <p className="text-[var(--fs-p1)] text-[var(--clr-black)]/60">Fill in the details below to generate a new content page.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${passkey ? "bg-emerald-50 text-emerald-600 border-emerald-200" : "bg-rose-50 text-rose-600 border-rose-200"}`}>
                            {passkey ? "AUTH_READY" : "NO_KEY"}
                        </div>
                        {/* Link to the Manage Page */}
                        <a href="/allPages" className="px-4 py-2 bg-[var(--clr-white)] border border-[var(--clr-black)]/10 rounded-lg text-sm font-medium hover:bg-[var(--clr-black)]/5 transition-all">
                            Manage Existing Pages →
                        </a>
                    </div>
                </header>

                {/* Form Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Form Left Col: Basic Info */}
                    <div className="lg:col-span-1 h-fit sticky top-8">
                        <Section title="Page Metadata" className="">
                            <InputGroup label="URL Slug" description="Must be unique (e.g. 'mental-health-center')">
                                <StdInput name="slug" value={formData.slug} onChange={handleBasicChange} placeholder="my-page-slug" />
                            </InputGroup>
                            <InputGroup label="Page Name">
                                <StdInput name="name" value={formData.name} onChange={handleBasicChange} placeholder="Display Name" />
                            </InputGroup>
                            <InputGroup label="Contact Email">
                                <StdInput name="email" value={formData.email} onChange={handleBasicChange} type="email" />
                            </InputGroup>
                            <InputGroup label="Phone Number">
                                <StdInput name="number" value={formData.number} onChange={handleBasicChange} type="tel" />
                            </InputGroup>
                            <InputGroup label="Member Count">
                                <StdInput name="members" value={formData.members} onChange={handleBasicChange} type="number" />
                            </InputGroup>
                        </Section>

                        <Section title="Assets & Tags">
                            <InputGroup label="Logo URL">
                                <StdInput name="logo" value={formData.logo} onChange={handleBasicChange} />
                            </InputGroup>
                            <InputGroup label="Light Logo (Optional)">
                                <StdInput name="logoLt" value={formData.logoLt} onChange={handleBasicChange} />
                            </InputGroup>

                            <hr className="my-6 border-[var(--clr-black)]/5" />

                            <InputGroup label="Problems / Specialties">
                                <div className="flex gap-2">
                                    <StdInput
                                        value={problemInput}
                                        onChange={(e) => setProblemInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && addProblem()}
                                        placeholder="Add tag..."
                                    />
                                    <button onClick={addProblem} className="bg-[var(--clr-black)]/5 hover:bg-[var(--clr-black)]/10 px-3 rounded-lg text-xl font-bold text-[var(--clr-primary)]">+</button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {formData.problems.map((p, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--clr-white)] border border-[var(--clr-black)]/10 rounded-full text-xs font-medium text-[var(--clr-black)]/70">
                                            {p}
                                            <button onClick={() => removeProblem(i)} className="hover:text-red-500 font-bold">×</button>
                                        </span>
                                    ))}
                                </div>
                            </InputGroup>
                        </Section>

                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg shadow-[var(--clr-primary)]/20 transition-all ${loading
                                ? "bg-[var(--clr-black)]/50 cursor-not-allowed text-white"
                                : "bg-[var(--clr-primary)] text-white hover:translate-y-[-2px] hover:shadow-xl"
                                }`}
                        >
                            {loading ? "Creating Page..." : "Create Page"}
                        </button>
                    </div>

                    {/* Form Right Col: Relations */}
                    <div className="lg:col-span-2 space-y-8">
                        {renderListEditor("team", "Team Members", [
                            { name: "name", label: "Name", ph: "Dr. Name" },
                            { name: "img", label: "Image URL", ph: "https://..." },
                            { name: "bio", label: "Bio", ph: "Short biography..." },
                            { name: "intro", label: "Introduction", ph: "Role or brief intro" },
                            { name: "experties", label: "Expertise", ph: "CBT, Trauma (comma sep)", desc: "Comma separated values" }
                        ])}

                        {renderListEditor("services", "Services", [
                            { name: "title", label: "Service Title", ph: "Group Therapy" },
                            { name: "desc", label: "Description", ph: "Details..." },
                            { name: "img", label: "Image URL", ph: "https://..." }
                        ])}

                        {renderListEditor("faqs", "FAQs", [
                            { name: "q", label: "Question", ph: "How do I book?" },
                            { name: "a", label: "Answer", ph: "You can book by..." }
                        ])}

                        {renderListEditor("address", "Addresses / Locations", [
                            { name: "address", label: "Display Address", ph: "123 Main St, NY" },
                            { name: "link", label: "Maps Link", ph: "https://maps.google.com/..." }
                        ])}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;