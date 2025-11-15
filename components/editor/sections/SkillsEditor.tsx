'use client';

import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useResumeStore } from '@/lib/store/resumeStore';
import { Skill } from '@/types/resume';
import { Plus, Trash2, X } from 'lucide-react';
import { useState } from 'react';

export function SkillsEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const skills = resumeData?.skills || [];

  const addSkillCategory = () => {
    const newSkill: Skill = {
      id: Date.now().toString(),
      category: '',
      items: [],
    };
    updateSection('skills', [...skills, newSkill]);
  };

  const removeSkillCategory = (id: string) => {
    updateSection(
      'skills',
      skills.filter((skill) => skill.id !== id)
    );
  };

  const updateSkillCategory = (id: string, category: string) => {
    updateSection(
      'skills',
      skills.map((skill) => (skill.id === id ? { ...skill, category } : skill))
    );
  };

  const addSkillItem = (categoryId: string, item: string) => {
    if (!item.trim()) return;

    updateSection(
      'skills',
      skills.map((skill) =>
        skill.id === categoryId
          ? { ...skill, items: [...skill.items, item.trim()] }
          : skill
      )
    );
  };

  const removeSkillItem = (categoryId: string, index: number) => {
    updateSection(
      'skills',
      skills.map((skill) =>
        skill.id === categoryId
          ? { ...skill, items: skill.items.filter((_, i) => i !== index) }
          : skill
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Skills</h2>
        <Button onClick={addSkillCategory} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="mb-4 text-muted-foreground">No skills added yet</p>
          <Button onClick={addSkillCategory}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill Category
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          {skills.map((skillCategory) => (
            <SkillCategoryCard
              key={skillCategory.id}
              skill={skillCategory}
              onUpdateCategory={(category) =>
                updateSkillCategory(skillCategory.id, category)
              }
              onAddItem={(item) => addSkillItem(skillCategory.id, item)}
              onRemoveItem={(index) => removeSkillItem(skillCategory.id, index)}
              onRemove={() => removeSkillCategory(skillCategory.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface SkillCategoryCardProps {
  skill: Skill;
  onUpdateCategory: (category: string) => void;
  onAddItem: (item: string) => void;
  onRemoveItem: (index: number) => void;
  onRemove: () => void;
}

function SkillCategoryCard({
  skill,
  onUpdateCategory,
  onAddItem,
  onRemoveItem,
  onRemove,
}: SkillCategoryCardProps) {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      onAddItem(newSkill);
      setNewSkill('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <Input
          value={skill.category}
          onChange={(e) => onUpdateCategory(e.target.value)}
          placeholder="Category (e.g., Programming Languages, Tools)"
          className="max-w-md font-semibold"
        />
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill (press Enter)"
          />
          <Button onClick={handleAddSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {skill.items.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, index) => (
              <Badge key={index} variant="secondary" className="gap-1 px-3 py-1">
                {item}
                <button
                  onClick={() => onRemoveItem(index)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
