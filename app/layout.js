import { Sarabun } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import ClientLayoutRedux from "./client-reducers-layout";
import "antd/dist/reset.css";

const sarabun = Sarabun({
  weight: ["400", "700"],
  subsets: ["latin"],
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
