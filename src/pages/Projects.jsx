import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Eye, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import Lightbox from '@/components/Lightbox';
import { getContent } from '@/lib/contentManager';

const Projects = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImages, setCurrentImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null;
  }

  const { projects: siteProjects } = content;
  const deliveredProjects = siteProjects?.delivered || [];
  const ongoingProjects = siteProjects?.ongoing || [];

  const openLightbox = (images, index = 0) => {
    setCurrentImages(images);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const previousImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  const ProjectCard = ({ project, isOngoing = false }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Card className="hover-lift overflow-hidden h-full">
        <div className="relative h-64">
          <img  
            className="w-full h-full object-cover cursor-pointer" 
            alt={project.name}
            src={project.images && project.images.length > 0 ? project.images[0] : "https://images.unsplash.com/photo-1595872018818-97555653a011"}
            onClick={() => openLightbox(project.images || [], 0)}
          />
          <div className="absolute top-4 right-4">
            {isOngoing ? (
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {project.progress}% Concluído
              </div>
            ) : (
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Entregue
              </div>
            )}
          </div>
          <button
            onClick={() => openLightbox(project.images || [], 0)}
            className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
        
        <CardHeader>
          <CardTitle className="text-[#283449]">{project.name}</CardTitle>
          <CardDescription className="flex items-center text-[#606974]">
            <MapPin className="h-4 w-4 mr-1" />
            {project.location}
          </CardDescription>
          <CardDescription className="flex items-center text-[#606974]">
            <Calendar className="h-4 w-4 mr-1" />
            {isOngoing ? `Previsão: ${project.expectedDelivery}` : `Entregue em ${project.deliveryDate}`}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <p className="text-[#606974] mb-4 text-sm leading-relaxed">
            {project.description}
          </p>
          
          <div className="mb-6">
            <h4 className="font-semibold text-[#283449] mb-2">Principais Diferenciais:</h4>
            <ul className="space-y-1">
              {(project.differentials || []).slice(0, 3).map((differential, index) => (
                <li key={index} className="text-sm text-[#606974] flex items-start">
                  <span className="w-1.5 h-1.5 bg-[#283449] rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {differential}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(project.images || []).slice(1, 5).map((image, index) => (
              <img 
                key={index}
                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                alt={`${project.name} - Imagem ${index + 2}`}
                src={image}
                onClick={() => openLightbox(project.images || [], index + 1)}
              />
            ))}
          </div>
          
          <Button asChild variant="outline" className="w-full border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white">
            <Link to="/contato">
              Solicitar mais informações
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20">
      
      <section className="relative py-20 bg-gradient-to-r from-[#283449] to-[#75819f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Projetos Inc.O
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Conheça nosso portfólio de empreendimentos entregues e em andamento. 
              Cada projeto reflete nosso compromisso com qualidade e inovação.
            </p>
          </motion.div>
        </div>
      </section>

      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="entregues" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12">
              <TabsTrigger value="entregues" className="text-base data-[state=active]:bg-[#283449] data-[state=active]:text-white">Obras Entregues</TabsTrigger>
              <TabsTrigger value="andamento" className="text-base data-[state=active]:bg-[#283449] data-[state=active]:text-white">Obras em Andamento</TabsTrigger>
            </TabsList>
            
            <TabsContent value="entregues">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#283449] mb-4">
                    Obras Entregues
                  </h2>
                  <p className="text-lg text-[#606974] max-w-2xl mx-auto">
                    Empreendimentos concluídos que demonstram nossa expertise e qualidade
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {deliveredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="andamento">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-[#283449] mb-4">
                    Obras em Andamento
                  </h2>
                  <p className="text-lg text-[#606974] max-w-2xl mx-auto">
                    Projetos em desenvolvimento com previsão de entrega e acompanhamento do progresso
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {ongoingProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} isOngoing={true} />
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
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
              Números que Impressionam
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Resultados que comprovam nossa experiência e competência no mercado
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50+', label: 'Projetos Entregues' },
              { number: '15+', label: 'Anos de Experiência' },
              { number: '5.000+', label: 'Unidades Construídas' },
              { number: '98%', label: 'Satisfação dos Clientes' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#283449] mb-2">
                  {stat.number}
                </div>
                <div className="text-[#606974] font-medium">
                  {stat.label}
                </div>
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
              Interessado em algum projeto?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato conosco para mais informações sobre nossos empreendimentos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="outline" className="bg-[#283449] hover:bg-[#75819f] text-white px-8 py-3">
                <Link to="/contato">Fale conosco</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#283449] hover:bg-gray-100">
                <Link to="/servicos">Conheça nossos serviços</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      
      <Lightbox
        isOpen={lightboxOpen}
        images={currentImages}
        currentIndex={currentImageIndex}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrevious={previousImage}
      />
    </div>
  );
};

export default Projects;