
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Edit3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState({
    nickname: "",
    gender: "",
    clan: "",
    character: "",
    rank: "",
    about: ""
  });

  const stats = {
    rating: 25,
    level: 10,
    power: "10 020",
    experience: 1240,
    maxExperience: 2000
  };

  const experiencePercentage = (stats.experience / stats.maxExperience) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6">
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
          <h1 className="text-2xl font-bold text-white">The Collectors World</h1>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            ⋮
          </Button>
        </div>

        {/* Profile Hero Section */}
        <div className="relative mb-8">
          <div 
            className="h-48 rounded-lg bg-gradient-to-r from-purple-600 via-blue-600 to-orange-500 relative overflow-hidden"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=300&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/70 via-blue-900/70 to-orange-900/70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-2">Мой профиль</h2>
                <p className="text-xl opacity-90">19:13:09</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Avatar and Basic Info */}
          <div className="space-y-6">
            {/* Avatar Card */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6 text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                    <img 
                      src="https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=200&fit=crop"
                      alt="Avatar" 
                      className="w-full h-full rounded-lg object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                    0
                  </div>
                </div>
                
                <div className="border-2 border-orange-500 bg-orange-900/30 px-4 py-2 rounded mb-4">
                  <span className="text-orange-400 font-bold">Новичок</span>
                </div>
                
                <div className="space-y-2">
                  <div className="bg-gray-700/50 px-3 py-2 rounded">
                    <span className="text-gray-400 text-sm">ID: 100123124</span>
                  </div>
                  <div className="bg-gray-700/50 px-3 py-2 rounded">
                    <div className="text-white font-bold">FrIeRa</div>
                    <div className="text-gray-400 text-sm">(@somared)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Column - Profile Form */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-white">Информация о профиле</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-400 hover:text-white"
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">Никнейм:</Label>
                  <Input
                    value={profile.nickname}
                    onChange={(e) => setProfile({...profile, nickname: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Введите никнейм"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Пол:</Label>
                  <Input
                    value={profile.gender}
                    onChange={(e) => setProfile({...profile, gender: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Выберите пол"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Клан:</Label>
                  <Input
                    value={profile.clan}
                    onChange={(e) => setProfile({...profile, clan: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Название клана"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Персонаж:</Label>
                  <Input
                    value={profile.character}
                    onChange={(e) => setProfile({...profile, character: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Имя персонажа"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">Ранг:</Label>
                  <Input
                    value={profile.rank}
                    onChange={(e) => setProfile({...profile, rank: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Текущий ранг"
                  />
                </div>
                
                <div>
                  <Label className="text-gray-300">О себе:</Label>
                  <Input
                    value={profile.about}
                    onChange={(e) => setProfile({...profile, about: e.target.value})}
                    disabled={!isEditing}
                    className="bg-gray-700/50 border-gray-600 text-white mt-1"
                    placeholder="Расскажите о себе"
                  />
                </div>

                {isEditing && (
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsEditing(false)}
                  >
                    Сохранить изменения
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Stats */}
          <div className="space-y-6">
            {/* Stats Card */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Рейтинг</div>
                    <div className="text-white text-2xl font-bold">{stats.rating}</div>
                  </div>
                  <div className="text-center border-l border-r border-gray-600">
                    <div className="text-gray-400 text-sm mb-1">Уровень</div>
                    <div className="text-white text-2xl font-bold">{stats.level}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400 text-sm mb-1">Мощь</div>
                    <div className="text-white text-2xl font-bold">{stats.power}</div>
                  </div>
                </div>

                {/* Experience Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white">{stats.experience}</span>
                    <span className="text-gray-400">Опыт</span>
                    <span className="text-white">{stats.maxExperience}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${experiencePercentage}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-lg">Действия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  Изменить аватар
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  Настройки приватности
                </Button>
                <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-700">
                  История игр
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
