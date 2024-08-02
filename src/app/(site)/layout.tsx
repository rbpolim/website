import { Header } from "@/components/header";

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="max-w-2xl mx-auto px-4 my-20">{children}</main>
    </>
  );
}
