# DOKUMENTASI TEKNIS: CIVICTWIN SEMARANG

**Sifat Dokumen:** Publik / Laporan Teknis Kompetisi
**Versi:** 1.1 (Prototype Proof of Concept)

---

## 1. Executive Summary

CIVICTWIN Semarang adalah prototype civic intelligence platform tingkat kecamatan. Sistem ini mengonsolidasikan indikator wilayah, risiko kebencanaan, kerentanan sosial, masukan warga, serta status tindak lanjut OPD menjadi dashboard pendukung keputusan yang interaktif, transparan, dan ramah audit.

Pada fase proof of concept, CIVICTWIN diposisikan sebagai Civic Intelligence Layer dan stepping stone menuju Spatial Digital Twin. Prototype belum menggunakan GIS boundary resmi, sensor IoT real-time, database produksi, atau integrasi OPD langsung.

## 2. Background Problem

Pemerintah kota sering menghadapi silo data antar-OPD. Laporan warga juga tidak selalu berbentuk keluhan; sebagian berupa kritik atas layanan, saran perbaikan, atau apresiasi terhadap kinerja OPD. Tanpa sistem klasifikasi dan akuntabilitas tindak lanjut, pimpinan kesulitan melihat prioritas wilayah, OPD kesulitan memilah respons, dan publik sulit memahami progres penanganan.

CIVICTWIN menjawab masalah ini dengan menyediakan satu lapisan intelijen yang menggabungkan skor wilayah, analisis feedback warga, simulasi kebijakan, policy brief, dan ringkasan publik.

## 3. Target Users & Role Access

Pada prototype, role access disimulasikan melalui sisi klien.

1. **Executive Viewer:** Meninjau Command Center, ranking wilayah, akuntabilitas tindak lanjut, dan policy brief.
2. **Policy Analyst / Bappeda:** Menjalankan Policy Simulator untuk menguji fokus kebijakan.
3. **OPD Operator:** Melihat masukan warga, klasifikasi CivicSense, rekomendasi OPD, dan laporan penyelesaian.
4. **Kecamatan / Kelurahan:** Melakukan validasi lapangan untuk hotspot, feedback wilayah, dan tindak lanjut OPD.
5. **Public Viewer:** Mengakses ringkasan transparansi publik tanpa data pribadi warga.

## 4. System Overview

CIVICTWIN bertindak sebagai Intelligence Layer di atas ekosistem data kota. Dalam implementasi nyata, sistem ini dapat menerima data dari Satu Data Semarang, SP4N-LAPOR!, BPS, BPBD, Dishub, dan OPD teknis lain. Pada prototype, semua data masih berupa kombinasi data publik, data olahan, dan simulasi mock.

## 5. Main Features

- **Role-Based Demo Access:** Simulasi peran pengguna untuk skenario demo.
- **Command Center Dashboard:** Ringkasan indikator kota, peta prioritas, ranking wilayah, narasi CivicSense, dan resolution accountability.
- **Priority Map Semarang:** Pemetaan prioritas wilayah berbasis marker prototype.
- **Citizen Feedback Intelligence:** Pengelompokan 32 masukan warga menjadi Keluhan, Kritik, Saran, dan Apresiasi.
- **CivicSense AI Triage:** Klasifikasi awal, alasan klasifikasi, urgensi, rekomendasi OPD, status, dan catatan validasi.
- **Issue Hotspots:** Titik masalah spasial untuk drill-down tingkat kecamatan.
- **Resolution Accountability:** Enam laporan penyelesaian OPD dengan status validasi, bukti sebelum-sesudah, kendala lapangan, dan ringkasan publik.
- **Policy Simulator:** Simulasi perubahan bobot kebijakan dan dampaknya terhadap ranking prioritas intervensi.
- **AI-assisted Policy Brief:** Draf ringkasan kebijakan otomatis berdasarkan mode analisis dan data wilayah.
- **Public Transparency Page:** Ringkasan prioritas wilayah dan tindak lanjut OPD yang telah disaring untuk publik.
- **Methodology & Governance:** Penjelasan data, rumus scoring, inversi indikator, batasan prototype, dan guardrail AI.

## 6. Data Architecture

Data prototype terdiri dari:

- **Data wilayah:** Nama kecamatan, koordinat centroid prototype, indikator wilayah, dominant issues, dan rekomendasi kebijakan.
- **Citizen feedback:** 32 data simulasi masukan warga, terdiri dari 18 Keluhan, 6 Kritik, 4 Saran, dan 4 Apresiasi.
- **Completion reports:** 6 laporan penyelesaian OPD, terdiri dari status Selesai Tervalidasi, Diajukan untuk Validasi, Perlu Revisi Tindak Lanjut, dan Draft OPD.
- **Hotspots:** Titik masalah spasial simulasi untuk mendukung demo interaktif.
- **Rule-based intelligence:** Fungsi CivicSense untuk insight, narasi simulator, citizen summary, dan policy brief.

Tidak ada data pribadi warga asli di dalam repository.

## 7. Priority Score Method

Priority Score berada pada level kecamatan dan menggunakan weighted average dari enam indikator:

- Kepadatan Penduduk
- Risiko Banjir/Rob
- Akses Layanan Publik
- Kerentanan Sosial
- Volume Laporan Warga
- Aktivitas UMKM

Catatan penting: Akses Layanan Publik dan Aktivitas UMKM menggunakan logika inversi pada mode tertentu. Nilai rendah pada dua indikator tersebut dapat berarti kebutuhan intervensi lebih tinggi. Karena itu, ranking simulator harus dibaca sebagai ranking prioritas intervensi, bukan ranking wilayah terbaik.

## 8. Emergency Review Score & Report Urgency

Terdapat dua level kedaruratan:

- **Report Urgency:** Melekat pada feedback/laporan warga individual dengan kategori Rendah, Sedang, Tinggi, atau Kritis.
- **Emergency Review Score:** Melekat pada kecamatan, menggabungkan sinyal risiko, laporan terverifikasi, paparan penduduk, fasilitas kritis, dan kerentanan sosial.

Keduanya adalah alat bantu prioritisasi awal, bukan dasar keputusan final.

## 9. Citizen Feedback Intelligence

Modul ini mengubah konsep laporan warga menjadi spektrum feedback publik:

- **Keluhan:** Masalah yang membutuhkan respons teknis atau operasional.
- **Kritik:** Evaluasi negatif terhadap layanan, koordinasi, atau transparansi.
- **Saran:** Aspirasi perbaikan atau ide kebijakan.
- **Apresiasi:** Respons positif warga terhadap tindak lanjut atau layanan.

CivicSense menampilkan alasan klasifikasi, parameter klasifikasi, interpretasi publik, OPD tujuan, dan rekomendasi awal. Keluhan dan kritik dipakai sebagai sinyal prioritas penanganan, sedangkan saran dan apresiasi menjadi konteks persepsi publik.

## 10. Resolution Accountability

Modul baru `completionReports.ts` mensimulasikan akuntabilitas tindak lanjut OPD. Data yang ditampilkan meliputi:

- ID laporan warga terkait.
- OPD penanggung jawab.
- Tindakan yang dilakukan.
- Waktu mulai dan selesai.
- Label bukti sebelum-sesudah.
- Kendala lapangan.
- Status penyelesaian.
- Status validasi.
- Ringkasan publik.

Dashboard, Region Detail, dan Public Transparency menggunakan data ini untuk menampilkan metrik penyelesaian, rata-rata hari penyelesaian, dan resolution rate. Semua bukti dan status masih simulasi POC.

## 11. CivicSense Policy Assistant

CivicSense adalah assistant rule-based internal, bukan LLM eksternal. Fungsi utamanya:

- Menghasilkan insight wilayah.
- Menjelaskan ranking simulator.
- Menyusun draf policy brief.
- Membuat ringkasan publik.
- Membantu klasifikasi awal feedback warga.

CivicSense tidak mengambil keputusan otomatis. Seluruh output harus divalidasi manusia dan OPD terkait.

## 12. AI Governance & Legal Guardrail

Pilar tata kelola:

- **Human-in-the-loop:** Keputusan final tetap berada pada pejabat atau petugas berwenang.
- **No black-box external API:** Tidak ada panggilan API AI eksternal untuk menghindari risiko kebocoran data.
- **Audit-friendly:** Rumus scoring, status data, dan batasan prototype ditampilkan di halaman Methodology.
- **Privacy by design:** Data pribadi pelapor tidak digunakan pada prototype dan tidak ditampilkan pada halaman publik.

## 13. Public Transparency Mechanism

Halaman publik menampilkan ringkasan yang aman:

- Ranking prioritas wilayah.
- Alasan prioritas dalam bahasa warga.
- Penjelasan indikator.
- Ringkasan isu kota.
- Statistik penyelesaian OPD yang bersifat agregat.
- Ringkasan publik dari laporan yang ditandai aman untuk dilihat publik.

Data sensitif, identitas pelapor, dan detail internal OPD tidak ditampilkan.

## 14. Technical Architecture

- **Framework:** React 18
- **Language:** TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Map:** Leaflet + React Leaflet
- **Icons:** Lucide React
- **Data layer:** Local TypeScript mock data
- **AI layer:** Rule-based CivicSense utilities

## 15. Limitations

1. Data tidak real-time dan tidak berasal dari API resmi operasional.
2. Role authentication masih simulasi `localStorage`.
3. Peta belum menggunakan polygon GIS resmi.
4. Tidak ada persistence database.
5. Laporan warga, hotspot, dan laporan penyelesaian OPD adalah data simulasi.
6. Policy brief adalah draf awal dan bukan dokumen resmi pemerintah.

## 16. Future Development Roadmap

1. Integrasi API Satu Data Semarang, BPS, BPBD, Dishub, dan SP4N-LAPOR!.
2. Backend authentication dan RBAC produksi.
3. Audit trail untuk validasi OPD dan perubahan status laporan.
4. Upload bukti penyelesaian dengan metadata, verifikasi lokasi, dan masking data sensitif.
5. Integrasi GIS boundary resmi.
6. Dashboard operasional untuk SLA tindak lanjut OPD.
7. CivicSense server-side dengan guardrail hukum yang lebih lengkap.
8. Pengembangan menuju real-time spatial digital twin.

## 17. Demo Instructions

1. Jalankan `npm install`.
2. Jalankan `npm run dev`.
3. Buka landing page `/`.
4. Masuk ke mode demo melalui `/login`.
5. Tunjukkan Command Center, peta prioritas, dan panel akuntabilitas tindak lanjut.
6. Buka Reports untuk menunjukkan klasifikasi Keluhan, Kritik, Saran, dan Apresiasi.
7. Drill-down ke Region Detail untuk melihat feedback wilayah dan laporan penyelesaian OPD.
8. Jalankan Policy Simulator dan jelaskan ranking prioritas intervensi.
9. Tunjukkan Policy Brief dan disclaimer validasi.
10. Tutup dengan Public Transparency dan Methodology.
