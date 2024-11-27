import { PlusCircleIcon } from '@heroicons/react/24/outline'; 

export default function MenuEmptyState() {
  return (
    <section className="w-full bg-[#F9FAFB] rounded-lg flex flex-col px-4 py-6 border border-[#EAECF0]">
      <div className='gap-y-1 flex flex-col mb-6'>
        <h1 className='font-semibold text-base text-center text-[var(--blueDark)]'>Menu jest puste</h1>
        <h2 className='text-sm text-center text-[var(--greyMedium)]'>W tym menu nie ma jeszcze żadnych linków.</h2>
      </div>
      <button className='shadow-sm shadow-[rgba(16, 24, 40, 0.05)] self-center py-[10px] px-4 flex bg-[var(--purpleMedium)] border border-[var(--purpleMedium)] rounded-lg'>
        <PlusCircleIcon className="size-5 text-white mr-1" />
        <span className='text-sm text-white font-semibold'>Dodaj pozycję menu</span>
      </button>
    </section>
  );
}