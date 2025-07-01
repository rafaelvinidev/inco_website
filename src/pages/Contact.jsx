import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { getContent } from '@/lib/contentManager';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [content, setContent] = useState(null);

  useEffect(() => {
    const siteContent = getContent();
    setContent(siteContent);
  }, []);

  if (!content) {
    return null; 
  }

  const { company } = content;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingMessages = JSON.parse(localStorage.getItem('inco_messages') || '[]');
      const newMessage = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new'
      };
      existingMessages.push(newMessage);
      localStorage.setItem('inco_messages', JSON.stringify(existingMessages));

      toast({
        title: "Mensagem enviada com sucesso!",
        description: "Entraremos em contato em breve. Obrigado pelo interesse na IncO.",
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar mensagem",
        description: "Tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = company.whatsapp.replace(/\D/g, ''); // Remove non-digits
    const message = `Olá! Gostaria de saber mais sobre os serviços da ${company.name}.`;
    const whatsappUrl = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Endereço',
      content: `${company.address}\n${company.city} — CEP: ${company.cep}`,
      action: () => window.open(`https://maps.google.com/?q=${encodeURIComponent(company.address)},+${encodeURIComponent(company.city)}`, '_blank')
    },
    {
      icon: Phone,
      title: 'Telefone',
      content: company.phone,
      action: () => window.open(`tel:+55${company.phone.replace(/\D/g, '')}`)
    },
    {
      icon: Mail,
      title: 'E-mails',
      content: company.emails.join('\n'),
      action: () => window.open(`mailto:${company.emails[0]}`)
    },
    {
      icon: Clock,
      title: 'Horário de Funcionamento',
      content: company.workingHours,
      action: null
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
              Entre em Contato
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed">
              Estamos prontos para transformar suas ideias em realidade. 
              Fale conosco e descubra como podemos ajudar em seu próximo projeto.
            </p>
          </motion.div>
        </div>
      </section>

      
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl text-[#283449]">
                    Envie sua Mensagem
                  </CardTitle>
                  <CardDescription>
                    Preencha o formulário abaixo e entraremos em contato em breve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="seu@email.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Assunto da sua mensagem"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Mensagem *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Descreva seu projeto ou dúvida..."
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-[#283449] hover:bg-[#75819f] text-white"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Enviando...'
                      ) : (
                        <>
                          Enviar Mensagem
                          <Send className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-3xl font-bold text-[#283449] mb-6">
                  Informações de Contato
                </h2>
                <p className="text-lg text-[#606974] mb-8">
                  Entre em contato conosco através dos canais abaixo ou visite nosso escritório.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <Card 
                    key={index} 
                    className={`hover-lift ${info.action ? 'cursor-pointer' : ''}`}
                    onClick={info.action}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-[#283449] rounded-full flex items-center justify-center flex-shrink-0">
                          <info.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-[#283449] mb-2">
                            {info.title}
                          </h3>
                          <p className="text-[#606974] whitespace-pre-line">
                            {info.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              
              <Card className="bg-[#25D366] text-white hover-lift cursor-pointer" onClick={handleWhatsAppClick}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">
                        WhatsApp Comercial
                      </h3>
                      <p className="text-white/90">
                        {company.whatsapp}
                      </p>
                      <p className="text-sm text-white/80 mt-1">
                        Clique para conversar conosco
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              
              <Card className="bg-[#e6e8ea]">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-[#283449] mb-4">
                    Dados da Empresa
                  </h3>
                  <div className="space-y-2 text-[#606974]">
                    <p><strong>Razão Social:</strong> {company.name}</p>
                    <p><strong>CNPJ:</strong> {company.cnpj}</p>
                    <p><strong>Endereço:</strong> {company.address}</p>
                    <p><strong>Cidade:</strong> {company.city} — CEP: {company.cep}</p>
                  </div>
                </CardContent>
              </Card>
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
            className="text-center mb-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#283449] mb-4">
              Nossa Localização
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Estamos localizados no coração de Pinheiros, uma das regiões mais dinâmicas de São Paulo
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-lg overflow-hidden shadow-xl"
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=-46.70,-23.57,-46.68,-23.55&layer=mapnik&marker=-23.56,-46.69"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Localização ${company.name}`}
            ></iframe>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-6"
          >
            <Button 
              onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(company.address)},+${encodeURIComponent(company.city)}`, '_blank')}
              variant="outline"
              className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Ver no Google Maps
            </Button>
          </motion.div>
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
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-[#606974] max-w-2xl mx-auto">
              Respostas para as dúvidas mais comuns sobre nossos serviços
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                question: 'Qual o prazo médio para entrega de um projeto?',
                answer: 'O prazo varia conforme a complexidade do projeto. Residenciais: 18-24 meses. Comerciais: 12-18 meses. Loteamentos: 6-12 meses.'
              },
              {
                question: 'Vocês oferecem financiamento próprio?',
                answer: 'Trabalhamos com os principais bancos e oferecemos condições especiais de financiamento para nossos clientes.'
              },
              {
                question: 'É possível personalizar os projetos?',
                answer: 'Sim! Oferecemos opções de personalização em acabamentos e layouts, respeitando as normas técnicas e estruturais.'
              },
              {
                question: 'Qual a garantia oferecida?',
                answer: 'Oferecemos 5 anos de garantia estrutural e 1 ano para acabamentos, além de assistência técnica completa.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift">
                  <CardHeader>
                    <CardTitle className="text-[#283449] text-lg">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#606974]">
                      {faq.answer}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;