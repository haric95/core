import { Navigation } from "@/components/Navigation";
import "./globals.css";
import { Manrope, Martel, Raleway } from "next/font/google";
import { Footer } from "@/components/Footer";

export const martel = Martel({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
export const raleway = Raleway({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});
export const manrope = Manrope({
  weight: ["300", "400", "600"],
  subsets: ["latin"],
});

export const metadata = {
  title: "CORE",
  description: "Core Humanitarian Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} relative`}>
        <div className="fixed bg-[url('/bg.jpeg')] w-screen h-screen z-0 bg-cover opacity-50" />
        <div className="absolute w-full h-full">
          <div style={{ minHeight: "calc(100vh - 60px)" }}>
            <Navigation />
            <div className="px-8 md:px-32">{children}</div>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
