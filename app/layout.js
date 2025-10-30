import localFont from "next/font/local";
import { Suspense } from "react";
import "./globals.css";
import ClientLayoutRedux from "./client-reducers-layout";
import "antd/dist/reset.css";

const sarabun = localFont({
  src: [
    {
      path: "../public/fonts/sarabun/Sarabun-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/sarabun/Sarabun-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sarabun",
  display: "swap",
});

export const metadata = {
  title: "Care-Vista-C",
  description: "โปรแกรมออกรายงานตรวจสุขภาพ",
};

// กัน Next พยายาม prerender เพจที่มีการพึ่งพา params/CSR
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/logo.png" sizes="any" />
      </head>
      <body className={sarabun.className}>
        {/* ครอบทั้งแอปด้วย Suspense ครั้งเดียวพอ */}
        <Suspense fallback={<div />}>
          <ClientLayoutRedux>{children}</ClientLayoutRedux>
        </Suspense>
      </body>
    </html>
  );
}
