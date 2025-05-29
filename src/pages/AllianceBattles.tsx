
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Crown, Star, Swords, Shield, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSound } from "@/hooks/useSound";
import AllianceBattleGrid from "@/components/AllianceBattleGrid";

interface Hero {
  id: number;
  name: string;
  level: number;
  power: number;
  image: string;
  role: 'tank' | 'dps' | 'support' | 'leader';
  alliance: string;
}

interface Alliance {
  id: number;
  name: string;
  totalPower: number;
  color: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const AllianceBattles = () => {
  const navigate = useNavigate();
  const { playSound } = useSound();
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedHeroes, setSelectedHeroes] = useState<Hero[]>([]);

  const myHeroes: Hero[] = [
    { id: 1, name: "Артас Король", level: 25, power: 1200, role: "leader", alliance: "Северное Королевство", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop" },
    { id: 2, name: "Стражник Браум", level: 22, power: 950, role: "tank", alliance: "Северное Королевство", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop" },
    { id: 3, name: "Лучница Элара", level: 20, power: 800, role: "dps", alliance: "Лесной Союз", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop" },
    { id: 4, name: "Целитель Мерлин", level: 18, power: 650, role: "support", alliance: "Магический Орден", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=150&h=200&fit=crop" },
    { id: 5, name: "Воин Торин", level: 23, power: 1000, role: "dps", alliance: "Горные Кланы", image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&h=200&fit=crop" },
    { id: 6, name: "Жрица Люна", level: 19, power: 700, role: "support", alliance: "Лунный Храм", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=200&fit=crop" },
  ];

  // Генерируем альянсы для битвы
  const battleAlliances: Alliance[] = [
    { id: 1, name: "Северное Королевство", totalPower: 3200, color: "bg-blue-600", position: "top-left" },
    { id: 2, name: "Армия Тьмы", totalPower: 3400, color: "bg-red-600", position: "top-right" },
    { id: 3, name: "Лесной Союз", totalPower: 3100, color: "bg-green-600", position: "bottom-left" },
    { id: 4, name: "Огненные Драконы", totalPower: 3300, color: "bg-orange-600", position: "bottom-right" },
  ];

  const roleColors = {
    leader: "border-yellow-500 bg-yellow-900/30",
    tank: "border-blue-500 bg-blue-900/30",
    dps: "border-red-500 bg-red-900/30",
    support: "border-green-500 bg-green-900/30"
  };

  const roleIcons = {
    leader: Crown,
    tank: Shield,
    dps: Swords,
    support: Star
  };

  // Сортируем героев по силе и берем топ-3
  const topHeroes = [...myHeroes].sort((a, b) => b.power - a.power).slice(0, 3);

  const toggleHeroSelection = (hero: Hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 3) {
      setSelectedHeroes([...selectedHeroes, hero]);
      playSound('click');
    }
  };

  const startBattle = () => {
    if (selectedHeroes.length === 3) {
      setGameStarted(true);
      playSound('success');
    }
  };

  if (gameStarted) {
    return (
      <AllianceBattleGrid 
        selectedHeroes={selectedHeroes}
        alliances={battleAlliances}
        onBack={() => setGameStarted(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
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
              <Flag className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold text-white">Война Альянсов</h1>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Hero Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Выберите 3 сильнейших героев для войны
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {topHeroes.map((hero) => {
                    const RoleIcon = roleIcons[hero.role];
                    const isSelected = selectedHeroes.find(h => h.id === hero.id);
                    
                    return (
                      <Card 
                        key={hero.id} 
                        className={`${roleColors[hero.role]} border-2 cursor-pointer transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-purple-400 scale-105' : 'hover:scale-105'
                        }`}
                        onClick={() => toggleHeroSelection(hero)}
                      >
                        <CardContent className="p-3">
                          <div className="relative">
                            <img src={hero.image} alt={hero.name} className="w-full h-32 object-cover rounded mb-2" />
                            <div className="absolute top-1 right-1 bg-black/70 rounded-full p-1">
                              <RoleIcon className="w-4 h-4 text-white" />
                            </div>
                            {isSelected && (
                              <div className="absolute inset-0 bg-purple-500/20 rounded flex items-center justify-center">
                                <div className="bg-purple-500 rounded-full p-1">
                                  <Star className="w-4 h-4 text-white fill-white" />
                                </div>
                              </div>
                            )}
                          </div>
                          <h4 className="text-white font-bold text-sm mb-1">{hero.name}</h4>
                          <p className="text-gray-400 text-xs mb-1">{hero.alliance}</p>
                          <div className="flex justify-between text-xs">
                            <span className="text-blue-400">Ур. {hero.level}</span>
                            <span className="text-yellow-400">{hero.power}</span>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Battle Info */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Правила Войны Альянсов</CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-2 text-sm">
                <p>• 4 альянса сражаются на поле 50x50 клеток</p>
                <p>• Каждый альянс начинает в своем углу карты</p>
                <p>• У вас есть 5 ходов для захвата территорий</p>
                <p>• Клетки союзников можно проходить бесплатно</p>
                <p>• Цель: добраться до центра и захватить Главное Здание</p>
              </CardContent>
            </Card>
          </div>

          {/* Battle Setup */}
          <div className="space-y-6">
            {/* Selected Team */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Выбранные Герои ({selectedHeroes.length}/3)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedHeroes.map((hero, index) => (
                    <div key={hero.id} className="flex items-center gap-3 bg-purple-900/30 p-2 rounded">
                      <div className="w-12 h-12 relative">
                        <img src={hero.image} alt={hero.name} className="w-full h-full object-cover rounded" />
                        <div className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{hero.name}</p>
                        <p className="text-gray-400 text-xs">{hero.power} силы</p>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: 3 - selectedHeroes.length }, (_, i) => (
                    <div key={`empty-${i}`} className="h-16 border-2 border-dashed border-gray-600 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Выберите героя</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Participating Alliances */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Участвующие Альянсы</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {battleAlliances.map((alliance) => (
                    <div key={alliance.id} className={`${alliance.color} p-2 rounded flex justify-between items-center`}>
                      <span className="text-white text-sm font-medium">{alliance.name}</span>
                      <span className="text-yellow-400 text-xs">{alliance.totalPower}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Battle Button */}
            <Button 
              className="w-full bg-purple-700 hover:bg-purple-600 text-white py-4 text-lg"
              disabled={selectedHeroes.length !== 3}
              onClick={startBattle}
            >
              Начать Войну Альянсов
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceBattles;
