import Link from "next/link";

export default function Home() {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-6">
			<h1 className="text-4xl font-bold mb-4">Questionnaire App</h1>
			<p className="text-zinc-600 mb-8">Berikan kritik dan saran Anda</p>
			<Link
				href="/feedback"
				className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
			>
				Isi Kritik & Saran
			</Link>
		</div>
	);
}
