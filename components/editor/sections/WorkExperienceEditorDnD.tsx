'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useResumeStore } from '@/lib/store/resumeStore';
import { WorkExperience } from '@/types/resume';
import { Plus, Trash2, Sparkles, GripVertical } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface SortableExperienceCardProps {
  exp: WorkExperience;
  index: number;
  onUpdate: (id: string, field: keyof WorkExperience, value: any) => void;
  onRemove: (id: string) => void;
  onAddBullet: (expId: string) => void;
  onRemoveBullet: (expId: string, index: number) => void;
  onUpdateBullet: (expId: string, index: number, value: string) => void;
}

function SortableExperienceCard({
  exp,
  index,
  onUpdate,
  onRemove,
  onAddBullet,
  onRemoveBullet,
  onUpdateBullet,
}: SortableExperienceCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: exp.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Card ref={setNodeRef} style={style} className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          <h3 className="font-semibold">Experience {index + 1}</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={() => onRemove(exp.id)}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Position *</Label>
            <Input
              value={exp.position}
              onChange={(e) => onUpdate(exp.id, 'position', e.target.value)}
              placeholder="Software Engineer"
            />
          </div>

          <div className="space-y-2">
            <Label>Company *</Label>
            <Input
              value={exp.company}
              onChange={(e) => onUpdate(exp.id, 'company', e.target.value)}
              placeholder="Tech Corp"
            />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input
              value={exp.location || ''}
              onChange={(e) => onUpdate(exp.id, 'location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>

          <div className="space-y-2">
            <Label>Start Date *</Label>
            <Input
              type="month"
              value={exp.startDate}
              onChange={(e) => onUpdate(exp.id, 'startDate', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Input
              type="month"
              value={exp.endDate || ''}
              onChange={(e) => onUpdate(exp.id, 'endDate', e.target.value)}
              disabled={exp.current}
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <Checkbox
              id={`current-${exp.id}`}
              checked={exp.current || false}
              onCheckedChange={(checked) => onUpdate(exp.id, 'current', checked)}
            />
            <label
              htmlFor={`current-${exp.id}`}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Currently working here
            </label>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Responsibilities & Achievements</Label>
            <Button variant="outline" size="sm" onClick={() => onAddBullet(exp.id)}>
              <Plus className="mr-2 h-3 w-3" />
              Add Bullet
            </Button>
          </div>

          {exp.bullets.map((bullet, bulletIndex) => (
            <div key={bulletIndex} className="flex gap-2">
              <Textarea
                value={bullet}
                onChange={(e) => onUpdateBullet(exp.id, bulletIndex, e.target.value)}
                placeholder="• Describe your achievement with metrics when possible..."
                className="min-h-[60px]"
              />
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" title="AI Rewrite">
                  <Sparkles className="h-4 w-4" />
                </Button>
                {exp.bullets.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveBullet(exp.id, bulletIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

export function WorkExperienceEditor() {
  const { resumeData, updateSection } = useResumeStore();
  const workExperience = resumeData?.workExperience || [];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      bullets: [''],
    };
    updateSection('workExperience', [...workExperience, newExperience]);
  };

  const removeExperience = (id: string) => {
    updateSection(
      'workExperience',
      workExperience.filter((exp) => exp.id !== id)
    );
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    updateSection(
      'workExperience',
      workExperience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp))
    );
  };

  const addBullet = (expId: string) => {
    const experience = workExperience.find((exp) => exp.id === expId);
    if (experience) {
      updateExperience(expId, 'bullets', [...experience.bullets, '']);
    }
  };

  const removeBullet = (expId: string, index: number) => {
    const experience = workExperience.find((exp) => exp.id === expId);
    if (experience) {
      const newBullets = experience.bullets.filter((_, i) => i !== index);
      updateExperience(expId, 'bullets', newBullets);
    }
  };

  const updateBullet = (expId: string, index: number, value: string) => {
    const experience = workExperience.find((exp) => exp.id === expId);
    if (experience) {
      const newBullets = [...experience.bullets];
      newBullets[index] = value;
      updateExperience(expId, 'bullets', newBullets);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = workExperience.findIndex((exp) => exp.id === active.id);
      const newIndex = workExperience.findIndex((exp) => exp.id === over.id);

      const reordered = arrayMove(workExperience, oldIndex, newIndex);
      updateSection('workExperience', reordered);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Work Experience</h2>
        <Button onClick={addExperience} size="sm">
          <Plus className="mr-2 h-4 w-4" />
          Add Experience
        </Button>
      </div>

      {workExperience.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="mb-4 text-muted-foreground">No work experience added yet</p>
          <Button onClick={addExperience}>
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Experience
          </Button>
        </Card>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={workExperience.map((exp) => exp.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-6">
              {workExperience.map((exp, index) => (
                <SortableExperienceCard
                  key={exp.id}
                  exp={exp}
                  index={index}
                  onUpdate={updateExperience}
                  onRemove={removeExperience}
                  onAddBullet={addBullet}
                  onRemoveBullet={removeBullet}
                  onUpdateBullet={updateBullet}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
