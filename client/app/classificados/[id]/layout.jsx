
import HeaderLayout from "@/components/header";
import FooterLayout from "@/components/footer";
import AuthProvider from "@/app/context/AuthContext";

export default function LayoutClassificados({ children }) {
  return (
    <div>
      <HeaderLayout></HeaderLayout>
      <AuthProvider>
        <main className="pt-20 px-4 bg-gray-100 min-h-screen">{children}</main>
      </AuthProvider>
      <FooterLayout></FooterLayout>
    </div>
  );
}
