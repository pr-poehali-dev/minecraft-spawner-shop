import { useState } from 'react';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'catalog' | 'about' | 'reviews' | 'contacts' | 'account';

const SPAWNERS = [
  {
    id: 1,
    name: 'Спавнер Зомби',
    mob: '🧟',
    price: 149,
    oldPrice: 220,
    rarity: 'common',
    rarityLabel: 'Обычный',
    description: 'Классический спавнер зомби. Идеален для фарм-механик и получения ресурсов.',
    drops: ['Гнилое мясо', 'Железо', 'Картофель'],
    image: 'https://cdn.poehali.dev/projects/f1f6be35-ef21-4d17-913c-d15aa73232ed/files/77cdca94-61b3-4db6-8042-5b5e6c7d0db0.jpg',
    inStock: true,
  },
  {
    id: 2,
    name: 'Спавнер Паука',
    mob: '🕷️',
    price: 189,
    oldPrice: null,
    rarity: 'common',
    rarityLabel: 'Обычный',
    description: 'Спавнер паука для добычи нитей и паучьих глаз.',
    drops: ['Нить', 'Паучий глаз'],
    image: 'https://cdn.poehali.dev/projects/f1f6be35-ef21-4d17-913c-d15aa73232ed/files/c996b3ee-47bd-42df-88eb-2cd5685bc1d2.jpg',
    inStock: true,
  },
  {
    id: 3,
    name: 'Спавнер Ифрита',
    mob: '🔥',
    price: 599,
    oldPrice: 799,
    rarity: 'rare',
    rarityLabel: 'Редкий',
    description: 'Огненный спавнер из нижнего мира. Незаменим для крафта огненных палочек.',
    drops: ['Огненная палочка', 'Огненный заряд'],
    image: 'https://cdn.poehali.dev/projects/f1f6be35-ef21-4d17-913c-d15aa73232ed/files/72ca7aef-3981-4995-a4bd-ee08ecedc3a8.jpg',
    inStock: true,
  },
  {
    id: 4,
    name: 'Спавнер Скелета',
    mob: '💀',
    price: 199,
    oldPrice: null,
    rarity: 'common',
    rarityLabel: 'Обычный',
    description: 'Спавнер скелета — лучший источник стрел и костей для костной муки.',
    drops: ['Кости', 'Стрелы', 'Луки'],
    image: null,
    inStock: true,
  },
  {
    id: 5,
    name: 'Спавнер Эндермена',
    mob: '👁️',
    price: 899,
    oldPrice: null,
    rarity: 'epic',
    rarityLabel: 'Эпический',
    description: 'Эндермен-спавнер для фарма жемчуга Края. Редкий и очень ценный.',
    drops: ['Жемчуг Края', 'Опыт'],
    image: null,
    inStock: false,
  },
  {
    id: 6,
    name: 'Спавнер Крипера',
    mob: '💚',
    price: 349,
    oldPrice: 450,
    rarity: 'uncommon',
    rarityLabel: 'Необычный',
    description: 'Спавнер крипера для добычи пороха. Осторожно — взрывоопасно!',
    drops: ['Порох', 'Музыкальные диски'],
    image: null,
    inStock: true,
  },
];

const ORDERS = [
  { id: '#MC-4821', date: '24 мая 2026', item: 'Спавнер Зомби', statusLabel: 'Доставлен', price: 149 },
  { id: '#MC-4799', date: '18 мая 2026', item: 'Спавнер Ифрита', statusLabel: 'Доставлен', price: 599 },
  { id: '#MC-4701', date: '5 мая 2026', item: 'Спавнер Паука', statusLabel: 'Доставлен', price: 189 },
];

const REVIEWS = [
  { name: 'Алексей_Геймер', avatar: '🧙', rating: 5, date: '22 мая 2026', text: 'Купил спавнер ифрита — всё пришло мгновенно, работает отлично. Ребята знают своё дело!', item: 'Спавнер Ифрита' },
  { name: 'MineQueen99', avatar: '👸', rating: 5, date: '15 мая 2026', text: 'Заказываю уже третий раз. Быстро, надёжно, без лишних вопросов. Спавнер зомби работает круглосуточно.', item: 'Спавнер Зомби' },
  { name: 'CreeperHunter', avatar: '⚔️', rating: 4, date: '10 мая 2026', text: 'Хороший магазин, цены адекватные. Хотелось бы больше редких спавнеров в наличии.', item: 'Спавнер Крипера' },
  { name: 'DiamondSteve', avatar: '💎', rating: 5, date: '2 мая 2026', text: 'Лучший магазин спавнеров! Поддержка ответила за 5 минут. Буду покупать ещё.', item: 'Спавнер Эндермена' },
];

const rarityColors: Record<string, string> = {
  common: 'text-[#8a8a8a] border-[#8a8a8a]',
  uncommon: 'text-[#5a9a3c] border-[#5a9a3c]',
  rare: 'text-blue-400 border-blue-400',
  epic: 'text-purple-400 border-purple-400',
  legendary: 'text-[#f5c542] border-[#f5c542]',
};

const rarityBg: Record<string, string> = {
  common: 'bg-[#8a8a8a]/10',
  uncommon: 'bg-[#5a9a3c]/10',
  rare: 'bg-blue-500/10',
  epic: 'bg-purple-500/10',
  legendary: 'bg-[#f5c542]/10',
};

function SpawnerCard({
  spawner, index, onSelect, onCart, cartItems,
}: {
  spawner: typeof SPAWNERS[0];
  index: number;
  onSelect: (s: typeof SPAWNERS[0]) => void;
  onCart: (id: number) => void;
  cartItems: number[];
}) {
  const inCart = cartItems.includes(spawner.id);
  return (
    <div
      className="mc-card cursor-pointer transition-all duration-200 animate-fade-in-up flex flex-col"
      style={{ animationDelay: `${index * 0.07}s`, opacity: 0 }}
      onClick={() => onSelect(spawner)}
    >
      <div className="relative h-40 bg-[#141a14] border-b-2 border-[#3c3c3c] overflow-hidden">
        {spawner.image ? (
          <img src={spawner.image} alt={spawner.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl"
            style={{ animation: 'float 3s ease-in-out infinite', animationDelay: `${index * 0.4}s` }}>
            {spawner.mob}
          </div>
        )}
        <div className="absolute top-2 left-2">
          <span className={`text-xs px-2 py-0.5 border font-medium ${rarityColors[spawner.rarity]} ${rarityBg[spawner.rarity]}`}>
            {spawner.rarityLabel}
          </span>
        </div>
        {!spawner.inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="text-[#8a8a8a] font-bold text-sm uppercase tracking-wider">Нет в наличии</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold mb-1">{spawner.name}</h3>
        <p className="text-[#8a8a8a] text-xs mb-3 line-clamp-2">{spawner.description}</p>
        <div className="flex flex-wrap gap-1 mb-4">
          {spawner.drops.slice(0, 2).map(drop => (
            <span key={drop} className="text-xs px-1.5 py-0.5 bg-[#141a14] border border-[#3c3c3c] text-[#8a8a8a]">{drop}</span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            {spawner.oldPrice && <span className="text-xs text-[#8a8a8a] line-through mr-1">{spawner.oldPrice} ₽</span>}
            <span className="text-lg font-bold text-[#5a9a3c]">{spawner.price} ₽</span>
          </div>
          {spawner.inStock && (
            <button
              onClick={e => { e.stopPropagation(); onCart(spawner.id); }}
              className={`mc-btn text-xs px-3 py-1.5 font-semibold transition-all ${inCart ? 'bg-[#3a6e22] text-white' : 'bg-[#5a9a3c] text-white hover:bg-[#4a8a2c]'}`}
            >
              {inCart ? '✓ В корзине' : '+ В корзину'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [cartCount, setCartCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [selectedSpawner, setSelectedSpawner] = useState<typeof SPAWNERS[0] | null>(null);
  const [cartItems, setCartItems] = useState<number[]>([]);

  const addToCart = (id: number) => {
    if (!cartItems.includes(id)) {
      setCartItems(prev => [...prev, id]);
      setCartCount(c => c + 1);
    }
  };

  const navItems: { key: Page; label: string }[] = [
    { key: 'home', label: 'Главная' },
    { key: 'catalog', label: 'Каталог' },
    { key: 'about', label: 'О магазине' },
    { key: 'reviews', label: 'Отзывы' },
    { key: 'contacts', label: 'Контакты' },
  ];

  const filteredSpawners = filter === 'all' ? SPAWNERS : SPAWNERS.filter(s => s.rarity === filter);

  return (
    <div className="min-h-screen bg-[#141a14] font-rubik text-[#e8e0c8]">

      {/* NAV */}
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

      {/* MODAL */}
      {selectedSpawner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in" onClick={() => setSelectedSpawner(null)}>
          <div className="mc-card max-w-lg w-full p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className={`text-xs font-medium px-2 py-0.5 border ${rarityColors[selectedSpawner.rarity]} ${rarityBg[selectedSpawner.rarity]}`}>
                  {selectedSpawner.rarityLabel}
                </span>
                <h2 className="text-2xl font-bold mt-2">{selectedSpawner.name}</h2>
              </div>
              <button onClick={() => setSelectedSpawner(null)} className="text-[#8a8a8a] hover:text-white p-1">
                <Icon name="X" size={20} />
              </button>
            </div>
            {selectedSpawner.image ? (
              <div className="mb-4 border-2 border-[#3c3c3c] overflow-hidden h-48">
                <img src={selectedSpawner.image} alt={selectedSpawner.name} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="mb-4 border-2 border-[#3c3c3c] h-48 flex items-center justify-center bg-[#1a201a]">
                <span className="text-8xl animate-float">{selectedSpawner.mob}</span>
              </div>
            )}
            <p className="text-[#8a8a8a] text-sm mb-4">{selectedSpawner.description}</p>
            <div className="mb-5">
              <p className="text-xs text-[#8a8a8a] mb-2 uppercase tracking-wider">Дроп:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSpawner.drops.map(drop => (
                  <span key={drop} className="px-2 py-1 text-xs bg-[#141a14] border border-[#3c3c3c] text-[#e8e0c8]">{drop}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {selectedSpawner.oldPrice && <span className="text-sm text-[#8a8a8a] line-through mr-2">{selectedSpawner.oldPrice} ₽</span>}
                <span className="text-2xl font-bold text-[#5a9a3c]">{selectedSpawner.price} ₽</span>
              </div>
              {selectedSpawner.inStock ? (
                <button onClick={() => { addToCart(selectedSpawner.id); setSelectedSpawner(null); }}
                  className="mc-btn bg-[#5a9a3c] text-white px-6 py-2 font-semibold">
                  {cartItems.includes(selectedSpawner.id) ? '✓ В корзине' : 'В корзину'}
                </button>
              ) : (
                <span className="text-[#8a8a8a] text-sm">Нет в наличии</span>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 py-8">

        {/* HOME */}
        {page === 'home' && (
          <div>
            <div className="relative mb-12 overflow-hidden border-2 border-[#3c3c3c] bg-[#1a201a] p-8 md:p-14"
              style={{ boxShadow: '6px 6px 0 rgba(0,0,0,0.5)' }}>
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 31px, #5a9a3c 31px, #5a9a3c 32px), repeating-linear-gradient(90deg, transparent, transparent 31px, #5a9a3c 31px, #5a9a3c 32px)',
              }} />
              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-0.5 w-8 bg-[#5a9a3c]" />
                  <span className="text-[#5a9a3c] text-xs font-medium uppercase tracking-widest">Официальный магазин</span>
                </div>
                <h1 className="font-display text-4xl md:text-6xl text-[#e8e0c8] leading-tight mb-4">
                  SPAWN<br /><span className="text-[#5a9a3c]">SHOP</span>
                </h1>
                <p className="text-[#8a8a8a] text-lg mb-8 max-w-md">
                  Магазин спавнеров для Minecraft-сервера. Быстрая доставка, честные цены, гарантия качества.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => setPage('catalog')} className="mc-btn bg-[#5a9a3c] text-white px-8 py-3 font-semibold text-sm uppercase tracking-wide">
                    Смотреть каталог
                  </button>
                  <button onClick={() => setPage('account')} className="mc-btn bg-[#1f2b1f] text-[#e8e0c8] px-8 py-3 font-semibold text-sm uppercase tracking-wide border-[#3c3c3c]">
                    Личный кабинет
                  </button>
                </div>
              </div>
              <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
                {['🧟', '🔥', '💀'].map((mob, i) => (
                  <div key={i} className="w-16 h-16 border-2 border-[#3c3c3c] bg-[#141a14] flex items-center justify-center text-3xl"
                    style={{ animation: 'float 3s ease-in-out infinite', animationDelay: `${i * 0.7}s`, boxShadow: 'inset 1px 1px 0 rgba(255,255,255,0.05)' }}>
                    {mob}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
              {[
                { value: '500+', label: 'Заказов выполнено', icon: '📦' },
                { value: '20+', label: 'Видов спавнеров', icon: '⚙️' },
                { value: '4.9', label: 'Средняя оценка', icon: '⭐' },
                { value: '24/7', label: 'Поддержка онлайн', icon: '💬' },
              ].map((stat, i) => (
                <div key={i} className="mc-card p-5 text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="text-3xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-[#5a9a3c]">{stat.value}</div>
                  <div className="text-xs text-[#8a8a8a] mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Популярные спавнеры</h2>
              <button onClick={() => setPage('catalog')} className="text-[#5a9a3c] text-sm hover:underline flex items-center gap-1">
                Все <Icon name="ArrowRight" size={14} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SPAWNERS.slice(0, 3).map((s, i) => (
                <SpawnerCard key={s.id} spawner={s} index={i} onSelect={setSelectedSpawner} onCart={addToCart} cartItems={cartItems} />
              ))}
            </div>
          </div>
        )}

        {/* CATALOG */}
        {page === 'catalog' && (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-1">Каталог</h1>
              <p className="text-[#8a8a8a]">Все доступные спавнеры для вашего сервера</p>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { key: 'all', label: 'Все' },
                { key: 'common', label: 'Обычные' },
                { key: 'uncommon', label: 'Необычные' },
                { key: 'rare', label: 'Редкие' },
                { key: 'epic', label: 'Эпические' },
              ].map(f => (
                <button key={f.key} onClick={() => setFilter(f.key)}
                  className={`px-4 py-1.5 text-sm font-medium border-2 transition-all ${filter === f.key ? 'border-[#5a9a3c] bg-[#5a9a3c]/20 text-[#5a9a3c]' : 'border-[#3c3c3c] text-[#8a8a8a] hover:border-[#8a8a8a] hover:text-[#e8e0c8]'}`}>
                  {f.label}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSpawners.map((s, i) => (
                <SpawnerCard key={s.id} spawner={s} index={i} onSelect={setSelectedSpawner} onCart={addToCart} cartItems={cartItems} />
              ))}
            </div>
            {filteredSpawners.length === 0 && (
              <div className="text-center py-20 text-[#8a8a8a]">
                <div className="text-5xl mb-3">📦</div>
                <p>Спавнеры не найдены</p>
              </div>
            )}
          </div>
        )}

        {/* ABOUT */}
        {page === 'about' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-8">О магазине</h1>
            <div className="mc-card p-6 mb-4 animate-fade-in-up" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#5a9a3c]/20 border-2 border-[#5a9a3c] flex items-center justify-center text-xl">🏪</div>
                <h2 className="text-xl font-bold">SpawnShop</h2>
              </div>
              <p className="text-[#8a8a8a] leading-relaxed">
                SpawnShop — специализированный магазин спавнеров для Minecraft-серверов. Работаем с 2022 года, выполнили более 500 заказов. Постоянно следим за ассортиментом и добавляем новые позиции.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {[
                { icon: '⚡', title: 'Мгновенная выдача', desc: 'Спавнер поступает на аккаунт сразу после оплаты' },
                { icon: '🛡️', title: 'Гарантия качества', desc: 'Все спавнеры проверены и работают без сбоев' },
                { icon: '💬', title: 'Поддержка 24/7', desc: 'Операторы всегда готовы помочь с любым вопросом' },
                { icon: '💰', title: 'Честные цены', desc: 'Прозрачное ценообразование без скрытых комиссий' },
              ].map((item, i) => (
                <div key={i} className="mc-card p-5 animate-fade-in-up" style={{ animationDelay: `${0.1 + i * 0.07}s`, opacity: 0 }}>
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-[#8a8a8a] text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mc-card p-6 animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
              <h2 className="text-lg font-bold mb-3">Как сделать заказ?</h2>
              <div className="space-y-3">
                {['Выберите спавнер в каталоге', 'Добавьте товар в корзину', 'Оформите заказ и оплатите', 'Получите спавнер мгновенно'].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-[#5a9a3c] text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</div>
                    <span className="text-[#8a8a8a] text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {page === 'reviews' && (
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-1">Отзывы</h1>
              <p className="text-[#8a8a8a]">{REVIEWS.length} отзыва · средняя оценка 4.9 ⭐</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {REVIEWS.map((r, i) => (
                <div key={i} className="mc-card p-5 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1f2b1f] border-2 border-[#3c3c3c] flex items-center justify-center text-xl">{r.avatar}</div>
                      <div>
                        <p className="font-semibold text-sm">{r.name}</p>
                        <p className="text-xs text-[#8a8a8a]">{r.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={j < r.rating ? 'text-[#f5c542]' : 'text-[#3c3c3c]'}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#8a8a8a] text-sm leading-relaxed mb-3">"{r.text}"</p>
                  <span className="text-xs border border-[#3c3c3c] px-2 py-0.5 text-[#8a8a8a]">{r.item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {page === 'contacts' && (
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8">Контакты</h1>
            <div className="space-y-4 mb-8">
              {[
                { icon: 'MessageCircle', label: 'Telegram', value: '@spawnshop_support', desc: 'Основной канал поддержки' },
                { icon: 'Mail', label: 'Email', value: 'support@spawnshop.mc', desc: 'Ответ в течение 2 часов' },
                { icon: 'Clock', label: 'Время работы', value: '24 / 7', desc: 'Всегда онлайн' },
              ].map((c, i) => (
                <div key={i} className="mc-card p-5 flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="w-12 h-12 bg-[#5a9a3c]/20 border-2 border-[#5a9a3c]/50 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={20} className="text-[#5a9a3c]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#8a8a8a] uppercase tracking-wider mb-0.5">{c.label}</p>
                    <p className="font-bold">{c.value}</p>
                    <p className="text-xs text-[#8a8a8a]">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mc-card p-6 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <h2 className="font-bold mb-4">Написать нам</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#8a8a8a] uppercase tracking-wider block mb-1">Ваш никнейм</label>
                  <input type="text" placeholder="Steve_2024"
                    className="w-full bg-[#141a14] border-2 border-[#3c3c3c] focus:border-[#5a9a3c] outline-none px-3 py-2 text-sm text-[#e8e0c8] transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-[#8a8a8a] uppercase tracking-wider block mb-1">Сообщение</label>
                  <textarea rows={4} placeholder="Опишите вопрос..."
                    className="w-full bg-[#141a14] border-2 border-[#3c3c3c] focus:border-[#5a9a3c] outline-none px-3 py-2 text-sm text-[#e8e0c8] transition-colors resize-none" />
                </div>
                <button className="mc-btn w-full bg-[#5a9a3c] text-white py-2.5 font-semibold text-sm uppercase tracking-wide">
                  Отправить сообщение
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ACCOUNT */}
        {page === 'account' && (
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-[#1f2b1f] border-2 border-[#5a9a3c] flex items-center justify-center text-3xl">🧑‍💻</div>
              <div>
                <h1 className="text-2xl font-bold">Steve_Player</h1>
                <p className="text-[#8a8a8a] text-sm">Участник с апреля 2026</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { label: 'Заказов', value: String(ORDERS.length), gold: false },
                { label: 'Потрачено', value: `${ORDERS.reduce((a, o) => a + o.price, 0)} ₽`, gold: false },
                { label: 'Статус', value: 'VIP', gold: true },
              ].map((s, i) => (
                <div key={i} className="mc-card p-4 text-center">
                  <div className={`text-xl font-bold ${s.gold ? 'text-[#f5c542]' : 'text-[#5a9a3c]'}`}>{s.value}</div>
                  <div className="text-xs text-[#8a8a8a] mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <h2 className="text-lg font-bold mb-4">История заказов</h2>
            <div className="space-y-3 mb-6">
              {ORDERS.map((order, i) => (
                <div key={i} className="mc-card p-4 flex items-center justify-between animate-fade-in-up" style={{ animationDelay: `${i * 0.08}s`, opacity: 0 }}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#5a9a3c]/20 border border-[#5a9a3c]/40 flex items-center justify-center text-lg">⚙️</div>
                    <div>
                      <p className="font-semibold text-sm">{order.item}</p>
                      <p className="text-xs text-[#8a8a8a]">{order.id} · {order.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-[#5a9a3c]">{order.price} ₽</p>
                    <span className="text-xs text-[#5a9a3c] border border-[#5a9a3c]/40 px-2 py-0.5">{order.statusLabel}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mc-card p-4">
              <h3 className="font-bold mb-3 text-sm">Настройки аккаунта</h3>
              <div className="space-y-2">
                {[
                  { label: 'Изменить никнейм', danger: false },
                  { label: 'Уведомления о заказах', danger: false },
                  { label: 'Выйти из аккаунта', danger: true },
                ].map((item, i) => (
                  <button key={i}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between border border-[#3c3c3c] hover:border-[#5a9a3c] transition-colors ${item.danger ? 'text-red-400 hover:border-red-500' : 'text-[#8a8a8a] hover:text-[#e8e0c8]'}`}>
                    {item.label}
                    <Icon name="ChevronRight" size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t-2 border-[#3c3c3c] bg-[#0f150f]">
        <div className="pixel-divider" />
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚙️</span>
            <span className="font-display text-[#5a9a3c]">SpawnShop</span>
          </div>
          <p className="text-[#8a8a8a] text-xs text-center">
            © 2026 SpawnShop · Магазин спавнеров для Minecraft · Не аффилирован с Mojang
          </p>
          <div className="flex gap-4 text-xs text-[#8a8a8a]">
            <button className="hover:text-[#e8e0c8]">Правила</button>
            <button className="hover:text-[#e8e0c8]">Конфиденциальность</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
