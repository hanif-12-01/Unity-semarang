# CIVICTWIN Semarang

CIVICTWIN Semarang adalah civic intelligence platform tingkat kecamatan untuk membantu pemerintah kota membaca prioritas wilayah, mengolah masukan warga, memantau tindak lanjut OPD, mensimulasikan kebijakan, dan membuka ringkasan transparansi publik.

Pada fase proof of concept, CIVICTWIN diposisikan sebagai Civic Intelligence Layer dan stepping stone menuju Spatial Digital Twin. Prototype ini belum menggunakan GIS boundary resmi, sensor IoT real-time, backend produksi, atau integrasi data OPD langsung.

## Problem Statement

Pembangunan dan pengambilan kebijakan kota sering terhambat oleh:

- Data kota yang tersebar di berbagai instansi dan format.
- Masukan warga yang tidak hanya berupa keluhan, tetapi juga kritik, saran, dan apresiasi yang perlu diklasifikasi.
- Kebutuhan pimpinan untuk melihat prioritas wilayah secara cepat, transparan, dan ramah audit.
- Kebutuhan OPD untuk menunjukkan tindak lanjut yang dapat divalidasi tanpa mengekspos data pribadi warga.

## Fitur Utama

1. **Role-Based Demo Access**: Simulasi akses berdasarkan peran Executive, Analyst, OPD, Kecamatan, dan Public.
2. **Command Center Dashboard**: Ringkasan kota, ranking wilayah, peta prioritas, dan panel akuntabilitas tindak lanjut.
3. **Priority Map Semarang**: Representasi spasial interaktif berbasis marker wilayah prototype.
4. **Citizen Feedback Intelligence**: Analisis 32 masukan warga yang dibagi menjadi Keluhan, Kritik, Saran, dan Apresiasi.
5. **CivicSense AI Triage Assistant**: Klasifikasi awal jenis masukan, urgensi, OPD tujuan, alasan klasifikasi, dan catatan validasi.
6. **Issue Hotspots per Kecamatan**: Pemetaan titik panas isu lokal untuk drill-down wilayah.
7. **Resolution Accountability**: Simulasi laporan penyelesaian OPD, status validasi, bukti sebelum-sesudah, dan ringkasan publik.
8. **Policy Simulator**: Simulasi fokus kebijakan dan perubahan ranking prioritas intervensi wilayah.
9. **AI-assisted Policy Brief**: Generator draf policy brief berbasis data wilayah dan mode analisis.
10. **Public Transparency Page**: Ringkasan publik wilayah prioritas, penjelasan indikator, dan status tindak lanjut yang telah dianonimkan.
11. **Methodology & AI Governance Guardrail**: Dokumentasi scoring, inversi indikator, status data, batasan AI, dan disclaimer prototype.

## Pembaruan Saat Ini

- Modul laporan diperluas menjadi **Citizen Feedback Intelligence**.
- Dataset mock berisi 32 masukan warga: 18 Keluhan, 6 Kritik, 4 Saran, dan 4 Apresiasi.
- Setiap masukan memiliki `feedbackType`, pernyataan warga, parameter klasifikasi, interpretasi publik, rekomendasi OPD, dan catatan validasi.
- Ditambahkan `completionReports.ts` berisi 6 laporan penyelesaian OPD untuk simulasi akuntabilitas tindak lanjut.
- Dashboard, Detail Wilayah, dan Public Transparency kini menampilkan metrik penyelesaian: tervalidasi, menunggu validasi, perlu revisi, draft, rata-rata hari penyelesaian, dan resolution rate.
- Policy Simulator diperjelas sebagai ranking prioritas intervensi, bukan peringkat wilayah terbaik.
- Policy Brief dan metodologi menampilkan catatan inversi untuk indikator Akses Layanan Publik dan Aktivitas UMKM.

## Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Leaflet + React Leaflet
- Lucide React
- Rule-based CivicSense Policy Assistant
- Local mock/prototype data

## Batasan Implementasi

- Tidak menggunakan backend auth sungguhan.
- Role access masih berupa simulasi demo berbasis `localStorage`.
- Tidak menggunakan database eksternal.
- Tidak menggunakan API AI eksternal.
- Data laporan warga, penyelesaian OPD, hotspot, dan koordinat detail adalah data simulasi POC.
- Peta menggunakan marker centroid prototype, bukan boundary GIS resmi.
- Sistem dan data di dalamnya tidak boleh dipakai sebagai dasar kebijakan nyata tanpa validasi resmi OPD/petugas lapangan.

## Cara Menjalankan Aplikasi

Pastikan Node.js sudah terinstal.

1. Instal dependensi:

   ```bash
   npm install
   ```

2. Jalankan server pengembangan:

   ```bash
   npm run dev
   ```

3. Build produksi:

   ```bash
   npm run build
   ```

4. Preview hasil build:

   ```bash
   npm run preview
   ```

## Struktur Folder Relevan

```text
src/
|-- assets/
|   |-- brand/
|   |   |-- civictwin-logo.png
|-- components/
|   |-- map/
|   |   |-- SemarangPriorityMap.tsx
|   |-- ui/
|-- data/
|   |-- completionReports.ts
|   |-- citizenReports.ts
|   |-- mockData/
|-- layout/
|   |-- AppLayout.tsx
|-- pages/
|   |-- CitizenReportsPage.tsx
|   |-- DashboardPage.tsx
|   |-- LandingPage.tsx
|   |-- LoginPage.tsx
|   |-- MethodologyPage.tsx
|   |-- PolicyBriefPage.tsx
|   |-- PolicySimulatorPage.tsx
|   |-- PublicTransparencyPage.tsx
|   |-- RegionDetailPage.tsx
|-- utils/
|   |-- civicSenseAI.ts
|   |-- policyBrief.ts
|   |-- scoring.ts
```

## Demo Flow

1. **Login / Role Selection**: Pilih peran demo.
2. **Command Center Dashboard**: Lihat ranking wilayah, peta prioritas, sinyal kota, dan akuntabilitas tindak lanjut.
3. **Citizen Feedback Intelligence**: Tunjukkan klasifikasi Keluhan, Kritik, Saran, Apresiasi, serta filter dan triage CivicSense.
4. **Region Detail**: Drill-down ke kecamatan, komposisi feedback, issue hotspots, dan laporan penyelesaian OPD.
5. **Policy Simulator**: Ubah fokus kebijakan dan jelaskan perubahan ranking prioritas intervensi.
6. **AI-assisted Policy Brief**: Tampilkan draf policy brief dan catatan validasi manusia.
7. **Public Transparency**: Tunjukkan ringkasan prioritas dan tindak lanjut yang aman untuk publik.
8. **Methodology & Governance**: Jelaskan rumus, bobot, inversi indikator, status data, dan AI guardrail.

## CivicSense AI

CivicSense adalah assistant internal berbasis rule-based template, bukan LLM eksternal.

Fungsi utama:

- Klasifikasi awal masukan warga.
- Ringkasan dan alasan klasifikasi.
- Rekomendasi OPD dan tindak lanjut.
- Narasi simulasi kebijakan.
- Draf policy brief.
- Ringkasan publik dalam bahasa warga.

Tegasan penggunaan:

- CivicSense bukan pengambil keputusan akhir.
- Output wajib divalidasi OPD/petugas terkait.
- Tidak menggunakan API AI eksternal.

## Catatan Data

- Seluruh angka dan metrik merupakan kombinasi data publik, data olahan, dan simulasi terbatas.
- Masukan warga dan laporan penyelesaian OPD adalah mock data untuk proof of concept.
- Tidak ada data pribadi warga asli.
- Pada implementasi nyata, sistem perlu bridging ke sumber resmi seperti BPS, Satu Data Semarang, SP4N-LAPOR!, dan data OPD.

## Roadmap

- Integrasi pipeline data resmi BPS / OPD / BPBD / Dishub dan sensor IoT.
- Integrasi kanal laporan resmi seperti SP4N-LAPOR!.
- Validasi lapangan untuk laporan, hotspot, dan bukti penyelesaian.
- Backend auth dan RBAC produksi.
- Audit trail untuk aktivitas OPD dan validasi lapangan.
- Integrasi polygon GIS boundary resmi.
- Penguatan CivicSense dengan guardrail hukum dan tata kelola AI server-side.
- Pengembangan menuju real-time spatial digital twin.
