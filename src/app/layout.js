
import { Inter } from "next/font/google";

import "./globals.css";


const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "RealTimeChat",
  description: "RealTimeChat",
  generator: "RealTimeChat",
  manifest: "/manifest.json",
  icons: {
    apple: "/icon512_maskable.png"
  },
};

export default function RootLayout({ children }) {


  return (
    <html lang="en">
          <head>
          <meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
/>
<link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
