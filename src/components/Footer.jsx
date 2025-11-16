// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/50">
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-600 flex flex-col sm:flex-row justify-between items-center">
        <div>© {new Date().getFullYear()} GDGC UIT. All rights reserved.</div>
        <div className="flex items-center gap-4 mt-3 sm:mt-0">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
        </div>
      </div>
    </footer>
  );
}
