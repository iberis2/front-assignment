import '../styles/globals.scss';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iberis TODO List',
  description: 'A simple TODO list web-app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>{children}</body>
    </html>
  );
}
