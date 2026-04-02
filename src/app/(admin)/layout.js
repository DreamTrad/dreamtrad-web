// app/(admin)/layout.js

export const metadata = {
  title: "Admin | DreamTrad",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-100 text-gray-900">
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}