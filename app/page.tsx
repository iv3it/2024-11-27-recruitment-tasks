import MenuEmptyState from './components/MenuEmptyState';
import FormMenuPosition from './components/FormMenuPosition';
import MenuItemsList from './components/MenuItemsList';

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-[1168px] mx-auto">
        <main>
          <MenuEmptyState />
          <div className='mt-8'>
            <FormMenuPosition/>
          </div>
          <MenuItemsList />
        </main>
      </div>
    </div>
  );
}
