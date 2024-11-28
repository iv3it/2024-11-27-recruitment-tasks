import MenuEmptyState from './components/MenuEmptyState';
import FormMenuPosition from './components/FormMenuPosition';

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-6">
      <div className="w-full max-w-[1168px] mx-auto">
        <main>
          <MenuEmptyState />
          <FormMenuPosition/>
        </main>
      </div>
    </div>
  );
}
