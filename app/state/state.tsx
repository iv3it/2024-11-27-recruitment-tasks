import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type {} from '@redux-devtools/extension'
import { MenuItemState, MenuItemType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const useMenuItemsStore = create<MenuItemState>()(
  devtools(
    persist(
      (set) => ({
        menuItems: [],
        onAddMenuItem: (newItem: MenuItemType, parentId?: string) => {
          set((state) => {
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

            if (parentId) {
              const updatedMenu = state.menuItems.map((item) =>
                addItemToParent(item, newItem, parentId)
              );
              return { menuItems: updatedMenu };

            } else {
              return { menuItems: [...state.menuItems, { ...newItem, id: uuidv4() }] }
            }
          });
        },
        onEditMenuItem: (editedItem: MenuItemType) => {
          set((state) => {
            const editItem = (items: MenuItemType[]): MenuItemType[] =>
              items.map((item) =>
                item.id === editedItem.id
                  ? { ...item, ...editedItem }
                  : { ...item, children: editItem(item.children || []) }
              );
            return { menuItems: editItem(state.menuItems) };
          });
        },
        onDeleteMenuItem: (id: string) => {
          set((state) => {
            const deleteItem = (items: MenuItemType[]): MenuItemType[] =>
              items.filter((item) => item.id !== id).map((item) => ({
                ...item,
                children: deleteItem(item.children || []),
              }));
            return { menuItems: deleteItem(state.menuItems) };
          });
        },
        onDragAndDrop: (activeId : string, overId: string) => {
          set((state) => {
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

            ///
            let [activeItem, activeParent] = getMenuItem(state.menuItems, activeId);
            let [overItem, overParent] = getMenuItem(state.menuItems, overId);

            if(!activeItem) {
              return { menuItems: state.menuItems }
            } 

            // prevent from dropping active inside itself
            let cancel = false;
            let tmpParent = overParent;
            while(tmpParent != null) {
              let [foundItem, foundParent] = getMenuItem(state.menuItems, tmpParent.id);
              if (tmpParent.id == activeId) {
                cancel = true
              }
              tmpParent = foundParent;
            }

            if(cancel) {
              return { menuItems: state.menuItems }
            }

            let newMenuItems = [...state.menuItems];

            if (activeParent) {
              activeParent.children = activeParent.children?.filter(
                (child) => child.id !== activeId
              );
            } else {
              newMenuItems = excludeItem(newMenuItems, activeId as string);
            }

            if (overParent) {
              const parentChildren = overParent.children || [];
              const overIndex = parentChildren.findIndex(
                (child) => child.id === overId
              );
              parentChildren.splice(overIndex, 0, activeItem);
            } else {
              const overIndex = newMenuItems.findIndex((item) => item.id === overId);
              newMenuItems.splice(overIndex, 0, activeItem);
            }

            return { menuItems: newMenuItems };
          });
        }
      }),
      {
        name: 'menu-item-storage',
      },
    ),
  ),
)