export default function LatihanAudit() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Katalog Alat Laboratorium</h1>
      <img src="/next.svg" alt="Logo Next.js" width={120} height={24} />
      <p className="text-gray-700">Stok diperbarui setiap hari.</p>
      
      <div className="mt-4 flex items-center gap-2">
        <label htmlFor="cari-alat" className="sr-only">
          Cari alat
        </label>
        <input
          id="cari-alat"
          type="search"
          className="rounded border p-2"
          placeholder="Cari alat..."
        />
        <button
          type="button"
          aria-label="Cari"
          className="rounded border p-2 hover:bg-gray-100"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              stroke="currentColor"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </main>
  );
}