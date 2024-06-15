export const metadata = {
  title: 'Aha Dashboard',
  description: 'A user dashboard for aha ai',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children} </body>
    </html>
  );
}
