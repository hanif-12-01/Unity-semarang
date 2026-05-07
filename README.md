# CIVICTWIN Semarang

> **Digital Twin Wilayah untuk Prioritas Kebijakan Kota yang Transparan dan Berbasis Data**

CIVICTWIN Semarang adalah prototype *Decision Support System* berbasis digital twin untuk Pemerintah Kota Semarang. Sistem ini memungkinkan pemerintah membaca kondisi wilayah, menghitung *priority score*, mensimulasikan fokus kebijakan, dan menghasilkan *policy brief* berbasis data — dalam satu platform terintegrasi.

> ⚠️ **Catatan:** Prototype ini menggunakan **kombinasi data publik, data olahan, dan simulasi terbatas** untuk proof of concept. Data tidak mewakili kondisi resmi Kota Semarang. Lihat bagian [Catatan Data](#catatan-data) untuk detail lengkap.

---

## 📋 Daftar Isi

- [Problem Statement](#problem-statement)
- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Cara Menjalankan](#cara-menjalankan)
- [Struktur Folder](#struktur-folder)
- [Demo Flow](#demo-flow)
- [Arsitektur Data](#arsitektur-data)
- [CivicSense AI](#civicsense-ai)
- [Catatan Data](#catatan-data)
- [Pengembangan Berikutnya](#pengembangan-berikutnya)
- [Tim](#tim)

---

## 🎯 Problem Statement

Pemerintah kota menghadapi tiga tantangan utama dalam pengambilan keputusan berbasis wilayah:

1. **Data Tersebar** — Informasi kondisi wilayah tersimpan di berbagai dinas tanpa satu titik integrasi.
2. **Prioritas Tidak Transparan** — Keputusan alokasi anggaran sering tidak disertai dasar numerik yang dapat diaudit publik.
3. **Koordinasi Lintas Dinas Lambat** — Tanpa platform bersama, kolaborasi antar-OPD untuk menangani masalah kompleks menjadi tidak efisien.

CIVICTWIN hadir sebagai jawaban: satu platform yang mengintegrasikan data, menghitung prioritas, dan menghasilkan rekomendasi kebijakan secara otomatis.

---

## ✨ Fitur Utama

### 1. 🏠 Landing Page
Halaman pengantar yang menjelaskan masalah, solusi, dan nilai utama CIVICTWIN. Dilengkapi *Demo Flow* interaktif sebagai panduan eksplorasi.

### 2. 📊 Dashboard Kota
Pusat kendali pemerintah. Menampilkan:
- Ranking 6 kecamatan berdasarkan *Priority Score*
- Bar chart perbandingan skor wilayah
- Summary cards (total wilayah, prioritas tinggi, rata-rata skor, wilayah teratas)
- Isu dominan kota

### 3. 🔍 Detail Wilayah (Digital Twin)
Representasi digital tiap kecamatan dengan:
- 6 indikator kunci (risiko banjir, kepadatan, kerentanan sosial, layanan publik, laporan warga, UMKM)
- Progress bar per indikator dengan kode warna
- Masalah dominan
- Rekomendasi kebijakan
- Stakeholder terkait
- **CivicSense AI Insight** — narasi otomatis mengapa wilayah diprioritaskan

### 4. ⚖️ Policy Simulator
Alat simulasi interaktif. User dapat mengubah fokus kebijakan dan melihat ranking wilayah berubah secara real-time:
- General Priority
- Fokus Banjir/Rob
- Fokus Layanan Publik
- Fokus Kerentanan Sosial
- Fokus Ekonomi UMKM
- Fokus Laporan Warga

Dilengkapi **CivicSense AI Narration** — penjelasan otomatis mengapa ranking berubah.

### 5. ✨ AI Policy Brief Generator
Menghasilkan dokumen ringkasan kebijakan profesional per wilayah secara otomatis:
- Executive Summary
- Priority Analysis (AI-powered)
- Key Data Signals
- Rekomendasi Kebijakan
- Stakeholder Mapping
- Langkah Implementasi
- Citizen Communication Summary
- Fitur salin ke clipboard & cetak PDF

### 6. 🌐 Public Transparency Page
Portal terbuka untuk warga. Menampilkan kondisi dan prioritas wilayah dalam bahasa sederhana tanpa jargon teknis. Dilengkapi **CivicSense AI Citizen Summary**.

### 7. 📋 Methodology Page
Halaman dokumentasi teknis untuk menjawab pertanyaan juri:
- Sumber data pada implementasi nyata
- Source Log & Data Status per indikator
- Penjelasan 6 indikator + bobot
- Formula Priority Score
- Penjelasan inversi indikator (Akses Layanan Publik)
- Batasan prototype
- Roadmap pengembangan

---

## 🛠 Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| Framework UI | React 18 |
| Language | TypeScript 5.7 |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS 3.4 |
| Routing | React Router DOM 7 |
| AI Engine | Rule-based templates (no external API) |
| Data | Mock data lokal berbasis kombinasi data publik, data olahan, dan simulasi terbatas |

**Tidak menggunakan:**
- Backend / server
- Database eksternal
- API AI (OpenAI, Gemini, dsb.)
- Autentikasi

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js ≥ 18
- npm ≥ 9

### Instalasi & Jalankan Dev Server

```bash
# Clone atau ekstrak project
cd "LOMBA UNY (SMART CITY)"

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### Build Produksi

```bash
npm run build
npm run preview
```

### TypeScript Check

```bash
npx tsc --noEmit
```

---

## 📁 Struktur Folder

```
src/
├── layout/
│   └── AppLayout.tsx          # Sidebar, header, footer, Demo Flow panel
│
├── pages/
│   ├── LandingPage.tsx        # Halaman utama + demo flow guide
│   ├── DashboardPage.tsx      # Dashboard kota — ranking & visualisasi
│   ├── RegionDetailPage.tsx   # Digital twin per wilayah + CivicSense AI
│   ├── PolicySimulatorPage.tsx# Simulasi bobot kebijakan + AI narration
│   ├── PolicyBriefPage.tsx    # AI Policy Brief Generator
│   ├── PublicTransparencyPage.tsx # Portal warga
│   └── MethodologyPage.tsx    # Dokumentasi metodologi & scoring
│
├── components/
│   └── ui/
│       ├── Button.tsx          # Tombol reusable
│       ├── IndicatorBar.tsx    # Progress bar indikator dengan warna otomatis
│       ├── PageHeader.tsx      # Header section reusable
│       ├── PriorityBadge.tsx   # Badge prioritas (Tinggi/Sedang/Rendah)
│       └── CivicSenseInsightCard.tsx # Komponen AI insight card
│
├── data/
│   └── mockData/
│       ├── regions.ts          # Data simulasi 6 kecamatan Semarang
│       └── index.ts            # Barrel export + helper functions
│
└── utils/
    ├── scoring.ts              # Priority Score Engine + 6 policy modes
    ├── civicSenseAI.ts         # CivicSense AI — rule-based narration engine
    ├── policyBrief.ts          # Policy Brief template generator
    ├── classNames.ts           # Utility class merging
    └── index.ts                # Barrel exports
```

---

## 🎬 Demo Flow

Ikuti urutan ini untuk demo yang paling optimal (estimasi: **5–7 menit**):

| # | Halaman | URL | Yang Ditunjukkan |
|---|---------|-----|------------------|
| 1 | Landing Page | `/` | Problem statement, solusi, demo flow guide |
| 2 | Dashboard Kota | `/dashboard` | Ranking wilayah, bar chart, isu dominan kota |
| 3 | Detail Wilayah — Genuk | `/regions/genuk` | Digital twin, indikator, klik "Explain Priority with CivicSense AI" |
| 4 | Policy Simulator | `/simulator` | Ganti ke "Fokus Banjir/Rob", lihat ranking + AI narration berubah |
| 5 | AI Policy Brief | `/policy-brief` | Generate brief Genuk, tunjukkan 8 section, salin brief |
| 6 | Transparansi Publik | `/public` | AI Citizen Summary, portal warga, bahasa sederhana |
| 7 | Metodologi | `/methodology` | Formula scoring, sumber data, batasan, roadmap |

> 💡 **Tips Demo:** Gunakan panel **Demo Flow** di sidebar kiri (klik tombol "🎬 Demo Flow") untuk navigasi cepat antar halaman tanpa harus mengetik URL secara manual.

---

## 🏗 Arsitektur Data

### Priority Score Formula

```
Priority Score = Σ (nilai_indikator_i × bobot_i)

nilai_indikator ∈ [0, 100]
Σ bobot = 1.0 (untuk setiap mode kebijakan)
```

**Catatan Inversi:**
```
Akses Layanan Publik → nilai_efektif = 100 − nilai_asli
(nilai rendah = akses buruk = kebutuhan intervensi tinggi)
```

### Bobot Default (General Priority)

| Indikator | Bobot | Logika |
|-----------|-------|--------|
| Risiko Banjir/Rob | 25% | Normal |
| Kerentanan Sosial | 20% | Normal |
| Kepadatan Penduduk | 15% | Normal |
| Akses Layanan Publik | 15% | **Terbalik** |
| Laporan Warga | 15% | Normal |
| Aktivitas UMKM | 10% | Normal |

### Kategori Prioritas

| Skor | Kategori |
|------|----------|
| 75–100 | Prioritas Tinggi |
| 50–74 | Prioritas Sedang |
| 0–49 | Prioritas Rendah |

---

## 🤖 CivicSense AI

CivicSense AI adalah asisten analisis kebijakan berbasis data wilayah. Pada prototype ini menggunakan **rule-based template engine** (tanpa API eksternal).

### Empat Fungsi CivicSense AI

| Fungsi | Lokasi | Output |
|--------|--------|--------|
| `generateRegionInsight()` | Detail Wilayah | Narasi + bullets + CTA mengapa wilayah diprioritaskan |
| `explainPriority()` | Detail Wilayah | Paragraf ringkas "Explain Priority" |
| `generateSimulatorNarration()` | Policy Simulator | Narasi perubahan ranking per mode kebijakan |
| `generateCitizenSummary()` | Public Transparency | Ringkasan bahasa awam untuk warga |

> ⚠️ **Disclaimer AI:** CivicSense AI pada prototype ini menggunakan rule-based template engine dari data proof of concept. Data berasal dari kombinasi data publik, data olahan, dan simulasi terbatas; beberapa indikator masih perlu validasi resmi.

---

## 📌 Catatan Data

```
CATATAN DATA PROTOTYPE

Prototype CIVICTWIN menggunakan kombinasi data publik, data olahan
dari sumber literatur, dan data simulasi terbatas untuk keperluan
proof of concept. Beberapa indikator menggunakan estimasi berbasis
laporan resmi yang disederhanakan.

Data tidak mewakili kondisi resmi Kota Semarang dan tidak boleh
digunakan sebagai dasar kebijakan nyata. Lihat halaman Metodologi
(Source Log) untuk status setiap data secara transparan.

Pada implementasi nyata, data harus bersumber dari:
- BPS Kota Semarang
- Portal Open Data Pemerintah Daerah
- Data OPD (Dinas Sosial, Kesehatan, PU, UMKM, dll.)
- Data BPBD Kota Semarang
- Kanal laporan/aduan warga resmi
- Regulasi SPBE (Perpres No. 95/2018) & Satu Data (Perpres No. 39/2019)
```

---

## 🗺 Pengembangan Berikutnya

Jika prototype ini dilanjutkan ke tahap produksi:

- [ ] **Integrasi Data Resmi** — Koneksi ke Open Data Semarang, BPS API, dan data OPD secara real-time
- [ ] **Validasi Bersama OPD** — Workshop dengan Bappeda, Diskominfo, dan dinas teknis
- [ ] **Dashboard Real-Time** — Pembaruan otomatis via IoT, sensor kota, dan kanal aduan warga
- [ ] **AI Policy Recommendation** — Integrasi LLM untuk narasi kebijakan yang lebih kontekstual
- [ ] **Audit Trail Keputusan** — Pencatatan historis perubahan bobot dan prioritas
- [ ] **Integrasi Kanal Aduan** — Sinkronisasi dengan LAPOR!, SP4N, dan aplikasi aduan lokal
- [ ] **Visualisasi Geospasial** — Heatmap prioritas di atas peta Semarang (Leaflet.js / Mapbox)
- [ ] **Autentikasi** — Pemisahan akses admin pemerintah vs. portal publik
- [ ] **Ekspor PDF** — Library `react-to-print` atau `jspdf` untuk ekspor Policy Brief

---

## 👥 Tim

| Nama | Peran |
|------|-------|
| **Hanif** | Prototype & Technology Lead — arsitektur sistem, pengembangan frontend, scoring engine, CivicSense AI |
| **Tata** | Administration & Research Support — riset indikator, koordinasi konten, dokumentasi |
| **Stella** | Administration Lead — manajemen administrasi lomba, presentasi, komunikasi |

---

## 📄 Lisensi

Prototype ini dibuat untuk keperluan **Lomba Smart City UNY 2026**.  
Tidak untuk didistribusikan atau digunakan sebagai produk komersial tanpa izin tim.

---

*CIVICTWIN Semarang Prototype Smart City · Lomba UNY 2026*  
*Data publik/olahan/simulasi terbatas · CivicSense AI (rule-based) · Bukan dokumen resmi pemerintah*
