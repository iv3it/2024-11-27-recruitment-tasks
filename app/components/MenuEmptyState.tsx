'use client'

import { PlusCircleIcon } from '@heroicons/react/24/outline';
import FormMenuPosition from './FormMenuPosition';
import { MenuItemType } from '@/types';
import { useState } from 'react';

type MenuEmptyStateProps = {
  onAddMenuItem: (item: MenuItemType) => void;
};

export default function MenuEmptyState({ onAddMenuItem } : MenuEmptyStateProps) {
  let [isOpen, setIsOpen] = useState(false);

  const handleCancel = () => {
    setIsOpen(false);
  };

  return (
    <>
      <section className="w-full bg-[#F9FAFB] rounded-lg flex flex-col px-4 py-6 border border-[#EAECF0]">
        <div className='gap-y-1 flex flex-col mb-6'>
          <h1 className='font-semibold text-base text-center text-[var(--blueDark)]'>Menu jest puste</h1>
          <h2 className='text-sm text-center text-[var(--greyMedium)]'>W tym menu nie ma jeszcze żadnych linków.</h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className='shadow-[0_1px_2px_0px_rgba(16,24,40,0.05)] self-center py-[0.625rem] px-4 flex bg-[var(--purpleMedium)] border border-[var(--purpleMedium)] rounded-lg'>
          <PlusCircleIcon className="size-5 text-white mr-1" />
          <span className='text-sm text-white font-semibold'>Dodaj pozycję menu</span>
        </button>
      </section>

      {isOpen &&
        <div className='mt-8'>
          <FormMenuPosition onSubmit={onAddMenuItem} onCancel={handleCancel}/>
        </div>
      }
    </>
  );
}