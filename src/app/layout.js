import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Carbon Footprint Tracker",
  description: "Track and reduce your carbon footprint for a sustainable future.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="m-0 p-0 w-full overflow-x-hidden">
        <Navbar />
        <main className="w-full m-0 p-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}