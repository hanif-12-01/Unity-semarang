import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { divIcon } from "leaflet";
import { Link } from "react-router-dom";
import { buttonClasses } from "../ui/Button";
import { classNames } from "../../utils/classNames";
import type { ScoredRegion } from "../../utils";

// ─── KOORDINAT PROTOTYPE (CENTROID) ──────────────────────────────────────────
// Catatan: Koordinat ini adalah titik tengah (centroid) perkiraan untuk keperluan 
// proof of concept dan tidak mewakili batas poligon/geospasial administratif resmi.
const MOCK_CENTROIDS: Record<string, [number, number]> = {
  "semarang-utara": [-6.953, 110.414],
  "genuk": [-6.945, 110.468],
  "tugu": [-6.965, 110.334],
  "pedurungan": [-7.008, 110.465],
  "banyumanik": [-7.070, 110.418],
  "semarang-tengah": [-6.980, 110.420],
};

const CENTER_SEMARANG: [number, number] = [-7.000, 110.420]; // Perkiraan tengah kota

// ─── CUSTOM ICON MAKER ────────────────────────────────────────────────────────
function createPriorityIcon(category: string, score: number) {
  const isHigh = category === "Tinggi";
  const isMedium = category === "Sedang";
  
  const bgColor = isHigh ? "bg-red-500" : isMedium ? "bg-amber-500" : "bg-emerald-500";
  const ringColor = isHigh ? "ring-red-200" : isMedium ? "ring-amber-200" : "ring-emerald-200";

  const html = `
    <div class="relative flex h-8 w-8 items-center justify-center rounded-full ${bgColor} ring-4 ${ringColor} text-white font-bold shadow-lg text-xs">
      ${score}
    </div>
  `;

  return divIcon({
    html,
    className: "custom-leaflet-marker", // Hilangkan background transparan bawaan leaflet
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -20],
  });
}

// ─── KOMPONEN UTAMA ──────────────────────────────────────────────────────────
export default function SemarangPriorityMap({ regions }: { regions: ScoredRegion[] }) {
  // Leaflet map initialization bug fix for React StrictMode
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return <div className="h-[420px] w-full rounded-xl bg-civic-soft animate-pulse flex items-center justify-center text-civic-muted text-sm">Memuat peta...</div>;

  return (
    <div className="flex flex-col gap-3">
      {/* Container peta dengan border dan shadow ringan */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-xl border border-civic-line shadow-sm z-0">
        <MapContainer
          center={CENTER_SEMARANG}
          zoom={11}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          {/* TileLayer gratis dari OpenStreetMap */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />

          {/* Render marker untuk setiap region */}
          {regions.map((region) => {
            const position = MOCK_CENTROIDS[region.id];
            if (!position) return null; // Fallback jika ID tidak ada di mock

            const icon = createPriorityIcon(region.computedCategory, region.computedScore);

            return (
              <Marker key={region.id} position={position} icon={icon}>
                <Popup className="civic-popup rounded-xl">
                  <div className="min-w-[200px] space-y-3 p-1">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-civic-muted mb-0.5">
                        Kecamatan
                      </p>
                      <h3 className="text-sm font-bold text-civic-ink m-0">{region.name}</h3>
                    </div>
                    
                    <div className="flex justify-between items-center rounded-lg bg-civic-soft/50 p-2 border border-civic-line">
                      <span className="text-xs font-semibold text-civic-muted">Priority Score</span>
                      <span className={classNames(
                        "text-sm font-bold",
                        region.computedCategory === "Tinggi" ? "text-red-600" :
                        region.computedCategory === "Sedang" ? "text-amber-600" : "text-emerald-600"
                      )}>
                        {region.computedScore}
                      </span>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-civic-muted mb-1">
                        Isu Dominan
                      </p>
                      <p className="text-xs text-civic-ink line-clamp-2 m-0 leading-relaxed">
                        {region.dominantIssues[0]}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-civic-line/60">
                      <Link
                        to={`/regions/${region.id}`}
                        className={classNames(buttonClasses("secondary"), "w-full justify-center text-[10px] py-1")}
                      >
                        Lihat Detail Wilayah →
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend Overlay di pojok kanan atas peta */}
        <div className="absolute top-4 right-4 z-[400] rounded-xl border border-civic-line bg-white/90 p-3 shadow-md backdrop-blur-sm pointer-events-none">
          <p className="text-[10px] font-bold uppercase tracking-wider text-civic-muted mb-2">
            Legenda Prioritas
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-200"></span>
              <span className="font-semibold text-civic-ink">Prioritas Tinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-amber-500 ring-2 ring-amber-200"></span>
              <span className="font-semibold text-civic-ink">Prioritas Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-emerald-200"></span>
              <span className="font-semibold text-civic-ink">Prioritas Rendah</span>
            </div>
          </div>
        </div>
      </div>

      {/* Catatan Bawah & Fallback Note */}
      <div className="rounded-lg bg-civic-soft/50 p-3 text-xs leading-relaxed text-civic-muted border border-civic-line/50">
        <strong>ℹ️ Disclaimer Konseptual:</strong> Peta ini merupakan representasi spasial prototype berbasis titik tengah (centroid) kecamatan, bukan peta GIS resmi. Pada implementasi nyata, sistem dapat dikembangkan menggunakan batas administrasi poligon resmi dan terintegrasi data geospasial pemerintah.
        <br/>
        <span className="mt-1 block opacity-80">Jika peta gagal dimuat (layar abu-abu), pastikan koneksi internet aktif. Data prioritas tetap dapat diakses via tabel dan skor.</span>
      </div>
    </div>
  );
}
