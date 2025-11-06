import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import Footer from "@/components/Footer";
import { Metadata } from 'next';
import ParallaxWrapper from "./ParallexWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Quantic Solutions",
  description: "Quantic Solution is a software house that offers unlimited technology solutions for our client's requirements. We offer professional services in the field of Web development, App development, Graphics Designing and Digital Marketing.",
  icons: {
    icon: './fav.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="/icon.png"
        type="image/png"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <ParallaxWrapper>
          <Nav />
         
    {children}
          <Footer />
         </ParallaxWrapper>
      </body>
    </html>
  );
}
