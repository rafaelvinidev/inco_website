import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, Users, Award, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getContent } from '@/lib/contentManager';

const About = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null; 
  }

  const { team } = content;

  const values = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Desenvolver empreendimentos imobiliários de excelência, oferecendo soluções inteligentes e inovadoras que superem as expectativas de nossos clientes, contribuindo para o desenvolvimento urbano sustentável.'
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Ser reconhecida como a incorporadora de referência no mercado imobiliário, destacando-se pela qualidade, inovação e compromisso com a satisfação dos clientes e desenvolvimento das comunidades.'
    },
    {
      icon: Heart,
      title: 'Valores',
      description: 'Integridade, transparência, qualidade, inovação, sustentabilidade, compromisso com prazos, excelência no atendimento e responsabilidade social e ambiental.'
    }
  ];

  const timeline = [
    {
      year: '2008',
      title: 'Fundação da Inc.O',
      description: 'Início das atividades com foco em incorporação residencial na região metropolitana de São Paulo.'
    },
    {
      year: '2012',
      title: 'Expansão para Comercial',
      description: 'Diversificação do portfólio com entrada no segmento de incorporação comercial.'
    },
    {
      year: '2015',
      title: 'Primeiro Loteamento',
      description: 'Lançamento do primeiro projeto de loteamento, marcando entrada no segmento de desenvolvimento urbano.'
    },
    {
      year: '2018',
      title: 'Certificação Sustentável',
      description: 'Obtenção das primeiras certificações ambientais, reforçando compromisso com sustentabilidade.'
    },
    {
      year: '2020',
      title: 'Inovação Tecnológica',
      description: 'Implementação de tecnologias BIM e automação predial em todos os projetos.'
    },
    {
      year: '2024',
      title: 'Liderança no Mercado',
      description: 'Consolidação como uma das principais incorporadoras da região, com mais de 50 projetos entregues.'
    }
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Prêmio Excelência Imobiliária',
      year: '2023',
      description: 'Reconhecimento pela qualidade e inovação em projetos residenciais'
    },
    {
      icon: TrendingUp,
      title: 'Top 10 Incorporadoras SP',
      year: '2022',
      description: 'Classificação entre as 10 melhores incorporadoras de São Paulo'
    },
    {
      icon: Users,
      title: 'Certificação Great Place to Work',
      year: '2023',
      description: 'Reconhecimento como uma das melhores empresas para trabalhar'
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
              Sobre a Inc.O
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Mais de 15 anos transformando sonhos em realidade através de 
              empreendimentos imobiliários de excelência
            </p>
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
                Nossa História
              </h2>
              <p className="text-lg text-[#606974] mb-6 leading-relaxed">
                A Inc.O - Incorporadora Oliveira nasceu em 2008 com o sonho de transformar 
                o mercado imobiliário através da excelência, inovação e compromisso com a 
                qualidade. Fundada por João Oliveira, engenheiro civil com vasta experiência 
                no setor, a empresa iniciou suas atividades focada em incorporação residencial.
              </p>
              <p className="text-lg text-[#606974] mb-6 leading-relaxed">
                Ao longo dos anos, expandimos nosso portfólio para incluir empreendimentos 
                comerciais e loteamentos, sempre mantendo nossos valores fundamentais: 
                transparência, qualidade e pontualidade. Hoje, somos reconhecidos como uma 
                das principais incorporadoras da região metropolitana de São Paulo.
              </p>
              <p className="text-lg text-[#606974] leading-relaxed">
                Nossa trajetória é marcada por mais de 50 projetos entregues, milhares de 
                famílias atendidas e a confiança de investidores e parceiros que acreditam 
                em nossa capacidade de transformar ideias em realidade.
              </p>
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
                alt="História da INCO"
               src="https://images.unsplash.com/photo-1598737129494-69cb30f96a73" />
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
              Missão, Visão e Valores
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Os pilares que orientam todas as nossas decisões e ações
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="text-center h-full hover-lift">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-[#283449] rounded-full flex items-center justify-center mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#283449] text-2xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#606974] text-base leading-relaxed">
                      {value.description}
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
              Nossa Trajetória
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Marcos importantes que definiram nossa jornada de crescimento e evolução
            </p>
          </motion.div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#283449] hidden md:block"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className={`w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}>
                    <Card className="hover-lift">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-[#283449]">{item.title}</CardTitle>
                          <span className="text-2xl font-bold text-[#75819f]">{item.year}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-[#606974] text-base">
                          {item.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-4 h-4 bg-[#283449] rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                  
                  <div className="hidden md:block w-5/12"></div>
                </motion.div>
              ))}
            </div>
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
              Conquistas e Reconhecimentos
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Prêmios e certificações que atestam nossa excelência e compromisso com a qualidade
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover-lift">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-[#283449] to-[#75819f] rounded-full flex items-center justify-center mb-4">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-[#283449]">{achievement.title}</CardTitle>
                    <CardDescription className="text-[#75819f] font-semibold text-lg">
                      {achievement.year}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#606974]">
                      {achievement.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
      <section className="section-padding bg-gradient-to-r from-[#283449] to-[#75819f] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <blockquote className="text-2xl md:text-3xl font-light italic mb-8 leading-relaxed">
              "Nosso compromisso vai além de construir edifícios. Construímos sonhos, 
              criamos comunidades e transformamos vidas através de empreendimentos que 
              fazem a diferença no mundo."
            </blockquote>
            <cite className="text-lg font-semibold">
              João Oliveira, CEO e Fundador da INCO
            </cite>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;