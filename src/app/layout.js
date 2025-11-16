// src/app/layout.js
import "../app/globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "GDGC UIT - Home",
  description: "Official GDGC UIT homepage",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20">{children}</main>
      </body>
    </html>
  );
}
