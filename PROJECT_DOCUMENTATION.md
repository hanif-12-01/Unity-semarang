# DOKUMENTASI TEKNIS: CIVICTWIN SEMARANG

**Sifat Dokumen:** Publik / Laporan Teknis Kompetisi
**Versi:** 1.0 (Prototipe Proof of Concept)

---

## 1. Executive Summary
CIVICTWIN Semarang adalah sebuah purwarupa (prototipe) platform intelijen tata kelola pemerintahan (*civic intelligence platform*) berbasis *digital twin* tingkat kecamatan. Sistem ini didesain sebagai instrumen pendukung keputusan (*decision support system*) lintas instansi, yang mampu mengonsolidasikan indikator statistik demografis, risiko kebencanaan, kerentanan sosial, serta agregasi keluhan masyarakat menjadi sebuah matriks prioritas spasial yang interaktif dan transparan.

## 2. Background Problem
Pembangunan wilayah administratif dan respons terhadap krisis sering terhambat oleh arsitektur silo data antar-Organisasi Perangkat Daerah (OPD). Ketika laporan masyarakat membeludak melalui kanal pengaduan tanpa adanya klasifikasi urgensi spasial, pimpinan daerah akan kesulitan menentukan skala prioritas intervensi. Lebih jauh, simulasi penyesuaian regulasi (seperti reposisi anggaran musrenbang) memerlukan kalkulasi yang memakan waktu dan rumit untuk dikomunikasikan secara transparan kepada masyarakat umum tanpa melanggar kerahasiaan data negara.

## 3. Target Users & Role Access
Platform ini dirancang dengan konsep *Role-Based Access Control* (RBAC). Pada fase purwarupa ini, otorisasi dioperasikan melalui mekanisme *session* simulasi, yang meliputi:
1. **Executive Viewer (Pimpinan Daerah):** Akses tingkat atas untuk meninjau *Command Center*, membaca *Policy Brief*, dan melihat kalkulasi ringkasan kota secara menyeluruh.
2. **Policy Analyst / Bappeda:** Akses bagi analis perencana untuk mengeksekusi parameter *Policy Simulator* guna memprediksi dampak perubahan fokus regulasi.
3. **OPD Operator:** Akses khusus kedinasan untuk merespons, memvalidasi, dan mengklasifikasi keluhan warga pada dasbor *Citizen Reports*.
4. **Kecamatan / Kelurahan:** Akses validasi lapangan granular terhadap *Issue Hotspots* pada level wilayah administratif terendah.
5. **Public Viewer:** Akses terbuka bagi masyarakat sipil untuk meninjau status pelaporan dan kinerja wilayah pada *Public Transparency Page* tanpa mengekspos data pribadi (PII).

## 4. System Overview
Secara konseptual, sistem ini bertindak sebagai "Lapisan Intelijen" (*Intelligence Layer*) di atas ekosistem data yang sudah ada (seperti Satu Data Semarang dan SP4N-LAPOR!). CIVICTWIN tidak menggantikan sistem pelaporan pelapor asli, melainkan menghisap (*ingest*) datanya, memproses melalui *rule-based engine*, dan menampilkannya sebagai pemetaan visual (GIS-based) interaktif bagi para penentu kebijakan.

## 5. Main Features
- **Role-Based Demo Access:** Modul perpindahan antar-peran fungsional pemerintah.
- **Command Center Dashboard:** Panel agregasi utama untuk memantau performa wilayah, sinyal kebencanaan, dan ringkasan eksekutif.
- **Priority Map Semarang:** Antarmuka pemetaan geografis berbasis piktogram warna (*heat/priority mapping*).
- **Issue Hotspots:** Pemetan detail geolokasi titik masalah spesifik pada setiap kecamatan.
- **Disaster Signal Monitor:** Indikator pemantauan kedaruratan berbasis matriks *Emergency Review Score*.
- **Policy Simulator:** Modul kalkulator pengubah bobot (*slider*) prioritas (Misal: Infrastruktur vs. Ekonomi) yang secara instan merombak nilai seluruh kecamatan.
- **AI-assisted Policy Brief:** Modul asisten pengonversi draf *policy brief* secara otomatis berdasarkan data kuantitatif pasca-simulasi.
- **Public Transparency Page:** Katalog pencapaian pemerintah dengan sistem anonimasi pelapor.

## 6. Data Architecture
Data yang disajikan pada arsitektur purwarupa ini merupakan penggabungan hibrida:
- **Data Statik Turunan Resmi:** Meliputi daftar kecamatan, luas wilayah, kepadatan penduduk (disarikan dari BPS/Satu Data).
- **Data Olahan Historis:** Rekaman historis kerentanan rob/banjir pesisir.
- **Data Simulasi Murni (Mock):** Data laporan masyarakat individual, sebaran titik koordinat presisi *hotspots*, serta interaksi API *real-time*.

*(Catatan: Segala representasi koordinat geografis di peta masih mengacu pada titik sentroid simulasi).*

## 7. Priority Score Method
*Priority Score* adalah angka komposit (0–100) yang merepresentasikan seberapa mendesak suatu kecamatan untuk mendapatkan intervensi reguler dari pemerintah.
Rumusan perhitungannya menggunakan skema *weighted average* terhadap indikator inti:
- **Kepadatan Penduduk** (Struktural)
- **Risiko Banjir/Rob** (Lingkungan)
- **Akses Layanan Dasar** (Infrastruktur)
- **Kerentanan Sosial** (Sosiologis)
- **Volume Laporan Masyarakat** (Reaksioner)
Bobot ini dapat digeser secara dinamis menggunakan *Policy Simulator* berdasarkan Rencana Pembangunan Jangka Menengah Daerah (RPJMD) yang sedang berlangsung.

## 8. Emergency Review Score Method
Berbeda dengan prioritas reguler, *Emergency Review Score* (1–5) diterapkan pada laporan aduan (*Citizen Reports*) untuk mengategorisasikan urgensi lapangan.
- Skor tinggi (4-5) menandakan krisis yang mengancam keselamatan nyawa atau infrastruktur esensial secara langsung (seperti tanggul jebol atau pohon tumbang memblokir jalan utama).
- Skor rendah (1-2) merepresentasikan pengaduan rutin (misal: pelayanan sipil lambat).

## 9. Citizen Report Intelligence
Modul ini bertugas menerima laporan teks tidak terstruktur dari warga dan melakukan *parsing* kategori. Pada praktiknya, ia melakukan:
- Pengelompokan taksonomi masalah (Infrastruktur, Sosial, Kesehatan, Lingkungan).
- Penetapan status pengerjaan (Baru, Peninjauan, Proses Tindakan, Selesai).
- Pendelegasian (*Routing*) usulan kepada dinas teknis (OPD) yang paling relevan.

## 10. CivicSense Policy Assistant
CivicSense adalah asisten algoritmik *rule-based* internal yang memfasilitasi pembuatan ringkasan.
**Fungsi:** 
Membaca keluaran *Priority Score* dan *Emergency Score*, memilah kalimat baku terprogram (*templating logic*), lalu menyusunnya menjadi draf *Policy Brief*, *Citizen Summary*, maupun rekomendasi tindak lanjut bagi OPD.

## 11. AI Governance & Legal Guardrail
**Pilar Tata Kelola AI CIVICTWIN:**
- **Human-in-the-Loop:** Kecerdasan buatan CivicSense memposisikan diri sebatas *Decision Support* (Peringkas dan Klasifikator Awal), **Bukan** *Decision Maker*. Keputusan final penentuan anggaran dan penindakan hukum harus diverifikasi dan disetujui secara manual oleh pimpinan institusi.
- **No Black-Box API:** Demi mematuhi prinsip kedaulatan data dan UU Pelindungan Data Pribadi (PDP), sistem asisten ini 100% bergantung pada logika heuristik internal dan *rule-based scripting*. Sistem **tidak** melakukan panggilan API eksternal (seperti OpenAI ChatGPT) untuk mencegah kebocoran PII warga.

## 12. Public Transparency Mechanism
Transparansi bukan berarti ketelanjangan data. Laman Publik dirancang untuk memisahkan data sensitif:
- Masyarakat hanya melihat angka agregat performa kecamatan.
- Daftar keluhan (*issue list*) yang ditampilkan hanyalah deskripsi masalah umum. Nama pengirim, Nomor Induk Kependudukan (NIK), serta kontak individu dianonimkan (tidak ditarik oleh komponen React ke peramban).

## 13. Technical Architecture
Tumpukan teknologi yang membangun platform ini:
- **Framework Utama:** React (versi >=18)
- **Bahasa Pemrograman:** TypeScript untuk integritas tipe statis (*type safety*)
- **Build Tool:** Vite.js
- **Styling:** Tailwind CSS (dengan *custom token palette*)
- **Routing:** React Router DOM (v6)
- **Geospasial:** Leaflet JS + React Leaflet
- **Ikonografi:** Lucide React

## 14. Limitations
Sebagai *Proof of Concept* (POC), terdapat keterbatasan:
1. Data tidak disuplai melalui API *Real-Time* (statik).
2. Mekanisme masuk/keluar (*Role Authentication*) hanya merupakan simulasi sisi-klien (*localStorage*).
3. Peta belum menginkorporasikan poligon garis batas administratif resmi tingkat kelurahan (.shp/.geojson).
4. Tidak ada penyimpanan modifikasi basis data berkelanjutan (*persistence*), semua perubahan di-reset saat aplikasi disegarkan (*refresh*).

## 15. Future Development Roadmap
Apabila prototipe ini disetujui untuk diteruskan ke tahap produksi (*production grade*):
1. Pengaturan integrasi layanan mikro (*Microservices API*) dengan portal Satu Data dan SP4N-LAPOR!.
2. Implementasi Sistem Autentikasi Nasional terpusat (SSO/OAuth2) dan *Role-Based Access Control* (RBAC) pada sisi *Backend*.
3. Sistem Audit Jejak Aktivitas (*Audit Trail*) untuk mengamankan rekam validasi setiap ASN.
4. Integrasi *Polygon Map* dari BIG atau portal spasial daerah bersangkutan.
5. Pemasangan Pagar Pembatas AI (*AI Legal Guardrails*) berskala peladen (*server-side*).

## 16. Demo Instructions
Untuk mengeksekusi simulasi CIVICTWIN dalam skenario presentasi:
1. Pastikan dependensi telah terinstal: `npm install`
2. Jalankan aplikasi di lingkungan pengembangan: `npm run dev`
3. Mulai dengan navigasi ke halaman `Landing Page` (`/`).
4. Klik tombol **"Masuk Mode Demo"** dan pilih profil otoritas (Contoh: *Executive Viewer*).
5. Pada *Dashboard*, arahkan perhatian juri ke perubahan Peta Interaktif.
6. Ajak pemirsa mencoba **"Policy Simulator"** untuk melihat kapabilitas adaptif algoritma.
7. Tinjau *Policy Brief* dan diakhiri dengan simulasi warga di *Public Transparency Page*.
