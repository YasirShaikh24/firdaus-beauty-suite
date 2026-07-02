import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";
import FloatingInstagram from "./FloatingInstagram";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
      <FloatingInstagram />
      <FloatingContact />
    </div>
  );
};

export default Layout;