import FormMenuPosition from "./FormMenuPosition";
import { MenuItemType } from '@/types';
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities'

interface MenuItemProps {
  item: MenuItemType;
  id: number;
}

export default function MenuItem({item, id} : MenuItemProps) {
  let {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});
  let styleDND = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={styleDND} className="touch-none">
      <div className="bg-white py-5 pl-[2.125rem] pr-6 flex items-center border-b border-b-[#EAECF0]">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.16667 7.50002L1.66667 10M1.66667 10L4.16667 12.5M1.66667 10H18.3333M7.5 4.16669L10 1.66669M10 1.66669L12.5 4.16669M10 1.66669V18.3334M12.5 15.8334L10 18.3334M10 18.3334L7.5 15.8334M15.8333 7.50002L18.3333 10M18.3333 10L15.8333 12.5" stroke="#475467" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div className="ml-3 pr-1 grow">
          <p className="text-[var(--blueDark)] text-sm font-semibold">{item.name}</p>
          <p className="text-[var(--greyMedium)] text-sm mt-[0.375rem]">{item.url}</p>
        </div>
        <div className="shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] border border-[var(--greyLight)] rounded-lg flex gap-x-[1px] bg-[var(--greyLight)] overflow-hidden">
          <button className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Usuń</button>
          <button className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Edytuj</button>
          <button className="py-[0.625rem] px-4 text-sm text-[var(--greyDark)] font-semibold bg-white">Dodaj pozycję menu</button>
        </div>
      </div>
      <div className="py-4 px-6 bg-[#f9fafb] border-b border-b-[#EAECF0]">
        <FormMenuPosition />
      </div>
    </div>
  );
}
