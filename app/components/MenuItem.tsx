'use client'

import FormMenuPosition from "./FormMenuPosition";
import { MenuItemType } from '@/types';
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'
import { useState } from "react";

type MenuItemProps = {
  id: string;
  item: MenuItemType;
  onDeleteMenuItem: (id: string) => void;
  onEditMenuItem: (item: MenuItemType) => void;
  onAddMenuItem: (item: MenuItemType, parentId?: string) => void;
  depth: number;
};

export default function MenuItem({ id, item, onDeleteMenuItem, onEditMenuItem, onAddMenuItem, depth } : MenuItemProps) {
  let {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
  let styleDND = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  const [showChildForm, setShowChildForm] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<MenuItemType | null>(null);

  const handleCancel = () => {
    setShowChildForm(false);
  };

  const handleEditClick = () => {
    setShowChildForm(true);
    setIsEditing(true);
    setCurrentItem(item);
  };

  return (
    <div ref={setNodeRef} {...attributes} style={styleDND} className="touch-none">
      <div style={{ paddingLeft: `${depth * 64}px`}}>
        <div className={`bg-white py-5 pl-[2.125rem] pr-6 flex items-center border-b border-b-[#EAECF0] `}>
          <svg {...listeners} className="cursor-grab" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.16667 7.50002L1.66667 10M1.66667 10L4.16667 12.5M1.66667 10H18.3333M7.5 4.16669L10 1.66669M10 1.66669L12.5 4.16669M10 1.66669V18.3334M12.5 15.8334L10 18.3334M10 18.3334L7.5 15.8334M15.8333 7.50002L18.3333 10M18.3333 10L15.8333 12.5" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div className="ml-3 pr-1 grow">
            <p className="text-[var(--blueDark)] text-sm font-semibold">{item.name}</p>
            <p className="text-[var(--greyMedium)] text-sm mt-[0.375rem]">{item.url}</p>
          </div>
          <div className="shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] border border-[var(--greyLight)] rounded-lg flex gap-x-[1px] bg-[var(--greyLight)] overflow-hidden">
            <button onClick={() => onDeleteMenuItem(item.id)} className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Usuń</button>
            <button onClick={handleEditClick} className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Edytuj</button>
            <button onClick={() => {setShowChildForm(!showChildForm); setIsEditing(false); setCurrentItem(null);}} className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Dodaj pozycję menu</button>
          </div>
        </div>
      </div>
      {item.children && item.children.length > 0 && (
        <SortableContext items={item.children} strategy={verticalListSortingStrategy}>
          <div>
            {item.children.map((child) => (
              <MenuItem
                id={child.id}
                key={child.id}
                item={child}
                onDeleteMenuItem={onDeleteMenuItem}
                onEditMenuItem={onEditMenuItem}
                onAddMenuItem={onAddMenuItem}
                depth={depth + 1}
              />
            ))}
          </div>
        </SortableContext>
      )}
      {showChildForm &&
        <div className="py-4 px-6 bg-[#f9fafb] border-b border-b-[#EAECF0]">
          <FormMenuPosition 
            onSubmit={(formData) => {
              if (isEditing && currentItem) {
                onEditMenuItem({ ...currentItem, ...formData });
              } else {
                onAddMenuItem(formData, item.id);
              }
              setShowChildForm(false);
              setIsEditing(false);
              setCurrentItem(null);
            }}
            onCancel={handleCancel}
            initialValues={isEditing ? currentItem : undefined} 
          />
        </div>
      }
    </div>
  );
}
