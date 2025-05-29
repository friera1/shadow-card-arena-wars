
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Crown, Star, Swords, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Hero {
  id: number;
  name: string;
  level: number;
  power: number;
  image: string;
  role: 'tank' | 'dps' | 'support' | 'leader';
  alliance: string;
}

const AllianceBattles = () => {
  const navigate = useNavigate();
  const [selectedAlliance, setSelectedAlliance] = useState<string>('');

  const myHeroes: Hero[] = [
    { id: 1, name: "Артас Король", level: 25, power: 1200, role: "leader", alliance: "Северное Королевство", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop" },
    { id: 2, name: "Стражник Браум", level: 22, power: 950, role: "tank", alliance: "Северное Королевство", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop" },
    { id: 3, name: "Лучница Элара", level: 20, power: 800, role: "dps", alliance: "Лесной Союз", image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=150&h=200&fit=crop" },
    { id: 4, name: "Целитель Мерлин", level: 18, power: 650, role: "support", alliance: "Магический Орден", image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=150&h=200&fit=crop" },
    { id: 5, name: "Воин Торин", level: 23, power: 1000, role: "dps", alliance: "Горные Кланы", image: "https://images.unsplash.com/photo-1527576539890-dfa815648363?w=150&h=200&fit=crop" },
    { id: 6, name: "Жрица Люна", level: 19, power: 700, role: "support", alliance: "Лунный Храм", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=150&h=200&fit=crop" },
  ];

  const enemyTeam: Hero[] = [
    { id: 7, name: "Темный Лорд", level: 30, power: 1500, role: "leader", alliance: "Армия Тьмы", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop" },
    { id: 8, name: "Орк Разрушитель", level: 25, power: 1100, role: "tank", alliance: "Армия Тьмы", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=150&h=200&fit=crop" },
    { id: 9, name: "Некромант", level: 22, power: 900, role: "support", alliance: "Армия Тьмы", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=150&h=200&fit=crop" },
  ];

  const [selectedHeroes, setSelectedHeroes] = useState<Hero[]>([]);

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

  const alliances = Array.from(new Set(myHeroes.map(hero => hero.alliance)));

  const filteredHeroes = selectedAlliance 
    ? myHeroes.filter(hero => hero.alliance === selectedAlliance)
    : myHeroes;

  const toggleHeroSelection = (hero: Hero) => {
    if (selectedHeroes.find(h => h.id === hero.id)) {
      setSelectedHeroes(selectedHeroes.filter(h => h.id !== hero.id));
    } else if (selectedHeroes.length < 5) {
      setSelectedHeroes([...selectedHeroes, hero]);
    }
  };

  const totalPower = selectedHeroes.reduce((sum, hero) => sum + hero.power, 0);
  const enemyPower = enemyTeam.reduce((sum, hero) => sum + hero.power, 0);

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
              <Users className="w-8 h-8 text-blue-400" />
              <h1 className="text-3xl font-bold text-white">Битвы Альянсов</h1>
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
                  Выбор Героев ({selectedHeroes.length}/5)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Alliance Filter */}
                <div className="flex gap-2 mb-4 flex-wrap">
                  <Button
                    variant={selectedAlliance === '' ? 'default' : 'outline'}
                    onClick={() => setSelectedAlliance('')}
                    className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white text-sm"
                  >
                    Все альянсы
                  </Button>
                  {alliances.map((alliance) => (
                    <Button
                      key={alliance}
                      variant={selectedAlliance === alliance ? 'default' : 'outline'}
                      onClick={() => setSelectedAlliance(alliance)}
                      className="bg-gray-700 hover:bg-gray-600 border-gray-600 text-white text-sm"
                    >
                      {alliance}
                    </Button>
                  ))}
                </div>

                {/* Heroes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {filteredHeroes.map((hero) => {
                    const RoleIcon = roleIcons[hero.role];
                    const isSelected = selectedHeroes.find(h => h.id === hero.id);
                    
                    return (
                      <Card 
                        key={hero.id} 
                        className={`${roleColors[hero.role]} border-2 cursor-pointer transition-all duration-200 ${
                          isSelected ? 'ring-2 ring-white scale-105' : 'hover:scale-105'
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
                              <div className="absolute inset-0 bg-white/20 rounded flex items-center justify-center">
                                <div className="bg-green-500 rounded-full p-1">
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
          </div>

          {/* Battle Setup */}
          <div className="space-y-6">
            {/* Selected Team */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Ваша Команда</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedHeroes.map((hero, index) => (
                    <div key={hero.id} className="flex items-center gap-3 bg-gray-700/50 p-2 rounded">
                      <div className="w-12 h-12 relative">
                        <img src={hero.image} alt={hero.name} className="w-full h-full object-cover rounded" />
                        <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{hero.name}</p>
                        <p className="text-gray-400 text-xs">{hero.power} силы</p>
                      </div>
                    </div>
                  ))}
                  {Array.from({ length: 5 - selectedHeroes.length }, (_, i) => (
                    <div key={`empty-${i}`} className="h-16 border-2 border-dashed border-gray-600 rounded flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Пустое место</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-900/30 rounded">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Общая сила:</span>
                    <span className="text-blue-400 font-bold">{totalPower}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enemy Team */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Команда Противника</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {enemyTeam.map((hero) => (
                    <div key={hero.id} className="flex items-center gap-3 bg-red-900/30 p-2 rounded">
                      <img src={hero.image} alt={hero.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="text-white text-sm font-medium">{hero.name}</p>
                        <p className="text-gray-400 text-xs">{hero.power} силы</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-red-900/30 rounded">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Общая сила:</span>
                    <span className="text-red-400 font-bold">{enemyPower}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Battle Button */}
            <Button 
              className="w-full bg-blue-700 hover:bg-blue-600 text-white py-4 text-lg"
              disabled={selectedHeroes.length === 0}
            >
              Начать Битву Альянсов
            </Button>

            {totalPower > 0 && (
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Шансы на победу: 
                  <span className={`ml-1 font-bold ${totalPower > enemyPower ? 'text-green-400' : totalPower < enemyPower ? 'text-red-400' : 'text-yellow-400'}`}>
                    {Math.round((totalPower / (totalPower + enemyPower)) * 100)}%
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceBattles;
