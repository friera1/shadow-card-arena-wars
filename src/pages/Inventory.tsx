
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package, Filter, Search, Grid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";
import { useToast } from "@/hooks/use-toast";

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  quantity: number;
  description?: string;
}

const Inventory = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const { toast } = useToast();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const inventoryItems: InventoryItem[] = [
    { id: 1, name: "Меч Света", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "weapon", rarity: "legendary", quantity: 1, description: "Легендарный меч, излучающий божественный свет" },
    { id: 2, name: "Зелье Здоровья", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=125&h=125&fit=crop", type: "potion", rarity: "common", quantity: 5, description: "Восстанавливает 50 единиц здоровья" },
    { id: 3, name: "Щит Защиты", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "armor", rarity: "epic", quantity: 1, description: "Эпический щит с магической защитой" },
    { id: 4, name: "Кольцо Силы", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=125&h=125&fit=crop", type: "accessory", rarity: "rare", quantity: 2, description: "Увеличивает силу атаки на 15%" },
    { id: 5, name: "Магический Кристалл", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=125&h=125&fit=crop", type: "material", rarity: "epic", quantity: 3, description: "Используется для создания заклинаний" },
    { id: 6, name: "Свиток Огня", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=125&h=125&fit=crop", type: "scroll", rarity: "rare", quantity: 4, description: "Наносит 75 урона огнем" },
  ];

  const rarityColors = {
    common: "border-gray-500 bg-gray-800",
    rare: "border-blue-500 bg-blue-900/30",
    epic: "border-purple-500 bg-purple-900/30", 
    legendary: "border-yellow-500 bg-yellow-900/30"
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleFilterChange = (filter: string) => {
    playSound('click');
    setSelectedFilter(filter);
  };

  const handleItemClick = (item: InventoryItem) => {
    playSound('click');
    setSelectedItem(item);
    toast({
      title: item.name,
      description: item.description || `${item.type} • ${item.rarity}`,
      duration: 3000,
    });
  };

  const filterButtons = [
    { id: 'all', label: 'Все предметы' },
    { id: 'weapon', label: 'Оружие' },
    { id: 'armor', label: 'Броня' },
    { id: 'potion', label: 'Зелья' },
    { id: 'accessory', label: 'Аксессуары' },
    { id: 'material', label: 'Материалы' },
    { id: 'scroll', label: 'Свитки' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => {
                playSound('click');
                navigate('/');
              }}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <Package className="w-8 h-8 text-gray-300" />
              <h1 className="text-3xl font-bold text-white">Моя Сумка</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Поиск предметов..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none"
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                playSound('click');
                setViewMode(viewMode === 'grid' ? 'list' : 'grid');
              }}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {filterButtons.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? 'default' : 'outline'}
              onClick={() => handleFilterChange(filter.id)}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white text-sm"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Inventory Grid */}
        <div className={`grid gap-4 ${viewMode === 'grid' 
          ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
        }`}>
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`${rarityColors[item.rarity]} border-2 hover:scale-105 transition-all duration-200 cursor-pointer relative group animate-fade-in`}
              onClick={() => handleItemClick(item)}
            >
              <CardContent className={viewMode === 'grid' ? "p-2" : "p-4 flex items-center gap-4"}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`object-cover rounded-md ${viewMode === 'grid' ? 'w-[125px] h-[125px]' : 'w-16 h-16'}`}
                  />
                  {item.quantity > 1 && (
                    <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-600">
                      {item.quantity}
                    </div>
                  )}
                </div>
                <div className={viewMode === 'grid' ? "mt-2" : "flex-1"}>
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-gray-400 text-xs capitalize">{item.rarity} {item.type}</p>
                  {viewMode === 'list' && item.description && (
                    <p className="text-gray-500 text-xs mt-1">{item.description}</p>
                  )}
                </div>
                
                {/* Hover overlay for grid view */}
                {viewMode === 'grid' && (
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col justify-center items-center p-2">
                    <p className="text-white text-sm font-bold text-center">{item.name}</p>
                    <p className="text-gray-300 text-xs text-center mt-1 capitalize">{item.rarity} {item.type}</p>
                    {item.description && (
                      <p className="text-gray-400 text-xs text-center mt-2">{item.description}</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Предметы не найдены</p>
            <p className="text-gray-500 text-sm mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
            <div className="text-2xl font-bold text-white">{inventoryItems.length}</div>
            <div className="text-sm text-gray-400">Всего предметов</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
            <div className="text-2xl font-bold text-yellow-400">{inventoryItems.filter(item => item.rarity === 'legendary').length}</div>
            <div className="text-sm text-gray-400">Легендарных</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
            <div className="text-2xl font-bold text-purple-400">{inventoryItems.filter(item => item.rarity === 'epic').length}</div>
            <div className="text-sm text-gray-400">Эпических</div>
          </div>
          <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 text-center">
            <div className="text-2xl font-bold text-blue-400">{inventoryItems.filter(item => item.rarity === 'rare').length}</div>
            <div className="text-sm text-gray-400">Редких</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
