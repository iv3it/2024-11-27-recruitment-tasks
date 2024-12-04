'use client'

import { useMenuItemsStore } from './state/state';
import MenuEmptyState from './components/MenuEmptyState';
import MenuItemsList from './components/MenuItemsList';

export default function Home() {
  let menuItems = useMenuItemsStore((state) => state.menuItems);

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-[1168px] mx-auto">
        <main>
          {menuItems.length === 0 ? (
            <MenuEmptyState />
          ) : (
            <MenuItemsList />
          )}
        </main>
      </div>
    </div>
  );
}
