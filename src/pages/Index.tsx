
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, Swords, Users, Bell, User, Settings, Gift } from "lucide-react";
import PlayerStats from "@/components/PlayerStats";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleNavigation = (path: string, title: string) => {
    toast({
      title: `Переход в ${title}`,
      description: "Загружаем данные...",
      duration: 2000,
    });
    
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const menuItems = [
    {
      path: '/inventory',
      title: 'Моя Сумка',
      description: 'Управляйте своим инвентарем',
      icon: Package,
      buttonText: 'Открыть',
      bgColor: 'bg-purple-600'
    },
    {
      path: '/battles',
      title: 'Карточные Бои',
      description: 'Различные варианты сражений',
      icon: Swords,
      buttonText: 'В Бой',
      bgColor: 'bg-red-600'
    },
    {
      path: '/alliance-battles',
      title: 'Битвы Альянсов',
      description: 'Командные сражения',
      icon: Users,
      buttonText: 'Формировать',
      bgColor: 'bg-blue-600'
    },
    {
      path: '/profile',
      title: 'Мой Профиль',
      description: 'Настройки и статистика',
      icon: User,
      buttonText: 'Профиль',
      bgColor: 'bg-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-white">The Collectors World</h1>
          <div className="flex items-center gap-2">
            <span className="text-white text-sm md:text-base">19:13:09</span>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-yellow-400 relative"
              onClick={() => toast({
                title: "Уведомления",
                description: "У вас нет новых уведомлений",
              })}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative mb-6">
          <div 
            className="h-32 md:h-48 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 relative overflow-hidden"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=300&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-blue-900/70 to-orange-900/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl md:text-4xl font-bold mb-2">Добро пожаловать</h2>
                <p className="text-sm md:text-xl opacity-90">Воин карточной арены</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Player Stats */}
          <div className="lg:col-span-1">
            <PlayerStats />
          </div>

          {/* Right Column - Menu */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-white text-lg font-bold mb-4">Основные разделы</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <Card 
                  key={item.path}
                  className="bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer group"
                  onClick={() => handleNavigation(item.path, item.title)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                        <item.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-medium text-sm">{item.title}</h4>
                        <p className="text-gray-400 text-xs">{item.description}</p>
                      </div>
                    </div>
                    <Button 
                      className={`w-full ${item.bgColor} hover:opacity-90 text-white text-sm`}
                      size="sm"
                    >
                      {item.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 border-gray-700 mt-6">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-lg">Быстрые действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                  onClick={() => toast({
                    title: "Ежедневная награда",
                    description: "Вы получили 100 золота!",
                    duration: 3000,
                  })}
                >
                  <Gift className="w-4 h-4 mr-2" />
                  Ежедневная награда
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 justify-start"
                  onClick={() => toast({
                    title: "Настройки",
                    description: "Открываем панель настроек...",
                  })}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Настройки
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
