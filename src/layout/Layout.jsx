import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="bg-gray-50 text-gray-800 text-sm">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
