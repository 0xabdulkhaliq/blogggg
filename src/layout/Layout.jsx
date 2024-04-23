import Home from "../pages/Home";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <div className="bg-gray-50 text-gray-800 text-sm">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
