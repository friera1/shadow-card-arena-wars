
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Package, Swords, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Карточная Игра
          </h1>
          <p className="text-xl text-gray-300">Выберите раздел для продолжения</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-gray-300" />
              </div>
              <CardTitle className="text-white text-xl">Моя Сумка</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center mb-6">
                Управляйте своим инвентарем и предметами
              </p>
              <Button 
                onClick={() => navigate('/inventory')}
                className="w-full bg-gray-700 hover:bg-gray-600 text-white"
              >
                Открыть
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:border-red-500 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-red-700 rounded-full flex items-center justify-center mb-4">
                <Swords className="w-8 h-8 text-red-300" />
              </div>
              <CardTitle className="text-white text-xl">Карточные Бои</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center mb-6">
                Различные варианты сражений
              </p>
              <Button 
                onClick={() => navigate('/battles')}
                className="w-full bg-red-700 hover:bg-red-600 text-white"
              >
                В Бой
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <CardTitle className="text-white text-xl">Битвы Альянсов</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 text-center mb-6">
                Командные сражения героев
              </p>
              <Button 
                onClick={() => navigate('/alliance-battles')}
                className="w-full bg-blue-700 hover:bg-blue-600 text-white"
              >
                Формировать
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
