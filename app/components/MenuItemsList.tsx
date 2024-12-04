'use client'
import { useState } from 'react';
import { useMenuItemsStore } from '../state/state';
import MenuItem from './MenuItem';
import { MenuItemType } from '@/types';
import FormMenuPosition from './FormMenuPosition';
import { pointerWithin, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function MenuItemsList() {
  let menuItems = useMenuItemsStore((state) => state.menuItems);
  let onAddMenuItem = useMenuItemsStore((state) => state.onAddMenuItem);
  let onDragAndDrop = useMenuItemsStore((state) => state.onDragAndDrop);
  
  let handleDragEnd = (event : DragEndEvent) => {
    const {active, over} : any = event;

    if(!active || !over) return;

    if(active.id === over.id) return;

    onDragAndDrop(active.id, over.id);
  }

  let sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  /// END Drag and Drop

  const [showForm, setShowForm] = useState<boolean>(false);

  const handleCancel = () => {
    setShowForm(false);
  };

  return (
    <div className="border border-[var(--greyLight)] rounded-lg my-9 overflow-hidden">
      <div>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={pointerWithin}>
          <SortableContext items={menuItems} strategy={verticalListSortingStrategy}>
            {menuItems && menuItems.map((item: MenuItemType, index: number) => 
              <MenuItem 
                item={item}
                id={item.id}
                key={index}
                depth={0}
              />
            )}
          </SortableContext>
        </DndContext>
      </div>
      <div className="bg-[var(--background)] py-5 px-6">
        <button onClick={() => setShowForm(!showForm)} className="bg-white border border-[var(--greyLight)] py-[0.625rem] px-4 shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg font-semibold text-[var(----greyDark)] text-sm">Dodaj pozycję menu</button>
      </div>
      {showForm &&
        <div className="py-4 px-6 bg-[#f9fafb] border-b border-b-[#EAECF0]">
          <FormMenuPosition onSubmit={(newItem) => {onAddMenuItem(newItem); setShowForm(false);}} onCancel={handleCancel} />
        </div>
      }
    </div>
  );
}