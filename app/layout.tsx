import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import QueryClientProvider from '@/src/remotes/QueryClientProvider';

import S from './styles.module.scss';

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
      <body className={S.container}>
        <QueryClientProvider>
          {children}
          <div id='portal' />
          <ToastContainer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
