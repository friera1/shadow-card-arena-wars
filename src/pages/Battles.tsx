
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Swords, Zap, Shield, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BattleCard {
  id: number;
  name: string;
  attack: number;
  defense: number;
  health: number;
  image: string;
  type: 'fire' | 'water' | 'earth' | 'air';
}

const Battles = () => {
  const navigate = useNavigate();
  const [selectedBattleType, setSelectedBattleType] = useState<string>('classic');
  const [playerCards] = useState<BattleCard[]>([
    { id: 1, name: "Огненный Дракон", attack: 8, defense: 5, health: 12, type: "fire", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop" },
    { id: 2, name: "Водный Элементаль", attack: 6, defense: 7, health: 10, type: "water", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop" },
    { id: 3, name: "Земной Голем", attack: 5, defense: 9, health: 15, type: "earth", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop" },
  ]);

  const [enemyCards] = useState<BattleCard[]>([
    { id: 4, name: "Теневой Волк", attack: 7, defense: 4, health: 8, type: "air", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=150&h=200&fit=crop" },
    { id: 5, name: "Кристальный Маг", attack: 9, defense: 3, health: 7, type: "water", image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&h=200&fit=crop" },
  ]);

  const typeColors = {
    fire: "border-red-500 bg-red-900/30",
    water: "border-blue-500 bg-blue-900/30",
    earth: "border-green-500 bg-green-900/30",
    air: "border-purple-500 bg-purple-900/30"
  };

  const renderClassicBattle = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Классический Бой</h2>
        <p className="text-gray-400">Простое противостояние карт один на один</p>
      </div>

      {/* Player Cards */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          Ваши карты
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {playerCards.map((card) => (
            <Card key={card.id} className={`${typeColors[card.type]} border-2 hover:scale-105 transition-all cursor-pointer`}>
              <CardContent className="p-4">
                <img src={card.image} alt={card.name} className="w-full h-32 object-cover rounded mb-3" />
                <h4 className="text-white font-bold mb-2">{card.name}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400 flex items-center gap-1">
                    <Swords className="w-4 h-4" /> {card.attack}
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    <Shield className="w-4 h-4" /> {card.defense}
                  </span>
                  <span className="text-green-400 flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {card.health}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="text-center">
        <div className="inline-block bg-gray-800 px-6 py-3 rounded-full">
          <Swords className="w-8 h-8 text-red-400 mx-auto" />
        </div>
      </div>

      {/* Enemy Cards */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Swords className="w-5 h-5 text-red-400" />
          Вражеские карты
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enemyCards.map((card) => (
            <Card key={card.id} className={`${typeColors[card.type]} border-2 opacity-80`}>
              <CardContent className="p-4">
                <img src={card.image} alt={card.name} className="w-full h-32 object-cover rounded mb-3" />
                <h4 className="text-white font-bold mb-2">{card.name}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-red-400 flex items-center gap-1">
                    <Swords className="w-4 h-4" /> {card.attack}
                  </span>
                  <span className="text-blue-400 flex items-center gap-1">
                    <Shield className="w-4 h-4" /> {card.defense}
                  </span>
                  <span className="text-green-400 flex items-center gap-1">
                    <Heart className="w-4 h-4" /> {card.health}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderGridBattle = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Сетка Боя</h2>
        <p className="text-gray-400">Расставьте карты на поле 3x3</p>
      </div>

      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            className="aspect-square bg-gray-800 border-2 border-gray-600 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors cursor-pointer"
          >
            {i < 3 && playerCards[i] && (
              <div className="w-full h-full p-1">
                <img src={playerCards[i].image} alt={playerCards[i].name} className="w-full h-full object-cover rounded" />
              </div>
            )}
            {i >= 6 && enemyCards[i - 6] && (
              <div className="w-full h-full p-1">
                <img src={enemyCards[i - 6].image} alt={enemyCards[i - 6].name} className="w-full h-full object-cover rounded opacity-80" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderTurnBasedBattle = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Пошаговый Бой</h2>
        <p className="text-gray-400">Поочередные ходы с энергией</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Ваш ход</h3>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">3/5</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {playerCards.slice(0, 2).map((card) => (
              <Card key={card.id} className={`${typeColors[card.type]} border-2 hover:scale-105 transition-all cursor-pointer`}>
                <CardContent className="p-3">
                  <img src={card.image} alt={card.name} className="w-full h-24 object-cover rounded mb-2" />
                  <h4 className="text-white font-bold text-sm mb-1">{card.name}</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-red-400">{card.attack}</span>
                    <span className="text-green-400">{card.health}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Ход противника</h3>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">2/5</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {enemyCards.map((card) => (
              <Card key={card.id} className={`${typeColors[card.type]} border-2 opacity-80`}>
                <CardContent className="p-3">
                  <img src={card.image} alt={card.name} className="w-full h-24 object-cover rounded mb-2" />
                  <h4 className="text-white font-bold text-sm mb-1">{card.name}</h4>
                  <div className="flex justify-between text-xs">
                    <span className="text-red-400">{card.attack}</span>
                    <span className="text-green-400">{card.health}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const battleTypes = [
    { id: 'classic', name: 'Классический', description: 'Простое противостояние' },
    { id: 'grid', name: 'Сетка', description: 'Поле 3x3' },
    { id: 'turnbased', name: 'Пошаговый', description: 'С энергией и ходами' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6">
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
              <Swords className="w-8 h-8 text-red-400" />
              <h1 className="text-3xl font-bold text-white">Карточные Бои</h1>
            </div>
          </div>
        </div>

        {/* Battle Type Selector */}
        <div className="flex gap-4 mb-8 justify-center">
          {battleTypes.map((type) => (
            <Button
              key={type.id}
              variant={selectedBattleType === type.id ? 'default' : 'outline'}
              onClick={() => setSelectedBattleType(type.id)}
              className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white flex flex-col items-center p-4 h-auto"
            >
              <span className="font-bold">{type.name}</span>
              <span className="text-xs opacity-75">{type.description}</span>
            </Button>
          ))}
        </div>

        {/* Battle Content */}
        <div className="bg-gray-800/50 rounded-lg p-6">
          {selectedBattleType === 'classic' && renderClassicBattle()}
          {selectedBattleType === 'grid' && renderGridBattle()}
          {selectedBattleType === 'turnbased' && renderTurnBasedBattle()}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button className="bg-red-700 hover:bg-red-600 text-white px-8 py-3">
            Начать Бой
          </Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 px-8 py-3">
            Настройки
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Battles;
