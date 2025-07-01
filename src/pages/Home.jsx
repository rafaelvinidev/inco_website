import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getContent } from '@/lib/contentManager';

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null; 
  }

  const { company, projects: siteProjects } = content;
  const projects = (siteProjects?.delivered || []).slice(0, 3); 

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Investidora',
      content: 'A  superou todas as minhas expectativas. Profissionalismo e qualidade excepcionais.',
      rating: 5
    },
    {
      name: 'João Santos',
      role: 'Empresário',
      content: 'Excelente parceria para nosso projeto comercial. Entrega no prazo e com qualidade superior.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      role: 'Família',
      content: 'Realizamos o sonho da casa própria com a . Atendimento personalizado e transparente.',
      rating: 5
    }
  ];

  const differentials = [
    {
      icon: Building2,
      title: 'Expertise Comprovada',
      description: 'Mais de 15 anos de experiência no mercado imobiliário'
    },
    {
      icon: Users,
      title: 'Atendimento Personalizado',
      description: 'Soluções sob medida para cada cliente e projeto'
    },
    {
      icon: Award,
      title: 'Qualidade Garantida',
      description: 'Padrão de excelência em todos os nossos empreendimentos'
    },
    {
      icon: CheckCircle,
      title: 'Entrega no Prazo',
      description: 'Compromisso com prazos e transparência total'
    }
  ];

  return (
    <div className="min-h-screen">
      
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img   
            className="w-full h-full object-cover" 
            alt="Skyline moderno de São Paulo com arranha-céus e arquitetura contemporânea"
            src="https://images.unsplash.com/photo-1678664036105-f609aeeaa7c6" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#283449]/80 to-[#75819f]/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Soluções Inteligentes em
            <span className="block text-[#e6e8ea]">rporação Imobiliária</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-200"
          >
            Transformamos ideias em realidade com qualidade, inovação e compromisso
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="bg-[#283449] hover:bg-[#75819f] text-white px-8 py-3">
              <Link to="/projetos">
                Conheça nossos projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white hover:bg-[#75819f] text-[#283449] px-8 py-3">
              <Link to="/contato">Fale Conosco</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-6">
                {company.name}
              </h2>
              <p className="text-lg text-[#606974] mb-6 leading-relaxed">
                Há mais de uma década no mercado imobiliário, a {company.name} se destaca pela excelência 
                em rporação de imóveis residenciais, comerciais e desenvolvimento de loteamentos. 
                Nossa missão é oferecer soluções inteligentes e de qualidade superior para 
                investidores, famílias, jovens e empreendedores.
              </p>
              <p className="text-lg text-[#606974] mb-8 leading-relaxed">
                Com uma equipe altamente qualificada e processos inovadores, garantimos 
                transparência, qualidade e pontualidade em todos os nossos projetos.
              </p>
              <Button asChild className="bg-[#283449] hover:bg-[#75819f] text-white">
                <Link to="/sobre">
                  Saiba mais sobre nós
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img   
                className="w-full h-96 object-cover rounded-lg shadow-xl" 
                alt="Equipe de arquitetos e engenheiros trabalhando em projeto"
               src="https://images.unsplash.com/photo-1651009188116-bb5f80eaf6aa" />
            </motion.div>
          </div>
        </div>
      </section>

      
      <section className="section-padding bg-[#e6e8ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-4">
              Nossos Diferenciais
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              O que nos torna únicos no mercado de rporação imobiliária
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {differentials.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover-lift h-full">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-[#283449] rounded-full flex items-center justify-center mb-4">
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#283449]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#606974]">
                      {item.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-4">
              Projetos em Destaque
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Conheça alguns dos nossos principais empreendimentos
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift overflow-hidden">
                  <div className="relative h-48">
                    <img  
                      className="w-full h-full object-cover" 
                      alt={project.name}
                      src={project.images && project.images.length > 0 ? project.images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"}
                    />
                    <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                      project.status === 'Entregue' || project.deliveryDate
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {project.status || (project.deliveryDate ? 'Entregue' : 'Em Andamento')}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-[#283449]">{project.name}</CardTitle>
                    <CardDescription className="text-[#606974]">
                      {project.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild variant="outline" className="w-full border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white">
                      <Link to="/contato">Solicitar mais informações</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button asChild size="lg" className="bg-[#283449] hover:bg-[#75819f] text-white">
              <Link to="/projetos">
                Ver todos os projetos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      
      <section className="section-padding bg-[#283449] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-lg text-[#e6e8ea] max-w-2xl mx-auto">
              Depoimentos de quem confia na {company.name} para realizar seus projetos
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardHeader>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400">★</span>
                      ))}
                    </div>
                    <CardDescription className="text-[#e6e8ea] text-base">
                      "{testimonial.content}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-[#e6e8ea] text-sm">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="section-padding bg-gradient-to-r from-[#283449] to-[#75819f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Pronto para realizar seu próximo projeto?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato conosco e descubra como podemos transformar suas ideias em realidade
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-[#75819f] text-[#283449] px-8 py-3">
                <Link to="/contato">Solicite uma proposta</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#283449] hover:bg-gray-100">
                <Link to="/servicos">Conheça nossos serviços</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;