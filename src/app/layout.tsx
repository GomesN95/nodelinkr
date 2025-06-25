import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type { ReactNode } from 'react';
import React from 'react';

import '@/styles/globals.scss';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'NodeLinkr',
  description:
    'Visualize and manage connections between your entities and the services they’re linked to through an interactive graph.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): ReactNode {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
