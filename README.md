# CIVICTWIN Semarang

CIVICTWIN Semarang adalah civic intelligence platform tingkat kecamatan untuk membantu pemerintah kota membaca prioritas wilayah, laporan masyarakat, simulasi kebijakan, dan transparansi publik.

Pada fase proof of concept, CIVICTWIN diposisikan sebagai Civic Intelligence Layer dan stepping stone menuju Spatial Digital Twin. Prototype ini belum menggunakan GIS boundary resmi, sensor IoT real-time, atau integrasi data OPD langsung.

## Problem Statement

Pembangunan dan pengambilan kebijakan di tingkat kota sering kali dihadapkan pada berbagai tantangan operasional dan analitik:
- Data kota tersebar di berbagai instansi dan format yang menyulitkan agregasi cepat.
- Laporan masyarakat membeludak dan sulit diprioritaskan secara lintas Organisasi Perangkat Daerah (OPD).
- Pengambilan keputusan terkait alokasi sumber daya wilayah membutuhkan dasar data yang kuat dan transparan.
- Pemerintah membutuhkan sistem pendukung keputusan (*decision-support*) yang legal, ramah audit (*audit-friendly*), dan mudah dikomunikasikan baik ke pimpinan maupun publik.

## Fitur Utama

1. **Role-Based Demo Access**: Simulasi akses platform berdasarkan peran pengguna (Executive, Analyst, OPD, Kecamatan, Public).
2. **Command Center Dashboard**: Tampilan terpusat berbasis grid untuk memantau metrik kota.
3. **Priority Map Semarang**: Representasi spasial interaktif berbasis peta wilayah kota.
4. **Citizen Report Intelligence**: Agregasi dan analisis sentimen serta urgensi laporan masyarakat.
5. **Issue Hotspots per Kecamatan**: Pemetaan titik panas isu lokal pada level granular.
6. **Disaster Signal Monitor**: Sistem pemantauan peringatan dini untuk kebencanaan.
7. **Policy Simulator**: Simulasi dampak perubahan prioritas kebijakan terhadap skor indeks wilayah.
8. **AI-assisted Policy Brief**: Penyusunan otomatis ringkasan rekomendasi kebijakan untuk pimpinan.
9. **Public Transparency Page**: Laman khusus publik yang menyajikan metrik kota secara aman tanpa mengekspos data sensitif.
10. **Methodology & AI Governance Guardrail**: Dokumentasi metodologi perhitungan skor dan pagar pengaman (*guardrails*) untuk integritas AI.

## Tech Stack

Proyek ini dibangun menggunakan teknologi modern antarmuka web:
- React
- TypeScript
- Vite
- Tailwind CSS (Palette Central Java / Semarang: Ivory, Muted Teal, Sogan Charcoal, Terracotta)
- React Router
- Leaflet + React Leaflet
- Lucide React (Ikonografi tanpa emoji)
- Rule-based CivicSense Policy Assistant
- Local mock/prototype data

## Batasan Implementasi (Prototype)

Mengingat proyek ini berfokus pada *proof of concept* UI/UX dan interaksi intelijen data:
- Tidak menggunakan backend auth sungguhan.
- Role access masih berupa simulasi demo berbasis `localStorage`.
- Tidak menggunakan database eksternal.
- Tidak menggunakan API AI eksternal (mengandalkan pemrosesan internal berbasis *rule*).
- Tidak menggunakan data pribadi warga asli.

## Cara Menjalankan Aplikasi

Pastikan Anda memiliki [Node.js](https://nodejs.org/) terinstal.

1. Instalasi dependensi:
   ```bash
   npm install
   ```
2. Menjalankan server pengembangan:
   ```bash
   npm run dev
   ```
3. Membangun (*build*) untuk produksi:
   ```bash
   npm run build
   ```
4. Meninjau hasil *build*:
   ```bash
   npm run preview
   ```

## Struktur Folder Relevan

Struktur repositori berfokus pada modularisasi antarmuka dan *mocking* intelijen. Beberapa berkas esensial meliputi:

```text
src/
├── assets/
│   └── brand/
│       └── civictwin-logo.png
├── components/
│   └── map/
│       └── SemarangPriorityMap.tsx
├── data/
│   ├── mockData/
│   └── citizenReports.ts
├── layout/
│   └── AppLayout.tsx
├── pages/
│   ├── CitizenReportsPage.tsx
│   ├── DashboardPage.tsx
│   ├── LandingPage.tsx
│   ├── LoginPage.tsx
│   ├── MethodologyPage.tsx
│   ├── PolicyBriefPage.tsx
│   ├── PolicySimulatorPage.tsx
│   ├── PublicTransparencyPage.tsx
│   └── RegionDetailPage.tsx
└── utils/
    └── civicSenseAI.ts
```

## Demo Flow

Berikut adalah urutan navigasi yang direkomendasikan untuk presentasi/demo:

1. **Login / Role Selection**: Mensimulasikan pilihan peran aktor.
2. **Command Center Dashboard**: Memperlihatkan antarmuka intelijen utama.
3. **Priority Map Semarang**: Eksplorasi tata letak geospasial prioritas.
4. **Citizen Reports**: Manajemen intelijen laporan masyarakat.
5. **Detail Wilayah + Issue Hotspots**: Peninjauan *drilled-down* pada spesifik kecamatan.
6. **Policy Simulator**: Penyesuaian parameter simulasi skor.
7. **AI-assisted Policy Brief**: Pembuatan naskah kebijakan instan.
8. **Public Transparency**: Sudut pandang transparansi untuk warga.
9. **Methodology & Governance Guardrail**: Penjabaran integritas data dan kecerdasan buatan.

## CivicSense AI

**CivicSense** adalah *policy/report assistant* internal yang diimplementasikan melalui sistem *rule-based template*, bukan LLM eksternal.

**Fungsi utama:**
- Klasifikasi awal laporan
- Ringkasan laporan
- Rekomendasi pendelegasian OPD
- Policy brief draft
- Citizen summary
- Simulator narration

**Tegasan Penggunaan:**
- CivicSense **bukan** pengambil keputusan akhir (*decision maker*).
- Output dari asisten wajib melalui validasi OPD terkait.
- Tidak menggunakan API AI eksternal sama sekali.

## Catatan Data

- Seluruh angka dan metrik yang digunakan di sini merupakan campuran dari **data publik, olahan kasual, dan simulasi terbatas**.
- Entitas laporan masyarakat adalah simulasi *mock-up*.
- Koordinat/lokasi hotspot lokasi murni simulasi POC.
- Peta menggunakan penanda (*marker*) *centroid prototype*, bukan *boundaries* GIS resmi.
- Sistem beserta data di dalamnya **tidak boleh** dipakai sebagai dasar kebijakan nyata tanpa adanya validasi data lapangan yang riil.

## Roadmap

Untuk pengembangan platform nyata di masa depan:
- Integrasi *pipeline* data resmi BPS / OPD / BPBD / Dishub dan sensor IoT.
- Integrasi kanal laporan resmi (seperti Lapor!).
- Validasi lapangan untuk laporan dan hotspot.
- Autentikasi dan otorisasi *role-based* sungguhan.
- Pencatatan aktivitas (*Audit trail*) untuk akuntabilitas.
- Integrasi layanan *polygon GIS boundary* resmi untuk kecamatan dan kelurahan.
- Integrasi *AI policy assistant* sesungguhnya namun dilengkapi *guardrail* hukum yang kuat.
- Mewujudkan *real-time spatial digital twin* yang beroperasi secara penuh.
