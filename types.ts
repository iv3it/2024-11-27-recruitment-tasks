export interface MenuItemType {
  name: string;
  url?: string;
  id: string;
  children?: MenuItemType[];
}