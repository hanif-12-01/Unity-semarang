# Q&A Presentasi Dewan Juri CIVICTWIN Semarang

Dokumen ini berisi daftar antisipasi pertanyaan dari dewan juri beserta panduan jawaban yang **jujur, terstruktur, dan tidak overclaim**. 

Gunakan dokumen ini sebagai pegangan saat sesi tanya jawab.

---

## 1. Ide dan Urgensi

**Q1. Mengapa memilih kota Semarang sebagai lokus inovasi ini?**
*Jawaban:* Semarang memiliki kompleksitas urban yang unik—mulai dari tata letak geografis (pesisir dan perbukitan) yang rawan rob dan banjir, kepadatan penduduk yang dinamis, hingga warisan budaya (Kota Lama). Kompleksitas ini menjadikannya *sandbox* ideal untuk platform tata kelola cerdas seperti CIVICTWIN yang diposisikan sebagai *Civic Intelligence Layer* dan *stepping stone* menuju *Spatial Digital Twin*.

**Q2. Apa masalah utama yang sebenarnya ingin diselesaikan oleh CIVICTWIN?**
*Jawaban:* Masalah utama yang kami selesaikan adalah **silo data**. Saat ini, data kebencanaan, laporan warga, dan statistik kependudukan berada di OPD yang berbeda. Pimpinan daerah kesulitan melihat gambaran utuh (*helicopter view*) dari sebuah wilayah. CIVICTWIN menjembatani hal ini dengan mengonsolidasikan indikator tersebut ke dalam satu dasbor cerdas yang memberikan skor prioritas secara komprehensif.

**Q3. Apa bedanya aplikasi ini dengan dasbor analitik biasa?**
*Jawaban:* Dasbor biasa umumnya pasif; mereka hanya menampilkan metrik historis. CIVICTWIN adalah **Civic Intelligence Platform** yang proaktif. Kami tidak hanya menampilkan grafik, tetapi menyediakan *Policy Simulator* di mana pimpinan bisa melakukan uji parameter kebijakan dan seketika melihat perubahan skenario (skor wilayah) sebelum sebuah keputusan atau anggaran benar-benar dieksekusi.

---

## 2. Aspek Data

**Q4. Sumber data kalian dari mana?**
*Jawaban:* Untuk *prototype* ini, kami menggunakan campuran data. Sebagian metrik demografi dan tata ruang merupakan data publik yang merujuk pada BPS dan portal Satu Data Kota Semarang. Namun, untuk laporan warga dan beberapa variabel kerentanan mikro, datanya adalah olahan simulasi.

**Q5. Mana yang data resmi, mana yang olahan, dan mana yang murni simulasi?**
*Jawaban:* Kepadatan penduduk, nama wilayah, dan indikasi historis risiko banjir (berdasarkan dokumen kebencanaan publik) adalah turunan data resmi. Klasifikasi aduan warga dan letak pasti *hotspot* di peta adalah murni simulasi POC (*Proof of Concept*). Kami merancang arsitektur datanya sedemikian rupa agar nantinya mudah dicabut-pasang (*plug-and-play*) dengan API resmi Pemerintah.

**Q6. Apakah skor wilayah dan data di sistem saat ini bisa langsung dipakai sebagai dasar kebijakan nyata?**
*Jawaban:* **Belum bisa.** Data saat ini ditujukan sebagai pembuktian konsep arsitektur aplikasi (*Proof of Concept*). Untuk menjadi dasar hukum sebuah kebijakan, platform ini mutlak harus diintegrasikan (*bridging*) dengan basis data operasional (seperti DTKS, Lapor!, atau e-Gov kota) yang telah divalidasi oleh OPD terkait.

---

## 3. Kecerdasan Buatan (AI)

**Q7. AI jenis apa yang kalian gunakan di dalam CivicSense?**
*Jawaban:* CivicSense Assistant di dalam CIVICTWIN dibangun menggunakan pendekatan **Rule-Based Engine** yang dikurasi secara spesifik untuk tata kelola, bukan *Large Language Model* (LLM) umum seperti ChatGPT.

**Q8. Mengapa tidak menggunakan API AI eksternal yang lebih canggih?**
*Jawaban:* Ini adalah soal kedaulatan dan keamanan data pemerintahan. Mengirim data keluhan warga (yang mungkin mengandung PII / data pribadi sensitif) ke peladen AI eksternal adalah tindakan yang sangat berisiko dan melanggar prinsip kehati-hatian. Kami lebih memilih *rule-based* yang berjalan 100% di sisi sistem kami guna menjaga kepatuhan privasi (seperti UU PDP).

**Q9. Apakah AI kalian secara otomatis mengambil keputusan penanganan keluhan?**
*Jawaban:* **Sama sekali tidak.** AI kami berstatus *Decision Support*, bukan *Decision Maker*. AI hanya bertugas melakukan klasifikasi awal, *triage* urgensi, dan merangkum draf draf laporan. Eksekusi akhir dan persetujuan kebijakan mutlak dilakukan oleh pejabat manusia (*Human-in-the-loop*).

**Q10. Bagaimana mencegah AI memberikan analisis yang salah atau berhalusinasi?**
*Jawaban:* Karena kami menggunakan *rule-based template* dan *parameter scoring* yang matematis (bukan *generative token guessing*), sistem tidak memiliki kemampuan berhalusinasi (*hallucination-free*). Keluaran sistem (seperti draf Policy Brief) dibatasi hanya pada variabel input yang jelas.

---

## 4. Pemerintahan dan Peran OPD

**Q11. Siapa saja target pengguna (User) utama dari sistem ini?**
*Jawaban:* Kami merancang *Role-Based Access*. Pengguna utamanya mencakup **Executive** (Walikota/Sekda) untuk membaca Policy Brief; **Policy Analyst** (Bappeda) untuk menjalankan simulator; **OPD Operator** untuk mengeksekusi laporan; dan **Aparatur Kecamatan** untuk validasi spasial di tingkat granular. Kami juga menyediakan akses transparansi bebas *login* untuk masyarakat umum.

**Q12. Bagaimana alur sebuah OPD menggunakan aplikasi ini?**
*Jawaban:* Sebagai contoh, saat operator BPBD masuk ke dasbor, AI CivicSense sudah mengkategorikan laporan yang berlabel darurat terkait "Banjir". Operator hanya perlu melihat laporan tersebut, mengecek *hotspot* wilayah di peta, memvalidasi di lapangan, lalu memperbarui status penanganan di sistem.

**Q13. Bagaimana jika pemerintah tidak disiplin menindaklanjuti laporan di sistem ini?**
*Jawaban:* Itulah sebabnya kami memasukkan komponen **Public Transparency Page**. Halaman ini secara otomatis menyajikan *Citizen Summary*—memberitahukan persentase laporan yang tertunda atau terselesaikan. Keterbukaan informasi ini menjadi fungsi pendorong akuntabilitas pemerintah secara organik.

---

## 5. Laporan Masyarakat (Citizen Reports)

**Q14. Apakah aplikasi ini bermaksud menggantikan platform SP4N-LAPOR! nasional?**
*Jawaban:* Tidak. CIVICTWIN justru diposisikan sebagai **lapisan intelijen (Intelligence Layer)** yang duduk di atas sistem pengaduan yang sudah ada. Jika diimplementasikan, kami akan menarik (*consume*) API dari SP4N-LAPOR! kota Semarang agar laporannya bisa dianalisis, diberi *scoring* urgensi, dan dipetakan secara spasial oleh mesin CIVICTWIN.

**Q15. Bagaimana kalian menjaga data pribadi para pelapor?**
*Jawaban:* Modul privasi kami menganonimkan data sejak hulu. Nama pengirim, nomor pelapor, atau alamat persis rumah pelapor di-enkripsi atau disembunyikan dari antarmuka agregasi, terutama pada draf *Policy Brief* dan *Public View*.

**Q16. Bagaimana memvalidasi bahwa laporan masyarakat bukan spam?**
*Jawaban:* CivicSense AI dirancang dengan sistem *scoring* kualitas teks. Keluhan tanpa konteks atau spam dapat disortir ke kuadran 'Triage/Need Validation'. Selain itu, kami mengharuskan validasi berjenjang (dari level kelurahan) sebelum status *hotspot* bisa membunyikan alarm *Command Center*.

---

## 6. Peta dan Geospasial

**Q17. Apakah peta ini memuat garis batas wilayah (boundary polygons) resmi BPN/Bappeda?**
*Jawaban:* Pada *prototype* saat ini, kami belum memasukkan format berkas SHP/GeoJSON batas wilayah resmi karena ukuran data yang masif. Peta ini difokuskan pada representasi visual dan masih menggunakan representasi titik koordinat (*marker centroids*).

**Q18. Apakah titik merah (Marker) pada peta benar-benar akurat?**
*Jawaban:* Posisi marker saat ini menyasar titik pusat kecamatan untuk merepresentasikan skala prioritas kecamatan tersebut. Untuk *hotspot* isunya, posisinya masih *mockup* simulasi yang tersebar di wilayah Semarang Utara dan sekitarnya guna keperluan demo interaksi pemetaan.

**Q19. Apa rencana pengembangan modul GIS-nya ke depan?**
*Jawaban:* Pada *roadmap* purna-lomba, kami akan mengintegrasikan sistem dengan Peta Dasar (Portal Geospasial) Pemkot. Ini memungkinkan penggambaran *polygon* per kelurahan (*choropleth map*) yang warna zonanya akan memudar atau memerah secara otomatis (*real-time*) mengikuti pergantian parameter kebijakan di Simulator.

---

## 7. Metodologi Scoring

**Q20. Mengapa bobot indikatornya dirancang sedemikian rupa?**
*Jawaban:* Bobot saat ini didesain seimbang antara aspek struktural kota (Kepadatan, Risiko Banjir) dengan aspek reaksioner kota (Volume Keluhan). Kami percaya bahwa "kota cerdas" harus memperhatikan data teknis (statistik) sama besarnya dengan suara yang diteriakkan warga (keluhan).

**Q21. Apakah bobot tersebut bersifat kaku (mutlak)?**
*Jawaban:* Tidak. Melalui fitur *Policy Simulator*, pimpinan atau analis bebas mengubah distribusi bobot (*slider*) sesuai fokus musrenbang atau RPJMD tahunan. Jika tahun ini fokus pada infrastruktur darurat, bobot kebencanaan bisa ditarik maksimal oleh pengguna.

**Q22. Apa bedanya Priority Score, Emergency Review Score, dan Report Urgency?**
*Jawaban:* 
- **Priority Score (0-100)** melekat pada kecamatan/wilayah, berfungsi untuk perencanaan kebijakan dan merepresentasikan seberapa mendesak suatu kecamatan untuk mendapatkan intervensi reguler.
- **Emergency Review Score (0-100)** melekat pada kecamatan/wilayah, menggabungkan indikator krisis lapangan (seperti status muka air, risiko historis, laporan terverifikasi, paparan penduduk, fasilitas kritis, dan kerentanan sosial).
- **Report Urgency** melekat pada laporan warga individual, dengan kategori Rendah/Sedang/Tinggi/Kritis.

---

## 8. Implementasi Lanjutan (Roadmap)

**Q23. Apa *roadmap* konkrit kalian setelah prototipe ini selesai?**
*Jawaban:* Fase pertama pasca-lomba adalah *Data Onboarding*, yakni sinkronisasi API Satu Data Semarang dan SP4N-LAPOR!. Fase kedua adalah penguatan *Backend Authentication* berbasis SSO Pemerintah Daerah. Terakhir, fase *Deployment* ke server lokal milik Diskominfo untuk uji coba operasional selama satu bulan.

**Q24. Apa saja risiko terbesar dalam mengimplementasikan platform ini?**
*Jawaban:* Tantangan utamanya adalah interoperabilitas data dan adopsi kultural. Jika API dari OPD sulit dibuka atau tidak *real-time*, fungsi *intelligence* CIVICTWIN akan menurun. Di sisi kultural, dibutuhkan pembiasaan birokrasi agar terbiasa mengacu pada data simulasi sebelum mengetok anggaran.

**Q25. Secara institusi, dukungan apa yang kalian butuhkan dari pemerintah daerah?**
*Jawaban:* Kami membutuhkan komitmen regulasi, khusus pembentukan Surat Keputusan (SK) atau Peraturan Walikota terkait "Satu Pintu Data Intelijen" yang mewajibkan OPD untuk membuka akses API data *non-classified* kepada mesin CIVICTWIN secara periodik, serta dukungan lokakarya pelatihan aparatur di lima kecamatan sebagai *pilot project*.
