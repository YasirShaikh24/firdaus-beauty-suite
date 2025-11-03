import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isAdmin } = useAuth();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className={isAdmin ? "pt-28" : "pt-16"}>
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
};

export default Layout;