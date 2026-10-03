import "./globals.css";

export const metadata = {
  title: "Flowly — from idea to execution",
  description: "Give Flowly a goal. It plans the steps, uses Orbio tools, and hands back finished work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,460;9..144,560&family=IBM+Plex+Mono:wght@400;500&family=Outfit:wght@400;500;560&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
