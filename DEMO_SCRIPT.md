# CIVICTWIN Semarang — Demo Script
**Lomba Smart City UNY 2025**  
Durasi estimasi: **5–7 menit**

---

## Persiapan Sebelum Demo

- [ ] Buka terminal, jalankan `npm run dev`
- [ ] Buka browser di `http://localhost:5173`
- [ ] Resolusi minimal: 1280 × 720 (ideal: 1920 × 1080)
- [ ] Zoom browser: 80–90% agar semua konten terlihat
- [ ] Buka **Demo Flow panel** di sidebar kiri (klik tombol "🎬 Demo Flow")
- [ ] Siapkan tab: Landing → Dashboard → Genuk → Simulator → Policy Brief → Publik → Metodologi

---

## 🎬 Narasi Demo

---

### [00:00 — 00:45] Pembukaan & Problem Statement

*(Tampilkan: Landing Page — `/`)*

> "Selamat pagi/siang, Bapak/Ibu juri. Kami mempersembahkan **CIVICTWIN Semarang** — sebuah prototype Decision Support System berbasis digital twin untuk membantu pemerintah kota dalam pengambilan keputusan berbasis data."

> "Masalah yang kami angkat sederhana namun krusial. Pertama: **data kota masih tersebar** di berbagai dinas tanpa satu titik integrasi. Kedua: **prioritas kebijakan sulit dijelaskan secara transparan** kepada publik. Dan ketiga: **koordinasi lintas OPD** membutuhkan platform bersama agar lebih efisien."

> *(scroll ke bawah ke bagian Solusi)* "CIVICTWIN menjawab ketiga tantangan ini melalui lima pilar: digital twin wilayah, priority score engine, policy simulator, CivicSense AI, dan portal transparansi publik."

---

### [00:45 — 01:30] Dashboard Kota — Ranking Wilayah

*(Klik: Dashboard Kota — `/dashboard`)*

> "Ini adalah **Dashboard Kota** — tampilan pertama yang akan dilihat pejabat pemerintah."

> "Secara sekilas, kita bisa melihat: dari 6 kecamatan dalam prototype ini, terdapat 2 wilayah dengan prioritas tinggi yang membutuhkan intervensi segera. Rata-rata priority score kota adalah 63 dari skala 100."

> *(tunjuk bar chart)* "Bar chart ini menunjukkan perbandingan Priority Score secara visual. Semarang Utara berada di puncak dengan skor 81, diikuti Genuk dengan 76 — keduanya berstatus Prioritas Tinggi dan ditandai merah."

> "Dari sini, pejabat langsung tahu: **mana yang harus diutamakan**, tanpa perlu membaca laporan tebal dari masing-masing dinas."

---

### [01:30 — 02:30] Detail Wilayah — Digital Twin Genuk

*(Klik: Detail Wilayah — `/regions/genuk`)*

> "Mari kita lihat detail Genuk — wilayah dengan skor 76. Ini adalah representasi **digital twin** kecamatan Genuk."

> "Di sini kita bisa melihat 6 indikator kunci secara langsung. Risiko banjir/rob-nya **91 dari 100** — sangat kritis. Laporan warga aktif **88**. Kerentanan sosial **75**. Artinya, wilayah ini mengalami tekanan dari berbagai arah secara bersamaan."

> *(scroll ke AI Insight Card)* "Yang menarik adalah fitur **CivicSense AI**. Klik tombol ini..."

> *(klik tombol 'Explain Priority with CivicSense AI')* "...dan sistem secara otomatis menghasilkan narasi mengapa Genuk menjadi prioritas tinggi, tanpa perlu seorang analis menulis laporan manual. Ini adalah bentuk AI sebagai *policy co-pilot*."

---

### [02:30 — 03:15] Policy Simulator — Simulasi Fokus Kebijakan

*(Klik: Policy Simulator — `/simulator`)*

> "Fitur selanjutnya yang kami banggakan: **Policy Simulator**."

> "Di sini pemerintah bisa bertanya: *'Bagaimana jika tahun ini kita fokuskan anggaran ke penanganan banjir?'* Pilih mode **Fokus Banjir/Rob**..."

> *(klik Fokus Banjir/Rob)* "...dan lihat — ranking wilayah berubah secara real-time. Genuk naik ke posisi pertama karena risiko banjirnya paling tinggi. Tugu juga ikut naik. Sementara Banyumanik, yang risikonya rendah, turun ke bawah."

> *(tunjuk AI narration panel)* "CivicSense AI otomatis menjelaskan mengapa perubahan ini terjadi dan apa artinya bagi kebijakan. Ini menunjukkan bahwa **prioritas wilayah bersifat relatif terhadap perspektif kebijakan** — bukan nilai absolut."

---

### [03:15 — 04:15] AI Policy Brief Generator

*(Klik: Policy Brief — `/policy-brief`)*

> "Setelah pemerintah menentukan wilayah prioritas, langkah berikutnya adalah menyusun rekomendasi kebijakan. Di sinilah **AI Policy Brief Generator** bekerja."

> "Pilih wilayah Genuk, dan sistem — melalui CivicSense AI — secara otomatis menghasilkan dokumen policy brief yang komprehensif: Executive Summary, Priority Analysis, Key Data Signals, Rekomendasi Kebijakan, Stakeholder Mapping, hingga ringkasan untuk komunikasi publik."

> *(scroll ke Section 04)* "Lihat bagian Rekomendasi — ada 5 rekomendasi spesifik dengan lead dinas dan timeline yang jelas: mana yang 0–3 bulan, mana yang 6–12 bulan."

> *(klik tombol Salin Brief)* "Dokumen ini bisa langsung disalin atau dicetak sebagai PDF — siap digunakan dalam rapat koordinasi OPD."

---

### [04:15 — 05:00] Public Transparency Page & Metodologi

*(Klik: Transparansi Publik — `/public`)*

> "CIVICTWIN tidak hanya untuk pemerintah. Portal **Transparansi Publik** ini ditujukan untuk warga umum."

> "CivicSense AI mengubah data teknis menjadi bahasa yang mudah dipahami masyarakat. Warga bisa tahu: kenapa Semarang Utara atau Genuk mendapat perhatian pemerintah — tanpa harus membaca laporan BPS."

> "Ini adalah bentuk nyata dari **smart governance yang inklusif**: keputusan pemerintah bisa dijelaskan kepada rakyat secara terbuka."

*(Klik: Metodologi — `/methodology`)*

> "Terakhir, halaman **Metodologi** ini kami siapkan khusus untuk menjawab pertanyaan teknis. Di sini tersedia formula lengkap Priority Score, penjelasan 6 indikator, sumber data yang akan digunakan pada implementasi nyata, serta roadmap pengembangan ke depan."

---

### [05:00 — 05:30] Penutup

> "Untuk merangkum: CIVICTWIN Semarang adalah **proof of concept yang fungsional** — bukan sekadar visualisasi. Sistem memiliki scoring engine yang dapat diaudit, AI yang menghasilkan narasi berbasis data, dan alur kebijakan dari data → prioritas → simulasi → rekomendasi → transparansi publik."

> "Pada implementasi nyata, kami telah merancang roadmap untuk integrasi data resmi BPS, API pemerintah daerah, model AI sesungguhnya, dan visualisasi geospasial berbasis peta Semarang."

> "Terima kasih. Kami membuka sesi tanya jawab."

---

## ❓ Antisipasi Pertanyaan Juri

| Pertanyaan | Jawaban Ringkas |
|------------|-----------------|
| "Apakah datanya akurat?" | Data adalah simulasi prototype. Pada implementasi nyata, data bersumber dari BPS, BPBD, dan OPD yang telah divalidasi. Lihat halaman Metodologi. |
| "Bagaimana formula scoring-nya?" | Priority Score = Σ(nilai × bobot). 6 indikator, bobot berjumlah 100%. Akses Layanan Publik diinversi karena logika terbalik. Formula tersedia di halaman Metodologi. |
| "AI-nya pakai apa?" | Rule-based template engine berbasis data wilayah — tidak menggunakan API eksternal. Pada implementasi nyata dapat diintegrasikan dengan LLM. |
| "Sudah ada data resminya?" | Belum. Ini proof of concept. Integrasi data resmi adalah prioritas pertama roadmap pengembangan. |
| "Siapa penggunanya?" | Dua segmen: (1) Pejabat/staf pemerintah untuk dashboard dan policy brief. (2) Warga umum untuk portal transparansi publik. |
| "Bagaimana keamanan datanya?" | Prototype tidak menggunakan backend/database. Pada produksi, akan ada autentikasi, enkripsi, dan audit trail sesuai SPBE. |

---

*CIVICTWIN Semarang — Prototype Smart City · Lomba UNY 2025*
