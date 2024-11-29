'use client'
import { useState } from 'react';
import MenuItem from './MenuItem';
import { MenuItemType } from '@/types';
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

export default function MenuItemsList() {
  let [menuItems, setMenuItems] = useState<MenuItemType[]>([
    { name: 'D', url: 'https://ddd.com/d', id: 4 },
    { name: 'A', url: 'https://aaa.com/a', id: 1 },
    { name: 'B', url: 'https://bbb.com/b', id: 2 },
    { name: 'C', url: 'https://ccc.com/c', id: 3 },
  ]);

  let getMenuItemPosition = (id : number) => menuItems.findIndex(item => item.id === id);

  let handleDragEnd = (event : DragEndEvent) => {
    const {active, over} : any = event;

    if(active.id === over.id) return;

    setMenuItems(menuItems => {
      let originalPosition = getMenuItemPosition(active.id);
      let newPosition = getMenuItemPosition(over.id);

      return arrayMove(menuItems, originalPosition, newPosition)
    })
  }

  let sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <div className="border border-[var(--greyLight)] rounded-lg my-9 overflow-hidden">
      <div>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors} collisionDetection={closestCenter}>
          <SortableContext items={menuItems} strategy={verticalListSortingStrategy}>
            {menuItems && menuItems.map((item: MenuItemType, index: number) => 
              <MenuItem item={item} id={item.id} key={index}/>     
            )}
          </SortableContext>
        </DndContext>
      </div>
      <div className="bg-[var(--background)] py-5 px-6">
        <button className="bg-white border border-[var(--greyLight)] py-[0.625rem] px-4 shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg font-semibold text-[var(----greyDark)] text-sm">Dodaj pozycję menu</button>
      </div>
    </div>
  );
}