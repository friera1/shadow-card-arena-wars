
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, Swords, Users, Bell, User } from "lucide-react";
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
    
    // Добавляем небольшую задержку для анимации
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const menuItems = [
    {
      path: '/inventory',
      title: 'Моя Сумка',
      description: 'Управляйте своим инвентарем и предметами',
      icon: Package,
      buttonText: 'Открыть',
      hoverColor: 'hover:border-purple-500',
      bgColor: 'bg-gray-700 hover:bg-gray-600'
    },
    {
      path: '/battles',
      title: 'Карточные Бои',
      description: 'Различные варианты сражений',
      icon: Swords,
      buttonText: 'В Бой',
      hoverColor: 'hover:border-red-500',
      bgColor: 'bg-red-700 hover:bg-red-600'
    },
    {
      path: '/alliance-battles',
      title: 'Битвы Альянсов',
      description: 'Командные сражения героев',
      icon: Users,
      buttonText: 'Формировать',
      hoverColor: 'hover:border-blue-500',
      bgColor: 'bg-blue-700 hover:bg-blue-600'
    },
    {
      path: '/profile',
      title: 'Мой Профиль',
      description: 'Настройки профиля и статистика',
      icon: User,
      buttonText: 'Профиль',
      hoverColor: 'hover:border-green-500',
      bgColor: 'bg-green-700 hover:bg-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header with notification */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-4">
            <h1 className="text-5xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Карточная Игра
            </h1>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-yellow-400 relative"
              onClick={() => toast({
                title: "Уведомления",
                description: "У вас нет новых уведомлений",
              })}
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            </Button>
          </div>
          <p className="text-xl text-gray-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Добро пожаловать обратно, Воин!
          </p>
        </div>

        {/* Player Stats */}
        <PlayerStats />

        {/* Menu Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <Card 
              key={item.path}
              className={`bg-gray-800/50 border-gray-700 ${item.hoverColor} transition-all duration-300 hover:scale-105 animate-fade-in cursor-pointer group`}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
              onClick={() => handleNavigation(item.path, item.title)}
            >
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-white text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 text-center mb-6">
                  {item.description}
                </p>
                <Button 
                  className={`w-full ${item.bgColor} text-white transition-all duration-300`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigation(item.path, item.title);
                  }}
                >
                  {item.buttonText}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex gap-4 bg-gray-800/30 p-4 rounded-lg border border-gray-700">
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => toast({
                title: "Ежедневная награда",
                description: "Вы получили 100 золота!",
                duration: 3000,
              })}
            >
              Ежедневная награда
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
              onClick={() => toast({
                title: "Настройки",
                description: "Открываем панель настроек...",
              })}
            >
              Настройки
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
