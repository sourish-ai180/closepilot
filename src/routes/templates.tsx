import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Templates from "@/components/Templates";
import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/templates")({
  component: TemplatesPage,
});

function TemplatesPage() {
  return (
    <div className="w-full relative min-h-screen flex flex-col bg-navy-900">
      <Navbar />
      <div className="pt-32 flex-1">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group mb-8"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
        </div>
        <Templates />
      </div>
      <Footer />
    </div>
  );
}
export default TemplatesPage;
