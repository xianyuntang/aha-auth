import { ChakraProvider } from '@chakra-ui/react';

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
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
