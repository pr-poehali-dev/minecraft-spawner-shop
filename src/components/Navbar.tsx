import Icon from '@/components/ui/icon';
import { Page } from '@/data/shopData';

interface NavbarProps {
  page: Page;
  cartCount: number;
  setPage: (p: Page) => void;
}

const navItems: { key: Page; label: string }[] = [
  { key: 'home', label: 'Главная' },
  { key: 'catalog', label: 'Каталог' },
  { key: 'about', label: 'О магазине' },
  { key: 'reviews', label: 'Отзывы' },
  { key: 'contacts', label: 'Контакты' },
];

export default function Navbar({ page, cartCount, setPage }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0f150f]/95 backdrop-blur-sm border-b-2 border-[#3c3c3c]">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-14">
        <button onClick={() => setPage('home')} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#5a9a3c] border-2 border-[#3a6e22] flex items-center justify-center text-sm"
            style={{ boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.2), inset -1px -1px 0 rgba(0,0,0,0.4)' }}>
            ⚙️
          </div>
          <span className="font-display text-[#5a9a3c] text-lg tracking-tight">SpawnShop</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {navItems.map(item => (
            <button key={item.key} onClick={() => setPage(item.key)}
              className={`px-3 py-1.5 text-sm font-medium transition-all ${page === item.key ? 'bg-[#5a9a3c] text-white' : 'text-[#8a8a8a] hover:text-[#e8e0c8] hover:bg-[#1a201a]'}`}>
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setPage('account')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border-2 transition-all ${page === 'account' ? 'border-[#5a9a3c] bg-[#5a9a3c]/20 text-[#5a9a3c]' : 'border-[#3c3c3c] text-[#8a8a8a] hover:border-[#5a9a3c] hover:text-[#e8e0c8]'}`}>
            <Icon name="User" size={14} />
            <span className="hidden sm:inline">Кабинет</span>
          </button>
          <button className="relative flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium border-2 border-[#3c3c3c] text-[#8a8a8a] hover:border-[#f5c542] hover:text-[#f5c542] transition-all">
            <Icon name="ShoppingCart" size={14} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#f5c542] text-black text-xs font-bold flex items-center justify-center">{cartCount}</span>
            )}
          </button>
        </div>
      </div>

      <div className="md:hidden flex overflow-x-auto border-t border-[#3c3c3c]">
        {navItems.map(item => (
          <button key={item.key} onClick={() => setPage(item.key)}
            className={`flex-shrink-0 px-4 py-2 text-xs font-medium transition-all ${page === item.key ? 'text-[#5a9a3c] border-b-2 border-[#5a9a3c]' : 'text-[#8a8a8a]'}`}>
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
