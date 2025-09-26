// components/custom/LayoutWrapper.tsx (server)
import Navbar from "@/components/custom/Navbar";
import Footer from "@/components/custom/Footer";
import LayoutClient from "./LayoutClient";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <LayoutClient>
        {children}
        <Footer />
      </LayoutClient>
    </>
  );
}
