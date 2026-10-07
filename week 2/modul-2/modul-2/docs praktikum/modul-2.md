# Dokumen Teknis Modul 2 — HTML Semantik, Tailwind CSS, dan Aksesibilitas

Nama/NIM : Ahmad Zaidan / 105224044
Repositori : https://github.com/zaidanahd/105224044_PrakPemWeb

## 1. Struktur Semantik

### Kerangka Landmark dan Hierarki Judul
Halaman utama disusun menggunakan elemen semantik HTML5 untuk memastikan setiap bagian memiliki peran landmark ARIA yang tepat:

- `<header>` (Banner): Membungkus bagian navigasi utama situs.
  - `<nav aria-label="Navigasi utama">`: Berisi logo produk dan tautan ke bagian fitur serta kontak.
- `<main id="konten">` (Main): Menampung seluruh konten utama halaman produk.
  - `<section aria-labelledby="judul-utama">` (Region): Bagian hero section dengan `<h1>` "Kalimat nilai utama produk".
  - `<section id="fitur" aria-labelledby="judul-fitur">` (Region): Bagian fitur utama dengan `<h2>` "Fitur Utama".
  - `<div className="grid lg:grid-cols-[2fr_1fr]">`:
    - `<section aria-labelledby="judul-cara">` (Region): Bagian penjelasan cara kerja dengan `<h2>` "Cara Kerja".
    - `<aside aria-label="Informasi tambahan">` (Complementary): Menampilkan informasi pendukung di samping konten utama.
  - `<section id="kontak" aria-labelledby="judul-kontak">` (Region): Bagian formulir kontak dengan `<h2>` "Hubungi Kami".
- `<footer className="border-t">` (Contentinfo): Informasi hak cipta dan kaki halaman.

### Hierarki Judul (Heading Structure)
1. `<h1>`: Kalimat nilai utama produk (Tepat satu per halaman)
2. `<h2>`: Fitur Utama
3. `<h3>`: Judul masing-masing kartu fitur (di dalam daftar fitur)
4. `<h2>`: Cara Kerja
5. `<h2>`: Hubungi Kami

### Tangkapan Layar Pohon Aksesibilitas (DevTools)
![Pohon Aksesibilitas DevTools](./Gambar%201%20Pohon%20Aksesibilitas.jpg)
*(Tampilkan tangkapan layar dari panel Elements > Accessibility > Enable full-page accessibility tree yang memperlihatkan landmark banner, navigation, main, region, complementary, dan contentinfo)*

---

## 2. Tata Letak Responsif

### Tangkapan Layar Tampilan Responsif
- **Lebar 360 px (Ponsel):**
  ![Tampilan 360px](./Gambar%202%20Halaman%20lebar%20360.jpg)
- **Lebar 768 px (Tablet):**
  ![Tampilan 768px](./Gambar%203%20Halaman%20lebar%20768.jpg)
- **Lebar 1280 px (Desktop):**
  ![Tampilan 1280px](./Gambar%204%20Halaman%20lebar%201280.jpg)

### Kelas Flexbox, Grid, dan Breakpoint yang Digunakan
1. **Navigasi Utama (`<nav>`):**
   - **Kelas:** `flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between`
   - **Alasan:** Menggunakan Flexbox. Pada layar ponsel (<640px), menu tersusun secara vertikal (`flex-col`). Mulai breakpoint `sm:` (≥640px), tata letak berubah menjadi mendatar (`flex-row`) dengan posisi logo di kiri dan menu di kanan (`justify-between`) untuk efisiensi ruang.
2. **Daftar Kartu Fitur (`<ul>`):**
   - **Kelas:** `grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3`
   - **Alasan:** Menggunakan Grid 2 dimensi. Menerapkan pendekatan *mobile-first*: 1 kolom di ponsel (<640px), 2 kolom mulai `sm:` (≥640px), dan 3 kolom mulai `lg:` (≥1024px) agar kartu terdistribusi secara seimbang.
3. **Konten Utama & Aside (`<div>`):**
   - **Kelas:** `grid gap-8 lg:grid-cols-[2fr_1fr]`
   - **Alasan:** Menggunakan nilai sembarang Grid (*arbitrary value*). Pada layar kecil/tablet, konten dan `aside` bertumpuk secara vertikal (1 kolom default). Pada layar desktop (`lg:` ≥1024px), dibuat 2 kolom dengan proporsi area utama 2 bagian dan `aside` 1 bagian.

## 3. Audit Aksesibilitas

### Tabel Skor Lighthouse

| Halaman | Skor Sebelum Perbaikan | Skor Sesudah Perbaikan |
| :--- | :---: | :---: |
| **Halaman Latihan Audit** (`app/latihan-audit`) | 75 | 100 |
| **Halaman Utama Produk** (`app/page.tsx`) | 96 | 100 |


### Daftar Audit yang Gagal, Penyebab, dan Perbaikannya

1. **`Buttons do not have an accessible name`**
   * **Penyebab:** Tombol pencarian pada halaman latihan audit hanya berisi ikon SVG tanpa deskripsi teks yang dapat dibaca oleh pembaca layar (*screen reader*).
   * **Perbaikan:** Menambahkan atribut `aria-label="Cari"` pada elemen `<button>` dan atribut `aria-hidden="true"` pada elemen `<svg>`.

2. **`Image elements do not have [alt] attributes`**
   * **Penyebab:** Elemen `<img>` (logo Next.js) pada halaman latihan tidak memiliki atribut `alt`.
   * **Perbaikan:** Menambahkan atribut `alt` deskriptif (`alt="Logo Next.js"`).

3. **`Form elements do not have associated labels`**
   * **Penyebab:** Elemen `<input type="search">` pada halaman latihan tidak terhubung secara eksplisit dengan elemen `<label>`.
   * **Perbaikan:** Menambahkan elemen `<label htmlFor="cari-alat" className="sr-only">Cari alat</label>` yang terhubung dengan `id="cari-alat"` pada elemen input.

4. **`Background and foreground colors do not have a sufficient contrast ratio`**
   * **Penyebab:** Penggunaan kelas warna dengan tingkat kontras rendah (seperti `text-gray-300` pada halaman latihan audit dan kelas `text-gray-600`/`text-gray-700` pada halaman utama) terhadap latar belakang.
   * **Perbaikan:** Memperbarui penataan tema warna dan mengganti kelas teks menjadi kelas warna yang lebih gelap (seperti `text-gray-800` dan `text-gray-700` dengan kontainer input `bg-white text-gray-900`) untuk memenuhi standar rasio kontras minimum WCAG 2.2 (minimal 4,5:1).

5. **`Document does not have a main landmark`**
   * **Penyebab:** Seluruh pembungkus konten utama pada halaman latihan audit menggunakan elemen `<div>` generik tanpa atribut pembatas wilayah (*landmark*) semantik.
   * **Perbaikan:** Mengubah kontainer pembungkus konten utama menggunakan tag semantik `<main>` serta memastikan struktur *heading* dimulai secara berurutan dengan `<h1>`.


### Hasil Pemeriksaan Manual dengan Papan Ketik

* **Urutan Fokus (Tab Order):** Urutan fokus berjalan secara logis dari atas ke bawah dan dari kiri ke kanan:
  1. Tautan "Lewati ke konten utama" (`sr-only` yang muncul saat menerima fokus).
  2. Tautan logo produk dan menu navigasi utama.
  3. Elemen interaktif pada bagian konten utama dan kartu fitur.
  4. Kolom formulir kontak (Nama lengkap → Surel → Pilihan Peran → Pesan → Tombol Kirim).
* **Garis Fokus (Focus Ring):** Seluruh elemen interaktif dan input formulir memiliki indikator fokus yang jelas dan konsisten berkat penerapan kelas `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700`.


## 4. Kendala dan Penyelesaian

* **Kendala:** Pada saat menguji tampilan seluler (*mobile viewport* 360 px), terdapat keluhan rasio kontras warna yang rendah pada tema gelap serta potensi pergeseran tata letak horizontal.
* **Penyelesaian:** Melakukan standardisasi skema warna menggunakan kontras tinggi sesuai panduan WCAG 2.2 serta memastikan seluruh kontainer responsif menggunakan kelas `w-full` dengan pembatas `max-w-6xl` agar konten tidak meluap (*overflow*) keluar dari layar.


## 5. Catatan Pemanfaatan AI

* **Alat AI:** Gemini / ChatGPT
* **Perintah Utama (Prompt):** "Bantu analisis temuan audit Lighthouse aksesibilitas (rasio kontras, landmark, label form, alt image) dan berikan perbaikan kode Next.js & Tailwind CSS agar skor mencapai 100."
* **Bagian yang Digunakan:** Sebagai referensi pembantu dalam mengidentifikasi elemen yang menyebabkan kegagalan audit aksesibilitas serta menentukan kombinasi warna Tailwind CSS yang memenuhi standar kontras WCAG.
* **Cara Verifikasi:** Memeriksa kesesuaian perbaikan kode secara langsung di *codebase* Next.js, menguji navigasi papan ketik secara manual, serta menjalankan ulang audit otomatis menggunakan Google Chrome DevTools Lighthouse hingga skor menunjukkan 100.