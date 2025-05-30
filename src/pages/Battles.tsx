
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Swords, Trophy, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import BattleSystemExamples from "@/components/BattleSystemExamples";

const Battles = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const battleModes = [
    {
      id: 'quick',
      title: 'Быстрый бой',
      description: 'Случайный противник',
      reward: '50-100 золота',
      duration: '3-5 мин',
      difficulty: 'Легко',
      bgColor: 'bg-green-600',
      icon: Clock
    },
    {
      id: 'ranked',
      title: 'Рейтинговый бой',
      description: 'Влияет на рейтинг',
      reward: '100-200 золота',
      duration: '5-10 мин',
      difficulty: 'Средне',
      bgColor: 'bg-blue-600',
      icon: Trophy
    },
    {
      id: 'tournament',
      title: 'Турнир',
      description: 'Соревнование игроков',
      reward: '500+ золота',
      duration: '15-30 мин',
      difficulty: 'Сложно',
      bgColor: 'bg-purple-600',
      icon: Star
    }
  ];

  const handleBattleStart = (mode: string, title: string) => {
    toast({
      title: `Начинаем ${title}`,
      description: "Поиск противника...",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 sm:px-4 sm:py-2"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 sm:mr-2" />
            <span className="hidden sm:inline">Назад</span>
          </Button>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center flex-1 mx-2">The Collectors World</h1>
          <div className="text-white text-xs sm:text-sm">19:13:09</div>
        </div>

        {/* Hero Section */}
        <div className="relative mb-4 sm:mb-6">
          <div 
            className="h-24 sm:h-32 md:h-48 rounded-lg bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 relative overflow-hidden"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=300&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-900/70 via-orange-900/70 to-yellow-900/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-2">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2">Карточные Бои</h2>
                <p className="text-xs sm:text-sm md:text-xl opacity-90">Выберите режим сражения</p>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Examples */}
        <div className="mb-6">
          <BattleSystemExamples />
        </div>

        {/* Battle Modes */}
        <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
          <h3 className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-4">Режимы боя</h3>
          
          {battleModes.map((mode) => (
            <Card 
              key={mode.id}
              className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300"
            >
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${mode.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <mode.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-base sm:text-lg">{mode.title}</h4>
                    <p className="text-gray-400 text-xs sm:text-sm">{mode.description}</p>
                    
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-2 sm:mt-3 text-xs">
                      <div>
                        <span className="text-gray-500">Награда:</span>
                        <p className="text-yellow-400 font-medium">{mode.reward}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Время:</span>
                        <p className="text-blue-400 font-medium">{mode.duration}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Сложность:</span>
                        <p className="text-green-400 font-medium">{mode.difficulty}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    className={`${mode.bgColor} hover:opacity-90 text-white flex-shrink-0 text-xs sm:text-sm px-2 sm:px-4`}
                    onClick={() => handleBattleStart(mode.id, mode.title)}
                  >
                    <Swords className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Начать</span>
                    <span className="sm:hidden">Бой</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-base sm:text-lg">Статистика боев</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">25</div>
                <div className="text-xs sm:text-sm text-gray-400">Побед</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">10</div>
                <div className="text-xs sm:text-sm text-gray-400">Поражений</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">71%</div>
                <div className="text-xs sm:text-sm text-gray-400">Винрейт</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-white">1,250</div>
                <div className="text-xs sm:text-sm text-gray-400">Рейтинг</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Battles;
