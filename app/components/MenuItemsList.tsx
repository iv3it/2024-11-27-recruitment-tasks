'use client'
import { useState } from 'react';
import MenuItem from './MenuItem';
import { MenuItemType } from '@/types';
import FormMenuPosition from './FormMenuPosition';
import { pointerWithin, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'

type MenuItemsListProps = {
  menuItems: MenuItemType[];
  onAddMenuItem: (item: MenuItemType,parentId?: string) => void;
  onDeleteMenuItem: (id: string) => void;
  onEditMenuItem: (item: MenuItemType) => void;
  onDragAndDrop: (updater: (items: MenuItemType[]) => MenuItemType[]) => void;
};

export default function MenuItemsList({ menuItems, onAddMenuItem, onDeleteMenuItem, onEditMenuItem, onDragAndDrop } : MenuItemsListProps) {
  const getMenuItem = (items: MenuItemType[], id: string, parent: MenuItemType | null = null): [MenuItemType | null, MenuItemType | null] => {
    for (const item of items) {
      if (item.id === id) {
        return [item, parent];
      }

      if (item.children?.length) {
        const [foundItem, foundParent] = getMenuItem(item.children, id, item);
        if (foundItem) {
          return [foundItem, foundParent];
        }
      }
    }
    
    return [null, null]
  };

  let excludeItem = (items: MenuItemType[], id: string): MenuItemType[] => {
    return items.filter((item) => {
      if (item.id === id) {
        return false;
      }
      if (item.children?.length) {
        item.children = excludeItem(item.children, id);
      }
      return true;
    });
  };

  let handleDragEnd = (event : DragEndEvent) => {
    const {active, over} : any = event;

    if(!active || !over) return;

    if(active.id === over.id) return;

    onDragAndDrop((menuItems) => {
      console.log(active.id);

      let [activeItem, activeParent] = getMenuItem(menuItems, active.id);
      let [overItem, overParent] = getMenuItem(menuItems, over.id);

      if(!activeItem) {
        return menuItems
      } 

      // prevent from dropping active inside itself
      let cancel = false;
      let tmpParent = overParent;
      while(tmpParent != null) {
        let [foundItem, foundParent] = getMenuItem(menuItems, tmpParent.id);
        if (tmpParent.id == active.id) {
          cancel = true
        }
        tmpParent = foundParent;
      }

      if(cancel) {
        return menuItems
      }

      let newMenuItems = [...menuItems];

      if (activeParent) {
        activeParent.children = activeParent.children?.filter(
          (child) => child.id !== active.id
        );
      } else {
        newMenuItems = excludeItem(newMenuItems, active.id as string);
      }

      if (overParent) {
        const parentChildren = overParent.children || [];
        const overIndex = parentChildren.findIndex(
          (child) => child.id === over.id
        );
        parentChildren.splice(overIndex, 0, activeItem);
      } else {
        const overIndex = newMenuItems.findIndex((item) => item.id === over.id);
        newMenuItems.splice(overIndex, 0, activeItem);
      }

      return newMenuItems
    })
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
                onAddMenuItem={onAddMenuItem}
                onDeleteMenuItem={onDeleteMenuItem}
                onEditMenuItem={onEditMenuItem}
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