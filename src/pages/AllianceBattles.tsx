
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Crown, Shield, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import AllianceBattleGrid from "@/components/AllianceBattleGrid";

const AllianceBattles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const allianceInfo = {
    name: "Драконы Севера",
    members: 45,
    power: 125000,
    rank: 15
  };

  // Sample data for the battle grid
  const selectedHeroes = [
    {
      id: 1,
      name: "Драконий Воин",
      level: 25,
      power: 1500,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop",
      role: 'tank' as const,
      alliance: "Драконы Севера"
    },
    {
      id: 2,
      name: "Ледяной Маг",
      level: 22,
      power: 1200,
      image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop",
      role: 'dps' as const,
      alliance: "Драконы Севера"
    },
    {
      id: 3,
      name: "Целитель",
      level: 20,
      power: 900,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
      role: 'support' as const,
      alliance: "Драконы Севера"
    }
  ];

  const alliances = [
    {
      id: 1,
      name: "Драконы Севера",
      totalPower: 45000,
      color: "bg-blue-600",
      position: 'top-left' as const
    },
    {
      id: 2,
      name: "Огненный Легион",
      totalPower: 42000,
      color: "bg-red-600",
      position: 'top-right' as const
    },
    {
      id: 3,
      name: "Теневые Охотники",
      totalPower: 38000,
      color: "bg-purple-600",
      position: 'bottom-left' as const
    },
    {
      id: 4,
      name: "Золотая Гильдия",
      totalPower: 40000,
      color: "bg-yellow-600",
      position: 'bottom-right' as const
    }
  ];

  const battleModes = [
    {
      id: 'territory',
      title: 'Захват территории',
      description: 'Захватите вражеские земли',
      participants: '20 vs 20',
      duration: '2 часа',
      bgColor: 'bg-red-600',
      icon: Shield
    },
    {
      id: 'fortress',
      title: 'Осада крепости',
      description: 'Штурм вражеской крепости',
      participants: '50 vs 50',
      duration: '3 часа',
      bgColor: 'bg-purple-600',
      icon: Crown
    },
    {
      id: 'arena',
      title: 'Арена альянсов',
      description: 'Турнир между альянсами',
      participants: '10 vs 10',
      duration: '1 час',
      bgColor: 'bg-blue-600',
      icon: Zap
    }
  ];

  const handleJoinBattle = (mode: string, title: string) => {
    toast({
      title: `Присоединение к ${title}`,
      description: "Формируем команду...",
      duration: 3000,
    });
  };

  const handleBackFromGrid = () => {
    // This function will be called when user wants to go back from the battle grid
    // For now, we'll just show a toast since we're on the same page
    toast({
      title: "Возврат к выбору режима",
      description: "Выберите режим битвы",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Назад
          </Button>
          <h1 className="text-xl md:text-2xl font-bold text-white">The Collectors World</h1>
          <div className="text-white text-sm">19:13:09</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Alliance Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Alliance Card */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Мой Альянс
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg mx-auto mb-3 flex items-center justify-center">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg">{allianceInfo.name}</h3>
                  <p className="text-gray-400 text-sm">Ранг #{allianceInfo.rank}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-white font-bold text-xl">{allianceInfo.members}</div>
                    <div className="text-gray-400 text-xs">Участники</div>
                  </div>
                  <div>
                    <div className="text-white font-bold text-xl">{allianceInfo.power.toLocaleString()}</div>
                    <div className="text-gray-400 text-xs">Сила</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Побед:</span>
                  <span className="text-green-400 font-bold">15</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Поражений:</span>
                  <span className="text-red-400 font-bold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">Участие:</span>
                  <span className="text-blue-400 font-bold">18/20</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Battle Modes and Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <div className="relative">
              <div 
                className="h-32 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=200&fit=crop')",
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/70 to-pink-900/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">Битвы Альянсов</h2>
                    <p className="text-sm opacity-90">Сражайтесь вместе с союзниками</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Battle Modes */}
            <div className="space-y-3">
              <h3 className="text-white font-bold mb-3">Режимы сражений</h3>
              
              {battleModes.map((mode) => (
                <Card 
                  key={mode.id}
                  className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
                >
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${mode.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <mode.icon className="w-5 h-5 text-white" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-medium">{mode.title}</h4>
                        <p className="text-gray-400 text-xs">{mode.description}</p>
                        <div className="flex gap-4 mt-1 text-xs">
                          <span className="text-blue-400">{mode.participants}</span>
                          <span className="text-yellow-400">{mode.duration}</span>
                        </div>
                      </div>
                      
                      <Button
                        size="sm"
                        className={`${mode.bgColor} hover:opacity-90 text-white`}
                        onClick={() => handleJoinBattle(mode.id, mode.title)}
                      >
                        Участвовать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Battle Grid */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Поле боя (50x50)</CardTitle>
              </CardHeader>
              <CardContent>
                <AllianceBattleGrid 
                  selectedHeroes={selectedHeroes}
                  alliances={alliances}
                  onBack={handleBackFromGrid}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceBattles;
