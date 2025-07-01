import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Plus, Image } from 'lucide-react';
import { addProject, updateProject, deleteProject } from '@/lib/contentManager';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const ProjectForm = ({ project, type, onSave, onCancel }) => {
  const [formData, setFormData] = useState(project || {
    name: '',
    location: '',
    description: '',
    images: [],
    ...(type === 'ongoing' ? {
      expectedDelivery: '',
      progress: 0
    } : {
      deliveryDate: ''
    })
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageAdd = () => {
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const handleImageRemove = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Nome do Projeto</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <Label htmlFor="location">Localização</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>

      {type === 'ongoing' ? (
        <>
          <div>
            <Label htmlFor="expectedDelivery">Previsão de Entrega</Label>
            <Input
              id="expectedDelivery"
              name="expectedDelivery"
              value={formData.expectedDelivery}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="progress">Progresso (%)</Label>
            <Input
              id="progress"
              name="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={handleChange}
              required
            />
          </div>
        </>
      ) : (
        <div>
          <Label htmlFor="deliveryDate">Data de Entrega</Label>
          <Input
            id="deliveryDate"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Imagens</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleImageAdd} className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Imagem
          </Button>
        </div>
        {formData.images.map((image, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Input
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder="URL da imagem"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleImageRemove(index)}
              className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-600 hover:text-white"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white">
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#283449] hover:bg-[#75819f] text-white">
          Salvar
        </Button>
      </div>
    </form>
  );
};

const ProjectEditor = ({ projects, type, onUpdate }) => {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const handleSave = (projectData) => {
    try {
      if (editingProject) {
        updateProject(editingProject.id, projectData, type);
      } else {
        addProject(projectData, type);
      }
      onUpdate();
      setIsDialogOpen(false);
      setEditingProject(null);
      toast({
        title: "Projeto atualizado",
        description: "As informações do projeto foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao atualizar",
        description: "Não foi possível atualizar as informações do projeto.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = (projectId) => {
    try {
      deleteProject(projectId, type);
      onUpdate();
      toast({
        title: "Projeto removido",
        description: "O projeto foi removido com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao remover",
        description: "Não foi possível remover o projeto.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {type === 'ongoing' ? 'Projetos em Andamento' : 'Projetos Entregues'}
        </CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditingProject(null)}
              className="bg-[#283449] hover:bg-[#75819f] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Projeto
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingProject ? 'Editar Projeto' : 'Adicionar Projeto'}
              </DialogTitle>
            </DialogHeader>
            <ProjectForm
              project={editingProject}
              type={type}
              onSave={handleSave}
              onCancel={() => {
                setIsDialogOpen(false);
                setEditingProject(null);
              }}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="hover-lift">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm text-gray-600">{project.location}</p>
                    {type === 'ongoing' && (
                      <p className="text-sm text-blue-600">
                        Progresso: {project.progress}%
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingProject(project)}
                          className="border-[#283449] text-[#283449] hover:bg-[#283449] hover:text-white"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Editar Projeto</DialogTitle>
                        </DialogHeader>
                        <ProjectForm
                          project={project}
                          type={type}
                          onSave={handleSave}
                          onCancel={() => setIsDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id)}
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
      </CardContent>
    </Card>
  );
};

export default ProjectEditor;