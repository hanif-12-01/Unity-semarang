# Q&A Presentasi Dewan Juri CIVICTWIN Semarang

Dokumen ini berisi antisipasi pertanyaan juri beserta jawaban yang jujur, terstruktur, dan tidak overclaim.

---

## 1. Ide dan Urgensi

**Q1. Mengapa memilih Semarang sebagai lokus inovasi?**
**Jawaban:** Semarang memiliki kompleksitas urban yang kuat: wilayah pesisir rawan rob, area perbukitan, kepadatan penduduk, aktivitas ekonomi, dan kebutuhan layanan publik yang beragam. Kompleksitas ini cocok untuk membuktikan konsep civic intelligence layer yang kelak dapat berkembang menjadi spatial digital twin.

**Q2. Masalah utama apa yang diselesaikan CIVICTWIN?**
**Jawaban:** Masalah utamanya adalah silo data dan lemahnya prioritisasi lintas OPD. CIVICTWIN membantu menggabungkan indikator wilayah, masukan warga, dan status tindak lanjut menjadi satu dashboard yang memudahkan pimpinan melihat wilayah mana yang perlu intervensi lebih dahulu.

**Q3. Apa bedanya dengan dashboard biasa?**
**Jawaban:** Dashboard biasa cenderung pasif. CIVICTWIN menambahkan scoring wilayah, Policy Simulator, Citizen Feedback Intelligence, CivicSense Assistant, dan Resolution Accountability. Jadi sistem tidak hanya menampilkan data, tetapi membantu membaca prioritas, menyusun narasi kebijakan, dan memantau tindak lanjut.

---

## 2. Data dan Validitas

**Q4. Sumber data kalian dari mana?**
**Jawaban:** Untuk prototype, data adalah kombinasi data publik, data olahan, dan simulasi terbatas. Data wilayah dan konteks kota merujuk pada sumber publik, sedangkan feedback warga, hotspot, dan laporan penyelesaian OPD adalah mock data untuk membuktikan alur sistem.

**Q5. Apa saja yang simulasi?**
**Jawaban:** Masukan warga, koordinat hotspot detail, status tindak lanjut OPD, bukti sebelum-sesudah, dan sebagian indikator mikro adalah simulasi POC. Kami sengaja menyatakan ini secara eksplisit agar tidak overclaim.

**Q6. Apakah skor wilayah bisa langsung dipakai sebagai dasar kebijakan nyata?**
**Jawaban:** Belum. Skor pada prototype hanya membuktikan konsep. Untuk kebijakan nyata, data harus dihubungkan ke sumber resmi, diverifikasi OPD, dan melalui proses validasi lapangan.

**Q7. Mengapa tetap memakai data simulasi?**
**Jawaban:** Karena tujuan tahap ini adalah membuktikan desain sistem, alur keputusan, UI/UX, dan tata kelola data tanpa mengambil risiko menggunakan data pribadi atau data pemerintah yang belum diotorisasi.

---

## 3. Citizen Feedback Intelligence

**Q8. Kenapa modul laporan diubah menjadi feedback intelligence?**
**Jawaban:** Masukan warga tidak selalu berupa keluhan. Ada kritik, saran, dan apresiasi. Dengan memisahkan empat jenis feedback, pemerintah bisa membedakan masalah yang butuh respons cepat, evaluasi layanan, aspirasi perbaikan, dan kinerja positif OPD.

**Q9. Berapa data feedback yang ada di prototype?**
**Jawaban:** Ada 32 data simulasi masukan warga: 18 Keluhan, 6 Kritik, 4 Saran, dan 4 Apresiasi.

**Q10. Apakah saran dan apresiasi ikut menaikkan prioritas wilayah?**
**Jawaban:** Tidak otomatis. Keluhan dan kritik lebih kuat sebagai sinyal kebutuhan respons. Saran dan apresiasi digunakan sebagai konteks persepsi publik, misalnya untuk melihat aspirasi warga atau praktik baik OPD.

**Q11. Apakah aplikasi menggantikan SP4N-LAPOR!?**
**Jawaban:** Tidak. CIVICTWIN diposisikan sebagai intelligence layer di atas kanal pelaporan yang sudah ada. Pada implementasi nyata, sistem dapat mengonsumsi data dari SP4N-LAPOR! atau kanal resmi lain untuk dianalisis dan dipetakan secara spasial.

**Q12. Bagaimana menjaga privasi pelapor?**
**Jawaban:** Prototype tidak menggunakan data pribadi warga. Dalam desain implementasi, data pribadi harus dimasking atau dipisahkan dari tampilan analitik, terutama pada policy brief dan public view.

---

## 4. Resolution Accountability

**Q13. Apa itu Resolution Accountability?**
**Jawaban:** Ini adalah modul simulasi untuk memantau tindak lanjut OPD setelah laporan diterima. Isinya mencakup tindakan yang dilakukan, status validasi, bukti sebelum-sesudah dalam bentuk label, kendala lapangan, dan ringkasan publik.

**Q14. Apakah bukti penyelesaian di aplikasi ini asli?**
**Jawaban:** Tidak. Bukti penyelesaian pada prototype masih berupa label simulasi, bukan foto atau dokumen asli. Dalam implementasi nyata, bukti perlu diunggah, diverifikasi, dan dimasking bila mengandung data sensitif.

**Q15. Mengapa status validasi penting?**
**Jawaban:** Agar laporan tidak berhenti pada klaim OPD. Status seperti "Diajukan untuk Validasi", "Selesai Tervalidasi", atau "Perlu Revisi Tindak Lanjut" menunjukkan bahwa tindak lanjut masih harus diperiksa oleh petugas berwenang.

**Q16. Bagaimana jika OPD tidak disiplin memperbarui status?**
**Jawaban:** Pada implementasi produksi perlu ada audit trail, SLA, notifikasi, dan mekanisme eskalasi. Prototype ini menunjukkan struktur datanya terlebih dahulu.

---

## 5. CivicSense dan AI

**Q17. AI jenis apa yang digunakan?**
**Jawaban:** CivicSense pada prototype ini adalah rule-based assistant, bukan LLM eksternal. Ia menggunakan template dan parameter scoring yang dikurasi.

**Q18. Mengapa tidak memakai API AI eksternal?**
**Jawaban:** Karena data pemerintahan dan laporan warga berpotensi sensitif. Untuk prototype civic tech, pendekatan rule-based lebih aman, dapat diaudit, dan tidak mengirim data ke pihak ketiga.

**Q19. Apakah CivicSense mengambil keputusan otomatis?**
**Jawaban:** Tidak. CivicSense hanya membantu klasifikasi awal, ringkasan, narasi simulator, dan draf policy brief. Keputusan final tetap harus divalidasi manusia dan OPD terkait.

**Q20. Bagaimana mencegah halusinasi AI?**
**Jawaban:** Karena sistem tidak menggunakan generative AI bebas. Output dibatasi oleh data dan template yang tersedia, sehingga lebih mudah diaudit.

---

## 6. Peta dan Geospasial

**Q21. Apakah peta memakai boundary resmi?**
**Jawaban:** Belum. Prototype masih menggunakan marker centroid dan hotspot simulasi. Boundary resmi SHP/GeoJSON menjadi roadmap berikutnya.

**Q22. Apakah marker hotspot akurat?**
**Jawaban:** Tidak untuk klaim operasional. Marker hotspot adalah simulasi untuk menunjukkan bagaimana sistem akan bekerja jika nanti dihubungkan dengan data lokasi resmi.

**Q23. Bagaimana roadmap GIS-nya?**
**Jawaban:** Integrasi polygon wilayah resmi, choropleth map, layer kelurahan, data risiko bencana, dan kemampuan update sesuai parameter simulator.

---

## 7. Metodologi Scoring

**Q24. Apa indikator Priority Score?**
**Jawaban:** Priority Score menggunakan enam indikator: Kepadatan Penduduk, Risiko Banjir/Rob, Akses Layanan Publik, Kerentanan Sosial, Volume Laporan Warga, dan Aktivitas UMKM.

**Q25. Apa maksud indikator inversi?**
**Jawaban:** Untuk Akses Layanan Publik dan Aktivitas UMKM, nilai tinggi berarti kondisi lebih baik. Karena Priority Score membaca kebutuhan intervensi, nilai rendah pada dua indikator itu dapat membuat prioritas intervensi lebih tinggi.

**Q26. Apa beda Priority Score, Emergency Review Score, dan Report Urgency?**
**Jawaban:** Priority Score melekat pada kecamatan untuk perencanaan reguler. Emergency Review Score melekat pada kecamatan untuk sinyal krisis. Report Urgency melekat pada masukan warga individual.

**Q27. Apakah bobot skor kaku?**
**Jawaban:** Tidak. Bobot dapat berubah melalui Policy Simulator untuk melihat skenario prioritas yang berbeda, misalnya fokus banjir, layanan publik, ekonomi UMKM, atau laporan warga.

---

## 8. Implementasi Lanjutan

**Q28. Apa roadmap setelah lomba?**
**Jawaban:** Data onboarding dari sumber resmi, backend auth dan RBAC, audit trail, integrasi SP4N-LAPOR!, validasi lapangan, GIS boundary resmi, dan dashboard SLA tindak lanjut OPD.

**Q29. Risiko implementasi terbesar apa?**
**Jawaban:** Interoperabilitas data, kualitas data lintas OPD, disiplin update status, dan adopsi birokrasi. Karena itu sistem perlu desain tata kelola, bukan hanya desain aplikasi.

**Q30. Dukungan apa yang dibutuhkan dari pemerintah daerah?**
**Jawaban:** Akses data non-rahasia, standar API lintas OPD, dukungan validasi lapangan, penetapan SOP tindak lanjut, serta pilot project di beberapa kecamatan.
