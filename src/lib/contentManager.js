import React from 'react';

const defaultContent = {
  company: {
    name: 'Inc.O - Incorporações Oliveira',
    description: 'Soluções inteligentes em incorporação de imóveis residenciais, comerciais e loteamentos.',
    cnpj: '56.780.387/0001-09',
    address: 'Rua Diogo Moreira, 132 – Conjunto 208',
    city: 'Pinheiros/SP',
    cep: '05423-010',
    phone: '(11) 3031-5354',
    whatsapp: '(11) 93761-0881',
    emails: ['jo@haltincapital.com', 'fb@haltincapital.com', 'jp@haltincapital.com'],
    workingHours: 'Segunda a Sexta-feira, das 09:00 às 18:00',
    socialMedia: {
      facebook: '#',
      instagram: '#',
      linkedin: '#'
    }
  },
  team: [
    {
      id: 1,
      name: 'João Oliveira',
      role: 'CEO e Fundador',
      description: 'Engenheiro Civil com MBA em Gestão de Negócios. Mais de 20 anos de experiência no mercado imobiliário.',
      image: 'https://images.unsplash.com/photo-1644424235476-295f24d503d9'
    },
    {
      id: 2,
      name: 'Maria Santos',
      role: 'Diretora de Projetos',
      description: 'Arquiteta e Urbanista especializada em sustentabilidade. Responsável pelo desenvolvimento de todos os projetos.',
      image: 'https://images.unsplash.com/photo-1644424235476-295f24d503d9'
    },
    {
      id: 3,
      name: 'Carlos Silva',
      role: 'Diretor Comercial',
      description: 'Especialista em vendas imobiliárias com vasta experiência em relacionamento com clientes e parceiros.',
      image: 'https://images.unsplash.com/photo-1644424235476-295f24d503d9'
    },
    {
      id: 4,
      name: 'Ana Costa',
      role: 'Diretora Financeira',
      description: 'Economista com especialização em mercado de capitais. Responsável pela gestão financeira e planejamento estratégico.',
      image: 'https://images.unsplash.com/photo-1644424235476-295f24d503d9'
    }
  ],
  projects: {
    delivered: [
      {
        id: 1,
        name: 'Residencial Jardim das Flores',
        location: 'Vila Madalena, SP',
        deliveryDate: 'Dezembro 2023',
        description: 'Empreendimento residencial de alto padrão com 120 unidades.',
        images: [
          'https://images.unsplash.com/photo-1595872018818-97555653a011',
          'https://images.unsplash.com/photo-1596860463397-3006096f0345',
          'https://images.unsplash.com/photo-1598737129494-69cb30f96a73'
        ]
      }
      // ... outros projetos entregues
    ],
    ongoing: [
      {
        id: 1,
        name: 'Residencial Vista Park',
        location: 'Moema, SP',
        expectedDelivery: 'Junho 2025',
        progress: 65,
        description: 'Empreendimento residencial de luxo com 80 unidades.',
        images: [
          'https://images.unsplash.com/photo-1595872018818-97555653a011',
          'https://images.unsplash.com/photo-1596860463397-3006096f0345',
          'https://images.unsplash.com/photo-1598737129494-69cb30f96a73'
        ]
      }
      // ... outros projetos em andamento
    ]
  }
};

export const initializeContent = () => {
  const existingContent = localStorage.getItem('inco_content');
  if (!existingContent) {
    localStorage.setItem('inco_content', JSON.stringify(defaultContent));
  }
};

export const getContent = () => {
  const content = localStorage.getItem('inco_content');
  return JSON.parse(content || JSON.stringify(defaultContent));
};

export const updateContent = (newContent) => {
  localStorage.setItem('inco_content', JSON.stringify(newContent));
};

export const updateCompanyInfo = (companyInfo) => {
  const content = getContent();
  content.company = { ...content.company, ...companyInfo };
  updateContent(content);
};

export const updateTeamMember = (memberId, memberData) => {
  const content = getContent();
  const memberIndex = content.team.findIndex(m => m.id === memberId);
  
  if (memberIndex !== -1) {
    content.team[memberIndex] = { ...content.team[memberIndex], ...memberData };
  } else {
    content.team.push({ id: Date.now(), ...memberData });
  }
  
  updateContent(content);
};

export const deleteTeamMember = (memberId) => {
  const content = getContent();
  content.team = content.team.filter(m => m.id !== memberId);
  updateContent(content);
};

export const addProject = (project, type) => {
  const content = getContent();
  content.projects[type].push({
    id: Date.now(),
    ...project
  });
  updateContent(content);
};

export const updateProject = (projectId, projectData, type) => {
  const content = getContent();
  const projectIndex = content.projects[type].findIndex(p => p.id === projectId);
  
  if (projectIndex !== -1) {
    content.projects[type][projectIndex] = {
      ...content.projects[type][projectIndex],
      ...projectData
    };
  }
  
  updateContent(content);
};

export const deleteProject = (projectId, type) => {
  const content = getContent();
  content.projects[type] = content.projects[type].filter(p => p.id !== projectId);
  updateContent(content);
};