import './globals.css'
import { CommandProvider } from '@/components/CommandContext'
import SidebarNav from '@/components/SidebarNav'

export const metadata = {
  title: 'Aetheris Command | Global Treasury, Fleet Logistics & Cloud Telemetry OS',
  description:
    'Multi-page enterprise financial treasury, maritime supply-chain telemetry, and multi-region infrastructure command dashboard engineered by Jeyarajan Thilakraj.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#0B0D10] text-[#F3F4F6] font-sans antialiased">
        <CommandProvider>
          <SidebarNav>{children}</SidebarNav>
        </CommandProvider>
      </body>
    </html>
  )
}
