import type { Metadata } from "next";
import "./globals.scss";


export const metadata: Metadata = {
  title: "DevOps Tools",
  description: "Diese Seite enthält Tools für DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>
        {children}
      </body>
    </html>
  );
}
