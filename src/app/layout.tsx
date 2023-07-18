import './assets/css/mobile.css';
import './assets/css/globals.css';
import favicon from '/public/favicon/favicon.ico';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>ChatGPT Website v2.2</title>
        <link rel="shortcut icon" href={favicon.src} />
      </head>
      <body>{children}</body>
    </html>
  )
}
