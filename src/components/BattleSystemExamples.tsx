
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, Shield, Heart, Zap, Target, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSound } from "@/hooks/useSound";

interface Hero {
  id: number;
  name: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  speed: number;
  image: string;
}

const BattleSystemExamples = () => {
  const { toast } = useToast();
  const { playSound } = useSound();
  
  const [battleType, setBattleType] = useState<'turn' | 'real-time' | 'auto'>('turn');
  const [isActive, setIsActive] = useState(false);
  const [turn, setTurn] = useState(1);
  const [log, setLog] = useState<string[]>([]);

  const [playerHero, setPlayerHero] = useState<Hero>({
    id: 1,
    name: "Драконий Воин",
    hp: 100,
    maxHp: 100,
    attack: 25,
    defense: 15,
    speed: 12,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=100&h=100&fit=crop"
  });

  const [enemyHero, setEnemyHero] = useState<Hero>({
    id: 2,
    name: "Темный Маг",
    hp: 80,
    maxHp: 80,
    attack: 30,
    defense: 10,
    speed: 15,
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?w=100&h=100&fit=crop"
  });

  const addToLog = (message: string) => {
    setLog(prev => [...prev.slice(-4), message]);
  };

  const performAttack = (attacker: Hero, defender: Hero, isPlayer: boolean) => {
    const damage = Math.max(1, attacker.attack - defender.defense + Math.floor(Math.random() * 10) - 5);
    const newHp = Math.max(0, defender.hp - damage);
    
    if (isPlayer) {
      setEnemyHero(prev => ({ ...prev, hp: newHp }));
      addToLog(`${attacker.name} атакует ${defender.name} на ${damage} урона!`);
    } else {
      setPlayerHero(prev => ({ ...prev, hp: newHp }));
      addToLog(`${attacker.name} атакует ${defender.name} на ${damage} урона!`);
    }

    if (newHp <= 0) {
      addToLog(`${defender.name} повержен!`);
      setIsActive(false);
      toast({
        title: newHp <= 0 ? (isPlayer ? "Победа!" : "Поражение!") : "Атака!",
        description: `${attacker.name} нанес ${damage} урона`,
      });
      playSound(newHp <= 0 ? (isPlayer ? 'success' : 'error') : 'click');
    }
  };

  const startTurnBasedBattle = () => {
    setIsActive(true);
    setTurn(1);
    setLog([]);
    addToLog("Начинается пошаговая битва!");
    
    // Сброс HP
    setPlayerHero(prev => ({ ...prev, hp: prev.maxHp }));
    setEnemyHero(prev => ({ ...prev, hp: prev.maxHp }));
  };

  const playerAttack = () => {
    if (!isActive || enemyHero.hp <= 0) return;
    
    performAttack(playerHero, enemyHero, true);
    
    if (enemyHero.hp > 0) {
      setTimeout(() => {
        performAttack(enemyHero, playerHero, false);
        setTurn(prev => prev + 1);
      }, 1500);
    }
  };

  const startRealTimeBattle = () => {
    setIsActive(true);
    setLog([]);
    addToLog("Начинается битва в реальном времени!");
    
    // Сброс HP
    setPlayerHero(prev => ({ ...prev, hp: prev.maxHp }));
    setEnemyHero(prev => ({ ...prev, hp: prev.maxHp }));

    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        performAttack(playerHero, enemyHero, true);
      } else {
        performAttack(enemyHero, playerHero, false);
      }
    }, 2000);

    setTimeout(() => {
      clearInterval(interval);
      setIsActive(false);
      addToLog("Битва окончена!");
    }, 10000);
  };

  const startAutoBattle = () => {
    setIsActive(true);
    setLog([]);
    addToLog("Начинается автоматическая битва!");
    
    // Сброс HP
    setPlayerHero(prev => ({ ...prev, hp: prev.maxHp }));
    setEnemyHero(prev => ({ ...prev, hp: prev.maxHp }));

    const interval = setInterval(() => {
      const attacker = Math.random() > 0.5 ? playerHero : enemyHero;
      const defender = attacker === playerHero ? enemyHero : playerHero;
      const isPlayer = attacker === playerHero;
      
      performAttack(attacker, defender, isPlayer);
      
      if (playerHero.hp <= 0 || enemyHero.hp <= 0) {
        clearInterval(interval);
        setIsActive(false);
      }
    }, 1000);
  };

  const HeroCard = ({ hero, isPlayer }: { hero: Hero; isPlayer: boolean }) => (
    <Card className="bg-gray-800/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <img 
            src={hero.image} 
            alt={hero.name} 
            className="w-16 h-16 object-cover rounded-lg border-2 border-purple-500"
          />
          <div className="flex-1">
            <h3 className="text-white font-bold">{hero.name}</h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-400" />
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(hero.hp / hero.maxHp) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-white">{hero.hp}/{hero.maxHp}</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Swords className="w-3 h-3 text-orange-400" />
                  <span className="text-gray-300">{hero.attack}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-blue-400" />
                  <span className="text-gray-300">{hero.defense}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-gray-300">{hero.speed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="w-5 h-5" />
            Примеры Боевых Систем
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Battle Type Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Button
              variant={battleType === 'turn' ? 'default' : 'outline'}
              onClick={() => setBattleType('turn')}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Clock className="w-6 h-6" />
              <div>
                <div className="font-bold">Пошаговая</div>
                <div className="text-xs opacity-70">Классическая RPG</div>
              </div>
            </Button>
            <Button
              variant={battleType === 'real-time' ? 'default' : 'outline'}
              onClick={() => setBattleType('real-time')}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Zap className="w-6 h-6" />
              <div>
                <div className="font-bold">Реальное время</div>
                <div className="text-xs opacity-70">Динамичная</div>
              </div>
            </Button>
            <Button
              variant={battleType === 'auto' ? 'default' : 'outline'}
              onClick={() => setBattleType('auto')}
              className="flex flex-col items-center gap-2 h-auto py-4"
            >
              <Target className="w-6 h-6" />
              <div>
                <div className="font-bold">Автобитва</div>
                <div className="text-xs opacity-70">Без участия</div>
              </div>
            </Button>
          </div>

          {/* Battle Arena */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-400" />
                Ваш Герой
              </h3>
              <HeroCard hero={playerHero} isPlayer={true} />
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                <Swords className="w-4 h-4 text-red-400" />
                Противник
              </h3>
              <HeroCard hero={enemyHero} isPlayer={false} />
            </div>
          </div>

          {/* Battle Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            {battleType === 'turn' && (
              <>
                <Button
                  onClick={startTurnBasedBattle}
                  disabled={isActive}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Начать Пошаговую Битву
                </Button>
                {isActive && playerHero.hp > 0 && enemyHero.hp > 0 && (
                  <Button
                    onClick={playerAttack}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Атаковать (Ход {turn})
                  </Button>
                )}
              </>
            )}
            {battleType === 'real-time' && (
              <Button
                onClick={startRealTimeBattle}
                disabled={isActive}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Начать Битву в Реальном Времени
              </Button>
            )}
            {battleType === 'auto' && (
              <Button
                onClick={startAutoBattle}
                disabled={isActive}
                className="bg-green-600 hover:bg-green-700"
              >
                Начать Автобитву
              </Button>
            )}
          </div>

          {/* Battle Log */}
          <Card className="bg-gray-900/50 border-gray-600">
            <CardHeader>
              <CardTitle className="text-white text-sm">Журнал Битвы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1 h-32 overflow-y-auto">
                {log.length === 0 ? (
                  <p className="text-gray-400 text-sm">Выберите тип битвы и начните сражение...</p>
                ) : (
                  log.map((entry, index) => (
                    <p key={index} className="text-gray-300 text-sm">{entry}</p>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default BattleSystemExamples;
