
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Package, Filter } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface InventoryItem {
  id: number;
  name: string;
  image: string;
  type: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  quantity: number;
}

const Inventory = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const inventoryItems: InventoryItem[] = [
    { id: 1, name: "Меч Света", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "weapon", rarity: "legendary", quantity: 1 },
    { id: 2, name: "Зелье Здоровья", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=125&h=125&fit=crop", type: "potion", rarity: "common", quantity: 5 },
    { id: 3, name: "Щит Защиты", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=125&h=125&fit=crop", type: "armor", rarity: "epic", quantity: 1 },
    { id: 4, name: "Кольцо Силы", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=125&h=125&fit=crop", type: "accessory", rarity: "rare", quantity: 2 },
    { id: 5, name: "Магический Кристалл", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=125&h=125&fit=crop", type: "material", rarity: "epic", quantity: 3 },
    { id: 6, name: "Свиток Огня", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=125&h=125&fit=crop", type: "scroll", rarity: "rare", quantity: 4 },
  ];

  const rarityColors = {
    common: "border-gray-500 bg-gray-800",
    rare: "border-blue-500 bg-blue-900/30",
    epic: "border-purple-500 bg-purple-900/30", 
    legendary: "border-yellow-500 bg-yellow-900/30"
  };

  const filteredItems = selectedFilter === 'all' 
    ? inventoryItems 
    : inventoryItems.filter(item => item.type === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
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
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <Button
            variant={selectedFilter === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('all')}
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
          >
            Все предметы
          </Button>
          <Button
            variant={selectedFilter === 'weapon' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('weapon')}
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
          >
            Оружие
          </Button>
          <Button
            variant={selectedFilter === 'armor' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('armor')}
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
          >
            Броня
          </Button>
          <Button
            variant={selectedFilter === 'potion' ? 'default' : 'outline'}
            onClick={() => setSelectedFilter('potion')}
            className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white"
          >
            Зелья
          </Button>
        </div>

        {/* Inventory Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {filteredItems.map((item) => (
            <Card 
              key={item.id} 
              className={`${rarityColors[item.rarity]} border-2 hover:scale-105 transition-all duration-200 cursor-pointer relative group`}
            >
              <CardContent className="p-2">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[125px] h-[125px] object-cover rounded-md"
                  />
                  {item.quantity > 1 && (
                    <div className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center border border-gray-600">
                      {item.quantity}
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <p className="text-white text-sm font-medium truncate">{item.name}</p>
                  <p className="text-gray-400 text-xs capitalize">{item.type}</p>
                </div>
                
                {/* Hover overlay with details */}
                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex flex-col justify-center items-center p-2">
                  <p className="text-white text-sm font-bold text-center">{item.name}</p>
                  <p className="text-gray-300 text-xs text-center mt-1 capitalize">{item.rarity} {item.type}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">Предметы не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;
