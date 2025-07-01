import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Linkedin } from 'lucide-react';
import { getContent } from '@/lib/contentManager';

const Footer = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null; 
  }

  const { company } = content;

  return (
    <footer className="bg-[#283449] text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="space-y-4">
            <img 
              src="https://storage.googleapis.com/hostinger-horizons-assets-prod/982c6fef-1f53-4e61-a4d0-222934ecedca/62974c997b4a774cd83a8242365d2373.png"
              alt={company.name}
              className="h-20 w-auto brightness-0 invert"
            />
            <p className="text-[#e6e8ea] text-sm leading-relaxed">
              {company.description}
            </p>
            <div className="flex space-x-4">
              <a href={company.socialMedia?.facebook || '#'} target="_blank" rel="noopener noreferrer" className="text-[#e6e8ea] hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={company.socialMedia?.instagram || '#'} target="_blank" rel="noopener noreferrer" className="text-[#e6e8ea] hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={company.socialMedia?.linkedin || '#'} target="_blank" rel="noopener noreferrer" className="text-[#e6e8ea] hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          
          <div>
            <span className="text-lg font-semibold mb-4 block">Links Rápidos</span>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                  Projetos Inc.O
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          
          <div>
            <span className="text-lg font-semibold mb-4 block">Nossos Serviços</span>
            <ul className="space-y-2">
              <li className="text-[#e6e8ea] text-sm">Incorporação Residencial</li>
              <li className="text-[#e6e8ea] text-sm">Incorporação Comercial</li>
              <li className="text-[#e6e8ea] text-sm">Desenvolvimento de Loteamentos</li>
              <li className="text-[#e6e8ea] text-sm">Consultoria Imobiliária</li>
            </ul>
          </div>

          
          <div>
            <span className="text-lg font-semibold mb-4 block">Contato</span>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-[#75819f] mt-1 flex-shrink-0" />
                <p className="text-[#e6e8ea] text-sm">
                  {company.address}<br />
                  {company.city} — CEP: {company.cep}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#75819f]" />
                <p className="text-[#e6e8ea] text-sm">{company.phone}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#75819f]" />
                <p className="text-[#e6e8ea] text-sm">{company.emails && company.emails[0]}</p>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-[#75819f]" />
                <p className="text-[#e6e8ea] text-sm">{company.workingHours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#606974] mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#e6e8ea] text-sm">
              © {new Date().getFullYear()} {company.name}. Todos os direitos reservados.
            </p>
            <p className="text-[#e6e8ea] text-sm">
              CNPJ: {company.cnpj}
            </p>
            <div className="flex space-x-4">
              <Link to="/politica-privacidade" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link to="/termos-uso" className="text-[#e6e8ea] hover:text-white transition-colors text-sm">
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;