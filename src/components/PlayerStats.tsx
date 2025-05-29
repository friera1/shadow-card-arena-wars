
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Coins, Timer } from "lucide-react";

interface StatItem {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
}

const PlayerStats = () => {
  const stats: StatItem[] = [
    { label: "Побед", value: 47, icon: <Trophy className="w-5 h-5" />, color: "text-yellow-400" },
    { label: "Уровень", value: 23, icon: <Star className="w-5 h-5" />, color: "text-blue-400" },
    { label: "Золото", value: "1,250", icon: <Coins className="w-5 h-5" />, color: "text-yellow-400" },
    { label: "Играл", value: "45ч", icon: <Timer className="w-5 h-5" />, color: "text-green-400" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={stat.label} 
          className="bg-gray-800/70 border-gray-600 hover:border-purple-500 transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-4 text-center">
            <div className={`${stat.color} mb-2 flex justify-center`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PlayerStats;
