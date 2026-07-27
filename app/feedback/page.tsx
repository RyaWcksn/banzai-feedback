"use client";

import { useState } from "react";

export default function FeedbackPage() {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus("idle");

		const res = await fetch("/api/feedback", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ name: name || null, message }),
		});

		if (res.ok) {
			setStatus("success");
			setName("");
			setMessage("");
		} else {
			setStatus("error");
		}
	};

	return (
		<div className="max-w-lg mx-auto py-16 px-6">
			<h1 className="text-2xl font-semibold mb-6">Kritik & Saran</h1>
			<p className="text-zinc-600 mb-8">
				Masukan Anda sangat berharga untuk meningkatkan kualitas sesi ini.
			</p>

			{status === "success" && (
				<div className="bg-green-100 text-green-800 p-4 rounded mb-6">
					Terima kasih! Masukan Anda telah tercatat.
				</div>
			)}

			{status === "error" && (
				<div className="bg-red-100 text-red-800 p-4 rounded mb-6">
					Terjadi kesalahan. Silakan coba lagi.
				</div>
			)}

			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium mb-1">
						Nama (opsional)
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
						placeholder="Masukkan nama Anda"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium mb-1">
						Kritik & Saran
					</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required
						rows={5}
						className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
						placeholder="Apa yang Anda pikirkan tentang sesi ini?"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
				>
					Kirim
				</button>
			</form>
		</div>
	);
}
