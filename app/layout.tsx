import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MaxPe — Pay. Earn. Save.',
  description: 'A premium MaxPe experience for recharges, bill payments, rewards and everyday payments.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
