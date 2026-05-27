import Icon from '@/components/ui/icon';
import { Spawner, rarityColors, rarityBg } from '@/data/shopData';

interface SpawnerModalProps {
  spawner: Spawner;
  cartItems: number[];
  onClose: () => void;
  onCart: (id: number) => void;
}

export default function SpawnerModal({ spawner, cartItems, onClose, onCart }: SpawnerModalProps) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 animate-fade-in"
      onClick={onClose}
    >
      <div className="mc-card max-w-lg w-full p-6 animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`text-xs font-medium px-2 py-0.5 border ${rarityColors[spawner.rarity]} ${rarityBg[spawner.rarity]}`}>
              {spawner.rarityLabel}
            </span>
            <h2 className="text-2xl font-bold mt-2">{spawner.name}</h2>
          </div>
          <button onClick={onClose} className="text-[#8a8a8a] hover:text-white p-1">
            <Icon name="X" size={20} />
          </button>
        </div>
        {spawner.image ? (
          <div className="mb-4 border-2 border-[#3c3c3c] overflow-hidden h-48">
            <img src={spawner.image} alt={spawner.name} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="mb-4 border-2 border-[#3c3c3c] h-48 flex items-center justify-center bg-[#1a201a]">
            <span className="text-8xl animate-float">{spawner.mob}</span>
          </div>
        )}
        <p className="text-[#8a8a8a] text-sm mb-4">{spawner.description}</p>
        <div className="mb-5">
          <p className="text-xs text-[#8a8a8a] mb-2 uppercase tracking-wider">Дроп:</p>
          <div className="flex flex-wrap gap-2">
            {spawner.drops.map(drop => (
              <span key={drop} className="px-2 py-1 text-xs bg-[#141a14] border border-[#3c3c3c] text-[#e8e0c8]">{drop}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>
            {spawner.oldPrice && <span className="text-sm text-[#8a8a8a] line-through mr-2">{spawner.oldPrice} ₽</span>}
            <span className="text-2xl font-bold text-[#5a9a3c]">{spawner.price} ₽</span>
          </div>
          {spawner.inStock ? (
            <button
              onClick={() => { onCart(spawner.id); onClose(); }}
              className="mc-btn bg-[#5a9a3c] text-white px-6 py-2 font-semibold"
            >
              {cartItems.includes(spawner.id) ? '✓ В корзине' : 'В корзину'}
            </button>
          ) : (
            <span className="text-[#8a8a8a] text-sm">Нет в наличии</span>
          )}
        </div>
      </div>
    </div>
  );
}
