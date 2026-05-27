import { Spawner, rarityColors, rarityBg } from '@/data/shopData';

interface SpawnerCardProps {
  spawner: Spawner;
  index: number;
  onSelect: (s: Spawner) => void;
  onCart: (id: number) => void;
  cartItems: number[];
}

export default function SpawnerCard({ spawner, index, onSelect, onCart, cartItems }: SpawnerCardProps) {
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
