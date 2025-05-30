
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Filter, Search, ChevronDown } from "lucide-react";
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
  const [showFilters, setShowFilters] = useState(false);

  const inventoryItems: InventoryItem[] = [
    { id: 1, name: "Меч Света", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "weapon", rarity: "legendary", quantity: 1, description: "Легендарный меч, излучающий божественный свет" },
    { id: 2, name: "Зелье Здоровья", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=125&h=125&fit=crop", type: "potion", rarity: "common", quantity: 5, description: "Восстанавливает 50 единиц здоровья" },
    { id: 3, name: "Щит Защиты", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "armor", rarity: "epic", quantity: 1, description: "Эпический щит с магической защитой" },
    { id: 4, name: "Кольцо Силы", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=125&h=125&fit=crop", type: "accessory", rarity: "rare", quantity: 2, description: "Увеличивает силу атаки на 15%" },
    { id: 5, name: "Магический Кристалл", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=125&h=125&fit=crop", type: "material", rarity: "epic", quantity: 3, description: "Используется для создания заклинаний" },
    { id: 6, name: "Свиток Огня", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=125&h=125&fit=crop", type: "scroll", rarity: "rare", quantity: 4, description: "Наносит 75 урона огнем" },
    { id: 7, name: "Длинное название предмета которое может не поместиться", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=125&h=125&fit=crop", type: "scroll", rarity: "rare", quantity: 4, description: "Тест переноса текста" },
  ];

  const rarityColors = {
    common: "border-gray-500",
    rare: "border-blue-500",
    epic: "border-purple-500", 
    legendary: "border-yellow-500"
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filterOptions = [
    { id: 'all', label: 'Все предметы' },
    { id: 'weapon', label: 'Оружие' },
    { id: 'armor', label: 'Броня' },
    { id: 'potion', label: 'Зелья' },
    { id: 'accessory', label: 'Аксессуары' },
    { id: 'material', label: 'Материалы' },
    { id: 'scroll', label: 'Свитки' },
  ];

  const handleItemClick = (item: InventoryItem) => {
    playSound('click');
    toast({
      title: item.name,
      description: item.description || `${item.type} • ${item.rarity}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => {
              playSound('click');
              navigate('/');
            }}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 sm:px-4 sm:py-2"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Назад</span>
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center flex-1 mx-2">The Collectors World</h1>
          <div className="text-white text-xs sm:text-sm">19:13:09</div>
        </div>

        {/* Search and Filter */}
        <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск предметов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:outline-none text-sm sm:text-base"
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between border-gray-600 text-gray-300 hover:bg-gray-700 text-sm sm:text-base"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span className="truncate">{filterOptions.find(f => f.id === selectedFilter)?.label}</span>
              </div>
              <ChevronDown className="w-4 h-4 flex-shrink-0" />
            </Button>
            
            {showFilters && (
              <Card className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border-gray-600 z-10">
                <CardContent className="p-2">
                  {filterOptions.map((filter) => (
                    <Button
                      key={filter.id}
                      variant="ghost"
                      onClick={() => {
                        setSelectedFilter(filter.id);
                        setShowFilters(false);
                        playSound('click');
                      }}
                      className="w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white text-sm"
                    >
                      {filter.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="cursor-pointer transition-transform duration-200 hover:scale-105"
              onClick={() => handleItemClick(item)}
            >
              <div className="space-y-1 sm:space-y-2">
                <div className={`relative border-2 ${rarityColors[item.rarity]} rounded-lg overflow-hidden bg-gray-800`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full aspect-square object-cover"
                    style={{ minWidth: '80px', maxWidth: '125px' }}
                  />
                  {item.quantity > 1 && (
                    <div className="absolute top-1 right-1 bg-gray-900/90 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center border border-gray-600 font-bold">
                      {item.quantity}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <p className="text-white text-xs font-medium leading-tight break-words overflow-hidden text-center">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-400 text-base sm:text-lg">Предметы не найдены</p>
            <p className="text-gray-500 text-xs sm:text-sm mt-2">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
