import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Trash2, Mail, Phone, Calendar, User, MessageSquare, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { initializeContent, getContent } from '@/lib/contentManager';
import CompanyInfoEditor from '@/components/admin/CompanyInfoEditor';
import TeamEditor from '@/components/admin/TeamEditor';
import ProjectEditor from '@/components/admin/ProjectEditor';

const Admin = () => {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    initializeContent();
    const authStatus = localStorage.getItem('inco_admin_auth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      loadMessages();
      loadContent();
    }
  }, []);

  const loadContent = () => {
    const siteContent = getContent();
    setContent(siteContent);
  };

  const loadMessages = () => {
    const storedMessages = JSON.parse(localStorage.getItem('inco_messages') || '[]');
    setMessages(storedMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.username === 'admin' && loginData.password === 'inco2024') {
      setIsAuthenticated(true);
      localStorage.setItem('inco_admin_auth', 'true');
      loadMessages();
      loadContent();
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo ao painel administrativo da Inc.O.",
      });
    } else {
      toast({
        title: "Erro de autenticação",
        description: "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('inco_admin_auth');
    setLoginData({ username: '', password: '' });
  };

  const deleteMessage = (messageId) => {
    const updatedMessages = messages.filter(msg => msg.id !== messageId);
    setMessages(updatedMessages);
    localStorage.setItem('inco_messages', JSON.stringify(updatedMessages));
    toast({
      title: "Mensagem excluída",
      description: "A mensagem foi removida com sucesso.",
    });
  };

  const markAsRead = (messageId) => {
    const updatedMessages = messages.map(msg => 
      msg.id === messageId ? { ...msg, status: 'read' } : msg
    );
    setMessages(updatedMessages);
    localStorage.setItem('inco_messages', JSON.stringify(updatedMessages));
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString('pt-BR');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#e6e8ea]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl">
            <CardHeader className="text-center">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/982c6fef-1f53-4e61-a4d0-222934ecedca/c5c687b2cd31d3b531f0bdb42bb1f733.jpg" 
                alt="INCO Logo" 
                className="h-16 w-auto mx-auto mb-4"
              />
              <CardTitle className="text-2xl text-[#283449]">
                Painel Administrativo
              </CardTitle>
              <CardDescription>
                Faça login para acessar o sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#283449] mb-2">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={loginData.username}
                    onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#283449]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#283449] mb-2">
                    Senha
                  </label>
                  <input
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#283449]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#283449] hover:bg-[#75819f] text-white">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="min-h-screen pt-20 bg-[#e6e8ea]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#283449]">
                Painel Administrativo
              </h1>
              <p className="text-[#606974] mt-2">
                Gerencie mensagens e conteúdo do site
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white">
              Sair
            </Button>
          </div>

          <Tabs defaultValue="messages" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mb-8">
              <TabsTrigger value="messages" className="data-[state=active]:bg-[#283449] data-[state=active]:text-white">Mensagens</TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-[#283449] data-[state=active]:text-white">Conteúdo</TabsTrigger>
              <TabsTrigger value="stats" className="data-[state=active]:bg-[#283449] data-[state=active]:text-white">Estatísticas</TabsTrigger>
            </TabsList>

            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#283449]">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    Mensagens Recebidas ({messages.length})
                  </CardTitle>
                  <CardDescription>
                    Mensagens enviadas através do formulário de contato
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-[#606974]">
                      Nenhuma mensagem recebida ainda.
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <Card 
                          key={message.id} 
                          className={`hover-lift ${message.status === 'new' ? 'border-l-4 border-l-blue-500' : ''}`}
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4 mb-2">
                                  <div className="flex items-center text-[#283449]">
                                    <User className="h-4 w-4 mr-1" />
                                    <span className="font-semibold">{message.name}</span>
                                  </div>
                                  {message.status === 'new' && (
                                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                                      Nova
                                    </span>
                                  )}
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-[#606974] mb-3">
                                  <div className="flex items-center">
                                    <Mail className="h-4 w-4 mr-1" />
                                    {message.email}
                                  </div>
                                  <div className="flex items-center">
                                    <Phone className="h-4 w-4 mr-1" />
                                    {message.phone}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {formatDate(message.timestamp)}
                                  </div>
                                </div>
                                
                                {message.subject && (
                                  <div className="mb-2">
                                    <span className="font-medium text-[#283449]">Assunto: </span>
                                    <span className="text-[#606974]">{message.subject}</span>
                                  </div>
                                )}
                                
                                <p className="text-[#606974] line-clamp-2">
                                  {message.message}
                                </p>
                              </div>
                              
                              <div className="flex space-x-2 ml-4">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button 
                                      variant="outline" 
                                      size="sm"
                                      className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white"
                                      onClick={() => {
                                        setSelectedMessage(message);
                                        if (message.status === 'new') {
                                          markAsRead(message.id);
                                        }
                                      }}
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle className="text-[#283449]">
                                        Mensagem de {selectedMessage?.name}
                                      </DialogTitle>
                                      <DialogDescription>
                                        Recebida em {selectedMessage && formatDate(selectedMessage.timestamp)}
                                      </DialogDescription>
                                    </DialogHeader>
                                    {selectedMessage && (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <span className="font-medium text-[#283449]">E-mail:</span>
                                            <p className="text-[#606974]">{selectedMessage.email}</p>
                                          </div>
                                          <div>
                                            <span className="font-medium text-[#283449]">Telefone:</span>
                                            <p className="text-[#606974]">{selectedMessage.phone}</p>
                                          </div>
                                        </div>
                                        {selectedMessage.subject && (
                                          <div>
                                            <span className="font-medium text-[#283449]">Assunto:</span>
                                            <p className="text-[#606974]">{selectedMessage.subject}</p>
                                          </div>
                                        )}
                                        <div>
                                          <span className="font-medium text-[#283449]">Mensagem:</span>
                                          <p className="text-[#606974] whitespace-pre-wrap mt-2">
                                            {selectedMessage.message}
                                          </p>
                                        </div>
                                        <div className="flex space-x-2 pt-4">
                                          <Button 
                                            onClick={() => window.open(`mailto:${selectedMessage.email}`)}
                                            className="bg-[#283449] hover:bg-[#75819f] text-white"
                                          >
                                            <Mail className="mr-2 h-4 w-4" />
                                            Responder por E-mail
                                          </Button>
                                          <Button 
                                            onClick={() => window.open(`tel:${selectedMessage.phone}`)}
                                            variant="outline"
                                            className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white"
                                          >
                                            <Phone className="mr-2 h-4 w-4" />
                                            Ligar
                                          </Button>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => deleteMessage(message.id)}
                                  className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-600 hover:text-white"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-8">
                <CompanyInfoEditor
                  companyInfo={content.company}
                  onUpdate={loadContent}
                />
                
                <TeamEditor
                  team={content.team}
                  onUpdate={loadContent}
                />
                
                <ProjectEditor
                  projects={content.projects.delivered}
                  type="delivered"
                  onUpdate={loadContent}
                />
                
                <ProjectEditor
                  projects={content.projects.ongoing}
                  type="ongoing"
                  onUpdate={loadContent}
                />
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#606974]">
                      Total de Mensagens
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#283449]">
                      {messages.length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#606974]">
                      Mensagens Novas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {messages.filter(m => m.status === 'new').length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#606974]">
                      Mensagens Lidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">
                      {messages.filter(m => m.status === 'read').length}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-[#606974]">
                      Esta Semana
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#75819f]">
                      {messages.filter(m => {
                        const messageDate = new Date(m.timestamp);
                        const weekAgo = new Date();
                        weekAgo.setDate(weekAgo.getDate() - 7);
                        return messageDate >= weekAgo;
                      }).length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default Admin;