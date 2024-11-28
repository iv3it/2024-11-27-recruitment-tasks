import MenuItem from './MenuItem';

export default function MenuItemsList() {
  return (
    <div className="border border-[var(--greyLight)] rounded-lg my-9 overflow-hidden">
      <div>
        <MenuItem />      
      </div>
      <div className="bg-[var(--background)] py-5 px-6">
        <button className="bg-white border border-[var(--greyLight)] py-[0.625rem] px-4 shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg font-semibold text-[var(----greyDark)] text-sm">Dodaj pozycję menu</button>
      </div>
    </div>
  );
}