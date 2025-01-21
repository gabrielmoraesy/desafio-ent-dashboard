import { FaCloud, FaEnvelope, FaGithub, FaInstagram, FaLinkedin, FaPhone } from "react-icons/fa";
import { SiReact, SiTailwindcss } from "react-icons/si";
import { Link } from "react-router-dom";

export const About = () => {
  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4 sm:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4">
        Sobre o <span className="text-[#3C83C4] font-extrabold">App de Dashboards</span>
      </h1>
      <p className="text-base sm:text-lg mb-4">
        O App de Dashboard é uma aplicação intuitiva e de fácil entendimento para gerenciar todos os dados do seu estabelecimento transformando-os em dashboards.
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li className="flex items-center mb-2">
          <SiReact className="text-2xl mr-2" />
          <SiTailwindcss className="text-2xl mr-2" />
          <span><strong>Front-end:</strong> React Vite, Tailwind CSS, ApexCharts, ShadCn e Json Server.</span>
        </li>
        <li className="flex items-center mb-2">
          <FaCloud className="text-2xl mr-2" />
          <span><strong>Requisições HTTP:</strong> Axios</span>
        </li>
      </ul>
      <p className="text-base sm:text-lg mb-4">
        Com uma interface amigável, o App para Dashboard facilita a gestão de seu estabelecimento.
      </p>
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        <Link to="https://github.com/gabrielmoraesy" target="_blank" className="flex items-center">
          <FaGithub className="text-2xl" />
          <span className="ml-2">Github</span>
        </Link>
        <Link to="https://www.linkedin.com/in/gabrielmoraespires/" target="_blank" className="flex items-center">
          <FaLinkedin className="text-2xl" />
          <span className="ml-2">LinkedIn</span>
        </Link>
        <Link to="https://www.instagram.com/moraesdev/" target="_blank" className="flex items-center">
          <FaInstagram className="text-2xl" />
          <span className="ml-2">Instagram</span>
        </Link>
        <Link to="mailto:ygabrielmoraes@gmail.com" className="flex items-center" target="_blank">
          <FaEnvelope className="text-2xl" />
          <span className="ml-2">Email</span>
        </Link>
        <Link to="tel:+5521964277805" className="flex items-center">
          <FaPhone className="text-2xl" />
          <span className="ml-2">Telefone</span>
        </Link>
        <Link to="https://wa.me/5521964277805" className="flex items-center" target="_blank">
          <FaPhone className="text-2xl" />
          <span className="ml-2">WhatsApp</span>
        </Link>
      </div>
    </div>
  );
};
