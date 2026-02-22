import "@/app/globals.css";

export const metadata = {
  title: "Admin Panel | Comet Control",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-[#0f1117] text-white font-body">
        {children}
      </body>
    </html>
  );
}
