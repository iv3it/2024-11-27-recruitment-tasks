'use client'

import { useState } from 'react';
import { MenuItemType } from '@/types';
import MenuEmptyState from './components/MenuEmptyState';
import MenuItemsList from './components/MenuItemsList';
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  const handleAddMenuItem = (newItem: MenuItemType, parentId?: string) => {
    if (parentId) {
      const updatedMenu = menuItems.map((item) =>
        addItemToParent(item, newItem, parentId)
      );
      setMenuItems(updatedMenu);
    } else {
      setMenuItems([...menuItems, { ...newItem, id: uuidv4() }]);
    }
  };

  const addItemToParent = (parent: MenuItemType, newItem: MenuItemType, parentId: string): MenuItemType => {
    if (parent.id === parentId) {
      return {
        ...parent,
        children: [...(parent.children || []), { ...newItem, id: uuidv4() }],
      };
    }
    if (parent.children) {
      return {
        ...parent,
        children: parent.children.map((child) => addItemToParent(child, newItem, parentId)),
      };
    }
    return parent;
  };

  const handleDeleteMenuItem = (id: string) => {
    const deleteItem = (items: MenuItemType[]): MenuItemType[] =>
      items.filter((item) => item.id !== id).map((item) => ({
        ...item,
        children: deleteItem(item.children || []),
      }));
    setMenuItems(deleteItem(menuItems));
  };

  const handleEditMenuItem = (editedItem: MenuItemType) => {
    const editItem = (items: MenuItemType[]): MenuItemType[] =>
      items.map((item) =>
        item.id === editedItem.id
          ? { ...item, ...editedItem }
          : { ...item, children: editItem(item.children || []) }
      );
    setMenuItems(editItem(menuItems));
  };
  
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-[1168px] mx-auto">
        <main>
          {menuItems.length === 0 ? (
            <MenuEmptyState onAddMenuItem={handleAddMenuItem} />
          ) : (
            <MenuItemsList
              menuItems={menuItems}
              onAddMenuItem={handleAddMenuItem}
              onDeleteMenuItem={handleDeleteMenuItem}
              onEditMenuItem={handleEditMenuItem}
              onDragAndDrop={setMenuItems}
            />
          )}
        </main>
      </div>
    </div>
  );
}
