# Final Submission Checklist - CIVICTWIN Semarang

Gunakan checklist ini sebelum submit ke portal kompetisi dan sebelum presentasi.

---

## 1. Administrasi & Kelengkapan Dokumen

- [ ] KTM semua anggota tim telah diunggah / dipersiapkan.
- [ ] KRS aktif semua anggota tim telah disertakan.
- [ ] Surat rekomendasi kampus/dosen pembimbing, jika disyaratkan, sudah ditandatangani.
- [ ] Lembar orisinalitas bermeterai sudah diisi dan ditandatangani ketua tim.
- [ ] Data anggota tim sudah sesuai: nama, NIM, dan kontak aktif.
- [ ] Format seluruh file mengikuti guidebook lomba: PDF, PPT, ZIP/source code, atau format lain yang diminta.

## 2. Pengecekan Fungsional Prototype

- [ ] `npm install` berjalan tanpa error di perangkat demo.
- [ ] `npm run build` sukses tanpa error TypeScript.
- [ ] `npm run preview` berjalan lancar.
- [ ] Semua route navigasi bisa diklik dan tidak menghasilkan blank screen.
- [ ] Login Role Demo (`/login`) berfungsi dan menyimpan role di `localStorage`.
- [ ] Dashboard memuat ranking wilayah, peta prioritas, insight CivicSense, dan Resolution Accountability.
- [ ] Peta Leaflet menampilkan tiles dan marker.
- [ ] Reports Page memuat Citizen Feedback Intelligence.
- [ ] Filter Reports berjalan untuk pencarian, jenis feedback, kategori, status, dan kecamatan.
- [ ] Dataset feedback menampilkan Keluhan, Kritik, Saran, dan Apresiasi.
- [ ] Region Detail memuat indikator wilayah, issue hotspots, komposisi feedback, dan laporan penyelesaian OPD.
- [ ] Policy Simulator mengubah ranking prioritas intervensi sesuai mode kebijakan.
- [ ] Policy Brief dapat dimuat, dicopy, dan diprint tanpa error.
- [ ] Public Transparency memuat ringkasan prioritas dan status tindak lanjut publik.
- [ ] Methodology memuat status data, rumus, bobot, inversi indikator, dan guardrail AI.

## 3. Kelengkapan Dokumentasi Repositori

- [ ] `README.md` sudah memuat fitur terbaru: Citizen Feedback Intelligence dan Resolution Accountability.
- [ ] `PROJECT_DOCUMENTATION.md` sudah menjelaskan arsitektur, data, scoring, AI governance, dan batasan prototype.
- [ ] `DEMO_SCRIPT.md` sudah mengikuti alur aplikasi terbaru.
- [ ] `QNA_JURI.md` sudah mencakup pertanyaan tentang feedback warga, tindak lanjut OPD, AI, data, dan GIS.
- [ ] `SUBMISSION_CHECKLIST.md` sudah diperbarui.
- [ ] `src/assets/README.md` menjelaskan aset visual yang digunakan.
- [ ] Tautan sumber data referensi di halaman Methodology sudah ditinjau.
- [ ] Tautan deploy, jika ada, sudah dites dan dilampirkan.

## 4. Keamanan Klaim Inovasi

- [ ] Tidak mengklaim data aplikasi terhubung real-time ke Pemkot Semarang.
- [ ] Tidak mengklaim hotspot, laporan warga, atau laporan penyelesaian OPD sebagai data asli.
- [ ] Tidak mengklaim CivicSense sebagai decision maker otomatis.
- [ ] Menjelaskan bahwa CivicSense adalah rule-based assistant tanpa API LLM eksternal.
- [ ] Menjelaskan bahwa ranking simulator adalah prioritas intervensi, bukan peringkat wilayah terbaik.
- [ ] Menjelaskan bahwa data publik sudah dianonimkan dan tidak memakai data pribadi warga asli.
- [ ] Menjelaskan bahwa output policy brief masih draf awal dan butuh validasi manusia.

## 5. Kesiapan Presentasi & Demo

- [ ] Narasi pitch sudah dilatih untuk durasi 5-7 menit.
- [ ] Alur demo sudah dilatih dari Login, Dashboard, Reports, Region Detail, Simulator, Policy Brief, Public, sampai Methodology.
- [ ] Presenter siap menjelaskan empat jenis feedback: Keluhan, Kritik, Saran, Apresiasi.
- [ ] Presenter siap menjelaskan Resolution Accountability dan status validasi tindak lanjut.
- [ ] Presenter siap menjelaskan indikator inversi pada Akses Layanan Publik dan Aktivitas UMKM.
- [ ] Anggota tim sudah membagi porsi jawaban Q&A.
- [ ] Backup screenshot semua halaman sudah tersedia.
- [ ] Backup screen recording demo sudah tersedia.
- [ ] Aplikasi sudah dicoba pada laptop dan browser yang akan dipakai presentasi.

## 6. Pengecekan GitHub

- [ ] `git status` sudah diperiksa sebelum commit.
- [ ] Build terakhir sudah berhasil.
- [ ] Perubahan dokumentasi dan kode sudah masuk commit.
- [ ] Branch sudah dipush ke remote GitHub yang benar.
- [ ] Repository GitHub dapat dibuka oleh reviewer/juri sesuai pengaturan akses yang dibutuhkan.
