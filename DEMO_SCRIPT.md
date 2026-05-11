# Panduan Presentasi Demo CIVICTWIN Semarang

**Durasi optimal:** 5-7 menit
**Tujuan:** Mendemonstrasikan kapabilitas prototype secara jujur, runtut, dan tidak overclaim.

---

## 1. Opening (30 detik)

**Tindakan:** Tampilkan Landing Page.

**Narasi presenter:**

"Selamat pagi Dewan Juri. Dalam pengelolaan kota, pimpinan sering terhambat oleh data sektoral yang tersebar. Laporan warga juga tidak selalu mudah dibaca sebagai prioritas, karena ada keluhan, kritik, saran, dan apresiasi yang masuk dari berbagai wilayah. CIVICTWIN Semarang kami hadirkan sebagai civic intelligence layer untuk membantu pemerintah melihat prioritas wilayah, memahami suara warga, dan membuka ringkasan akuntabilitas yang aman untuk publik."

## 2. Product Positioning (30 detik)

**Tindakan:** Arahkan ke tombol masuk demo.

**Narasi presenter:**

"Pada fase proof of concept ini, CIVICTWIN belum kami klaim sebagai digital twin penuh. Ia adalah stepping stone menuju spatial digital twin: sebuah lapisan intelijen yang menggabungkan data wilayah, masukan warga, simulasi kebijakan, dan tindak lanjut OPD dalam satu platform pendukung keputusan."

---

## 3. Demo Flow (5-7 menit)

### A. Login / Role Selection

**Tindakan:** Klik "Masuk Mode Demo" untuk membuka `/login`, lalu pilih Executive Viewer.

**Penjelasan:** Menunjukkan bahwa sistem dirancang untuk multi-aktor.

**Narasi presenter:**

"CIVICTWIN dirancang untuk banyak aktor: pimpinan daerah, analis kebijakan, operator OPD, kecamatan, dan publik. Pada demo ini kita masuk sebagai Executive Viewer agar bisa melihat gambaran kota secara menyeluruh."

### B. Command Center Dashboard

**Tindakan:** Masuk ke Dashboard. Sorot statistik kota, peta prioritas, ranking wilayah, dan panel akuntabilitas tindak lanjut.

**Narasi presenter:**

"Di Command Center, data tidak ditampilkan sebagai angka mentah saja. Sistem merangkum prioritas kecamatan, menampilkan peta prioritas, dan memperlihatkan sinyal wilayah mana yang perlu intervensi. Pada pembaruan terbaru, dashboard juga menampilkan Resolution Accountability, yaitu ringkasan simulasi tindak lanjut OPD: berapa yang sudah tervalidasi, menunggu validasi, perlu revisi, dan rata-rata waktu penyelesaian."

### C. Citizen Feedback Intelligence

**Tindakan:** Klik menu Reports. Tunjukkan kartu ringkasan Keluhan, Kritik, Saran, Apresiasi, filter, dan daftar masukan.

**Narasi presenter:**

"Menu Reports sekarang tidak hanya membaca laporan sebagai keluhan. Ada empat jenis feedback: Keluhan, Kritik, Saran, dan Apresiasi. CivicSense membantu klasifikasi awal, memberi alasan klasifikasi, merekomendasikan OPD tujuan, dan menandai apakah masukan perlu validasi. Ini membantu OPD menyaring prioritas tanpa menghilangkan konteks suara warga."

**Poin yang perlu disorot:**

- Dataset simulasi berisi 32 masukan warga.
- Keluhan dan kritik menjadi sinyal kebutuhan respons.
- Saran dan apresiasi menjadi konteks persepsi publik.
- CivicSense tetap assistant, bukan pengambil keputusan.

### D. Detail Wilayah + Issue Hotspots

**Tindakan:** Kembali ke Dashboard, klik salah satu wilayah prioritas, misalnya Semarang Utara atau Genuk.

**Narasi presenter:**

"Ketika kita masuk ke detail wilayah, pimpinan atau petugas bisa melihat indikator wilayah, issue hotspots, komposisi feedback warga, dan masukan yang terkait dengan kecamatan tersebut. Ini membuat proses drill-down lebih operasional: dari ranking kota turun ke masalah spesifik di lapangan."

### E. Akuntabilitas Tindak Lanjut

**Tindakan:** Masih di Region Detail, sorot panel Akuntabilitas Tindak Lanjut.

**Narasi presenter:**

"Bagian ini mensimulasikan bagaimana OPD melaporkan tindak lanjut. Ada status validasi, tindakan yang dilakukan, label bukti sebelum-sesudah, kendala lapangan, dan ringkasan publik. Tujuannya bukan hanya menerima laporan, tetapi juga membangun siklus akuntabilitas sampai tindak lanjut dapat diverifikasi."

### F. Policy Simulator

**Tindakan:** Klik menu Simulator. Ubah mode kebijakan, misalnya Banjir/Rob, Layanan Publik, Ekonomi UMKM, atau Laporan Warga.

**Narasi presenter:**

"Policy Simulator memungkinkan analis mengubah fokus kebijakan dan melihat perubahan ranking prioritas intervensi. Penting dicatat, ranking ini bukan peringkat wilayah terbaik, melainkan urutan wilayah yang paling membutuhkan intervensi sesuai fokus kebijakan."

**Poin penting:** Jelaskan inversi indikator. Untuk Akses Layanan Publik dan Aktivitas UMKM, nilai rendah dapat berarti kebutuhan intervensi lebih tinggi.

### G. AI-assisted Policy Brief

**Tindakan:** Masuk ke Policy Brief. Tunjukkan executive summary, indikator utama, rekomendasi, dan tombol copy/print.

**Narasi presenter:**

"Setelah analisis dilakukan, CivicSense Policy Assistant menyusun draf policy brief. Draf ini membantu mempercepat penyusunan ringkasan eksekutif, tetapi tetap wajib divalidasi manusia dan OPD terkait sebelum menjadi dokumen kebijakan resmi."

### H. Public Transparency

**Tindakan:** Klik menu Public.

**Narasi presenter:**

"Transparansi publik tidak berarti membuka semua data mentah. Halaman Public Transparency hanya menampilkan informasi yang aman: prioritas wilayah, alasan yang mudah dipahami warga, penjelasan indikator, dan ringkasan tindak lanjut OPD yang telah dianonimkan."

### I. Methodology

**Tindakan:** Klik Methodology.

**Narasi presenter:**

"Terakhir, kami tunjukkan metodologi agar sistem ini ramah audit. Di sini dijelaskan status data, rumus scoring, bobot, inversi indikator, batasan prototype, dan guardrail CivicSense. Kami sengaja membuat metode terbuka agar tidak menjadi black-box."

---

## 4. Closing (30 detik)

**Narasi presenter:**

"CIVICTWIN tidak dirancang untuk menggantikan pemerintah atau keputusan manusia. Ia adalah decision support system yang membantu membaca prioritas wilayah, suara warga, dan tindak lanjut OPD secara lebih cepat dan transparan. Data pada prototype ini masih simulasi dan perlu integrasi resmi apabila masuk tahap implementasi. Terima kasih."

---

## Catatan Penting untuk Presenter

1. Jangan mengklaim aplikasi sudah real-time.
2. Jangan mengklaim data laporan, hotspot, atau bukti penyelesaian adalah data asli pemerintah.
3. Jangan mengklaim CivicSense sebagai AI pengambil keputusan.
4. Tekankan bahwa CivicSense adalah rule-based assistant tanpa API LLM eksternal.
5. Jelaskan bahwa halaman publik hanya menampilkan data agregat dan ringkasan yang aman.
6. Saat menjelaskan simulator, gunakan istilah "prioritas intervensi", bukan "wilayah terbaik".
