export interface MenuItemType {
  name: string;
  url?: string;
  id: string;
  children?: MenuItemType[];
}

export interface MenuItemState {
  menuItems: MenuItemType[];
  onAddMenuItem: (item: MenuItemType, parentId?: string) => void;
  onEditMenuItem: (item: MenuItemType) => void;
  onDeleteMenuItem: (id: string) => void;
  onDragAndDrop: (activeId: string, overId: string) => void;
}