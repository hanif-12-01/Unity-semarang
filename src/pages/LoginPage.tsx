import { useNavigate } from "react-router-dom";
import { UserCog, LineChart, Stethoscope, MapPinned, Users, TriangleAlert } from "lucide-react";
import { classNames } from "../utils/classNames";

type RoleConfig = {
  id: string;
  name: string;
  description: string;
  accessList: string;
  icon: React.ReactNode;
  targetPath: string;
};

const ROLES: RoleConfig[] = [
  {
    id: "executive",
    name: "Executive Viewer",
    description: "Untuk pimpinan daerah dan pengambil kebijakan tingkat tinggi.",
    accessList: "Ringkasan Prioritas, Policy Brief, Dashboard Kota",
    icon: <UserCog size={28} className="text-civic-primary" />,
    targetPath: "/dashboard",
  },
  {
    id: "analyst",
    name: "Policy Analyst / Bappeda",
    description: "Untuk analisis kebijakan mendalam dan perencanaan strategis.",
    accessList: "Simulator, Ranking Wilayah, Policy Brief",
    icon: <LineChart size={28} className="text-civic-primary" />,
    targetPath: "/simulator",
  },
  {
    id: "opd",
    name: "OPD Operator",
    description: "Untuk pengelolaan laporan masyarakat dan tindak lanjut lapangan.",
    accessList: "Reports, Issue Triage, Status Laporan",
    icon: <Stethoscope size={28} className="text-civic-primary" />,
    targetPath: "/reports",
  },
  {
    id: "kecamatan",
    name: "Kecamatan / Kelurahan",
    description: "Untuk validasi wilayah secara granular dan pemantauan hotspot lokal.",
    accessList: "Detail Wilayah, Issue Hotspots, Laporan Wilayah",
    icon: <MapPinned size={28} className="text-civic-primary" />,
    targetPath: "/dashboard",
  },
  {
    id: "public",
    name: "Public Viewer",
    description: "Akses terbatas untuk masyarakat umum tanpa data sensitif.",
    accessList: "Transparansi Publik",
    icon: <Users size={28} className="text-civic-primary" />,
    targetPath: "/public",
  },
];

export default function LoginPage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role: RoleConfig) => {
    localStorage.setItem("civictwin_demo_role", role.name);
    // Use window.location instead of navigate so the AppLayout completely re-mounts
    // to read the new localStorage value natively.
    window.location.href = role.targetPath;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-civic-surface px-6 py-16">
      <div className="w-full max-w-4xl space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-civic-ink md:text-4xl">
            CIVICTWIN Semarang
          </h1>
          <h2 className="text-xl font-medium text-civic-muted uppercase tracking-widest">
            Role-Based Civic Intelligence Access
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-civic-ink/80 md:text-base">
            Pilih mode akses demo untuk mensimulasikan bagaimana CIVICTWIN digunakan oleh aktor berbeda dalam pemerintah kota dan masyarakat.
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ROLES.map((role) => (
            <button
              key={role.id}
              onClick={() => handleRoleSelection(role)}
              className="group text-left flex flex-col justify-between rounded-xl border border-civic-line bg-civic-surface p-6 shadow-sm transition-all hover:border-civic-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-civic-primary/50"
            >
              <div>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-civic-primary/10 transition-colors group-hover:bg-civic-primary/20">
                  {role.icon}
                </div>
                <h3 className="text-lg font-bold text-civic-ink group-hover:text-civic-primary transition-colors">
                  {role.name}
                </h3>
                <p className="mt-2 text-sm text-civic-muted line-clamp-2">
                  {role.description}
                </p>
              </div>
              <div className="mt-6 border-t border-civic-line pt-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-civic-muted mb-1">
                  Akses Utama:
                </p>
                <p className="text-xs font-medium text-civic-ink">
                  {role.accessList}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mx-auto max-w-2xl rounded-xl border border-civic-brick/20 bg-civic-brick/5 p-4 flex items-start gap-3">
          <TriangleAlert className="text-civic-brick shrink-0 mt-0.5" size={20} />
          <p className="text-xs font-medium leading-relaxed text-civic-brick/90">
            <strong>Catatan Prototype:</strong> Halaman ini adalah simulasi role-based access untuk prototype. Pada implementasi nyata, autentikasi dan otorisasi perlu menggunakan sistem keamanan resmi, manajemen pengguna, dan kebijakan akses data.
          </p>
        </div>
      </div>
    </div>
  );
}
