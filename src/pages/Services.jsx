import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Store, TreePine, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { getContent } from '@/lib/contentManager';

const Services = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null;
  }
  
  const services = [
    {
      icon: Building2,
      title: 'Incorporação de Imóveis Residenciais',
      description: 'Desenvolvimento completo de empreendimentos residenciais, desde a concepção até a entrega das chaves.',
      features: [
        'Análise de viabilidade técnica e econômica',
        'Desenvolvimento de projetos arquitetônicos',
        'Aprovação junto aos órgãos competentes',
        'Gestão completa da obra',
        'Comercialização e entrega'
      ],
      benefits: [
        'Localização estratégica',
        'Qualidade construtiva superior',
        'Acabamentos de primeira linha',
        'Áreas de lazer completas',
        'Sustentabilidade e eficiência energética'
      ],
      image: 'Complexo residencial moderno com torres elegantes e paisagismo'
    },
    {
      icon: Store,
      title: 'Incorporação de Imóveis Comerciais',
      description: 'Criação de espaços comerciais inovadores que atendem às demandas do mercado empresarial moderno.',
      features: [
        'Estudos de mercado e demanda',
        'Projetos funcionais e modernos',
        'Infraestrutura tecnológica avançada',
        'Certificações ambientais',
        'Facilidades para empresas'
      ],
      benefits: [
        'Localização premium',
        'Flexibilidade de layouts',
        'Sistemas inteligentes',
        'Segurança 24 horas',
        'Estacionamento amplo'
      ],
      image: 'Edifício comercial contemporâneo com fachada de vidro e design moderno'
    },
    {
      icon: TreePine,
      title: 'Desenvolvimento de Loteamentos',
      description: 'Planejamento e execução de loteamentos residenciais com infraestrutura completa e sustentável.',
      features: [
        'Planejamento urbano sustentável',
        'Infraestrutura completa',
        'Preservação ambiental',
        'Áreas de lazer e convivência',
        'Documentação regularizada'
      ],
      benefits: [
        'Lotes com escritura',
        'Ruas pavimentadas',
        'Rede elétrica subterrânea',
        'Sistema de drenagem',
        'Áreas verdes preservadas'
      ],
      image: 'Loteamento residencial com casas modernas e abundante área verde'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Análise e Planejamento',
      description: 'Estudamos a viabilidade do projeto, analisamos o mercado e desenvolvemos o planejamento estratégico.'
    },
    {
      step: '02',
      title: 'Desenvolvimento do Projeto',
      description: 'Criamos projetos arquitetônicos e de engenharia seguindo as melhores práticas e normas técnicas.'
    },
    {
      step: '03',
      title: 'Aprovações e Licenças',
      description: 'Cuidamos de toda a documentação e aprovações necessárias junto aos órgãos competentes.'
    },
    {
      step: '04',
      title: 'Execução da Obra',
      description: 'Gerenciamos toda a construção com rigoroso controle de qualidade e cumprimento de prazos.'
    },
    {
      step: '05',
      title: 'Entrega e Pós-Venda',
      description: 'Realizamos a entrega do empreendimento e oferecemos suporte completo no pós-venda.'
    }
  ];

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
              Nossos Serviços
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Soluções completas em incorporação imobiliária com excelência, 
              inovação e compromisso com a qualidade
            </p>
          </motion.div>
        </div>
      </section>

      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20 ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-[#283449] rounded-full flex items-center justify-center mr-4">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#283449]">{service.title}</h2>
                </div>
                
                <p className="text-lg text-[#606974] mb-8 leading-relaxed">
                  {service.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-4">Nosso Processo</h3>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-[#606974]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-4">Diferenciais</h3>
                    <ul className="space-y-2">
                      {service.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-[#606974]">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button asChild className="bg-[#283449] hover:bg-[#75819f] text-white">
                  <Link to="/contato">
                    Solicitar Orçamento
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              
              <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                <img   
                  className="w-full h-96 object-cover rounded-lg shadow-xl" 
                  alt={service.title}
                  src="https://images.unsplash.com/photo-1595872018818-97555653a011" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="section-padding bg-[#e6e8ea]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-4">
              Nosso Processo de Trabalho
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Metodologia comprovada que garante excelência em cada etapa do projeto
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-[#283449] text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#283449] mb-2">
                  {step.title}
                </h3>
                <p className="text-[#606974] text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
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
              <img   
                className="w-full h-96 object-cover rounded-lg shadow-xl" 
                alt="Equipe Inc.O trabalhando em projeto"
                src="https://images.unsplash.com/photo-1565598469107-2bd14ae7e7e4" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-6">
                Por que escolher a Inc.O?
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#283449] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-2">
                      Experiência Comprovada
                    </h3>
                    <p className="text-[#606974]">
                      Mais de 15 anos de atuação no mercado imobiliário com dezenas de 
                      projetos entregues com sucesso.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#283449] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-2">
                      Inovação e Tecnologia
                    </h3>
                    <p className="text-[#606974]">
                      Utilizamos as mais modernas tecnologias e metodologias para 
                      garantir eficiência e qualidade superior.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#283449] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-2">
                      Compromisso com Prazos
                    </h3>
                    <p className="text-[#606974]">
                      Rigoroso controle de cronograma e transparência total em 
                      todas as etapas do projeto.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#283449] rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#283449] mb-2">
                      Sustentabilidade
                    </h3>
                    <p className="text-[#606974]">
                      Projetos desenvolvidos com foco na sustentabilidade e 
                      responsabilidade ambiental.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
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
              Vamos conversar sobre seu projeto?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Nossa equipe está pronta para desenvolver a solução ideal para suas necessidades
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white hover:bg-[#75819f] text-[#283449] px-8 py-3">
                <Link to="/contato">Entre em contato</Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-[#283449] hover:bg-gray-100">
                <Link to="/projetos">Ver nossos projetos</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;