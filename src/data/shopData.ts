export type Page = 'home' | 'catalog' | 'about' | 'reviews' | 'contacts' | 'account';

export const SPAWNERS = [
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

export type Spawner = typeof SPAWNERS[0];

export const ORDERS = [
  { id: '#MC-4821', date: '24 мая 2026', item: 'Спавнер Зомби', statusLabel: 'Доставлен', price: 149 },
  { id: '#MC-4799', date: '18 мая 2026', item: 'Спавнер Ифрита', statusLabel: 'Доставлен', price: 599 },
  { id: '#MC-4701', date: '5 мая 2026', item: 'Спавнер Паука', statusLabel: 'Доставлен', price: 189 },
];

export const REVIEWS = [
  { name: 'Алексей_Геймер', avatar: '🧙', rating: 5, date: '22 мая 2026', text: 'Купил спавнер ифрита — всё пришло мгновенно, работает отлично. Ребята знают своё дело!', item: 'Спавнер Ифрита' },
  { name: 'MineQueen99', avatar: '👸', rating: 5, date: '15 мая 2026', text: 'Заказываю уже третий раз. Быстро, надёжно, без лишних вопросов. Спавнер зомби работает круглосуточно.', item: 'Спавнер Зомби' },
  { name: 'CreeperHunter', avatar: '⚔️', rating: 4, date: '10 мая 2026', text: 'Хороший магазин, цены адекватные. Хотелось бы больше редких спавнеров в наличии.', item: 'Спавнер Крипера' },
  { name: 'DiamondSteve', avatar: '💎', rating: 5, date: '2 мая 2026', text: 'Лучший магазин спавнеров! Поддержка ответила за 5 минут. Буду покупать ещё.', item: 'Спавнер Эндермена' },
];

export const rarityColors: Record<string, string> = {
  common: 'text-[#8a8a8a] border-[#8a8a8a]',
  uncommon: 'text-[#5a9a3c] border-[#5a9a3c]',
  rare: 'text-blue-400 border-blue-400',
  epic: 'text-purple-400 border-purple-400',
  legendary: 'text-[#f5c542] border-[#f5c542]',
};

export const rarityBg: Record<string, string> = {
  common: 'bg-[#8a8a8a]/10',
  uncommon: 'bg-[#5a9a3c]/10',
  rare: 'bg-blue-500/10',
  epic: 'bg-purple-500/10',
  legendary: 'bg-[#f5c542]/10',
};
