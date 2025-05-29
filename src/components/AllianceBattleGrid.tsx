
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Flag, Crown, Eye, EyeOff } from "lucide-react";
import { useSound } from "@/hooks/useSound";

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

interface Cell {
  x: number;
  y: number;
  owner: number | null; // ID альянса или null
  isRevealed: boolean;
  isCenter: boolean;
}

interface AllianceBattleGridProps {
  selectedHeroes: Hero[];
  alliances: Alliance[];
  onBack: () => void;
}

const AllianceBattleGrid = ({ selectedHeroes, alliances, onBack }: AllianceBattleGridProps) => {
  const { playSound } = useSound();
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [currentTurns, setCurrentTurns] = useState(5);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [playerAllianceId] = useState(1); // Игрок играет за первый альянс

  // Инициализация сетки
  useEffect(() => {
    const newGrid: Cell[][] = [];
    for (let x = 0; x < 50; x++) {
      newGrid[x] = [];
      for (let y = 0; y < 50; y++) {
        newGrid[x][y] = {
          x,
          y,
          owner: null,
          isRevealed: false,
          isCenter: x === 25 && y === 25, // Центральная клетка
        };
      }
    }

    // Устанавливаем стартовые позиции альянсов
    alliances.forEach((alliance) => {
      let startX, startY;
      switch (alliance.position) {
        case 'top-left':
          startX = 2;
          startY = 2;
          break;
        case 'top-right':
          startX = 47;
          startY = 2;
          break;
        case 'bottom-left':
          startX = 2;
          startY = 47;
          break;
        case 'bottom-right':
          startX = 47;
          startY = 47;
          break;
      }
      
      // Захватываем стартовую область 3x3
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          const x = startX + dx;
          const y = startY + dy;
          if (x >= 0 && x < 50 && y >= 0 && y < 50) {
            newGrid[x][y].owner = alliance.id;
            newGrid[x][y].isRevealed = true;
          }
        }
      }
    });

    // Случайно распределяем территории противников
    for (let i = 0; i < 200; i++) {
      const x = Math.floor(Math.random() * 50);
      const y = Math.floor(Math.random() * 50);
      if (!newGrid[x][y].owner && !newGrid[x][y].isCenter) {
        const randomAlliance = alliances[Math.floor(Math.random() * alliances.length)];
        newGrid[x][y].owner = randomAlliance.id;
      }
    }

    setGrid(newGrid);
  }, [alliances]);

  const handleCellClick = (x: number, y: number) => {
    if (gameStatus !== 'playing' || currentTurns <= 0) return;

    const cell = grid[x][y];
    
    // Если клетка уже открыта союзниками, ход не тратится
    if (cell.isRevealed && cell.owner === playerAllianceId) {
      playSound('click');
      return;
    }

    // Открываем клетку
    const newGrid = [...grid];
    newGrid[x][y] = { ...cell, isRevealed: true };
    
    // Если клетка была захвачена противником или пустая, тратим ход
    if (!cell.isRevealed) {
      setCurrentTurns(prev => prev - 1);
      
      // Если это пустая клетка, захватываем её
      if (!cell.owner) {
        newGrid[x][y].owner = playerAllianceId;
        playSound('success');
      } else if (cell.owner !== playerAllianceId) {
        playSound('error');
      }
    }

    setGrid(newGrid);

    // Проверяем победу (захват центра)
    if (x === 25 && y === 25) {
      if (cell.owner === playerAllianceId || !cell.owner) {
        newGrid[x][y].owner = playerAllianceId;
        setGameStatus('won');
        playSound('success');
      }
    }
  };

  // Проверка поражения
  useEffect(() => {
    if (currentTurns <= 0 && gameStatus === 'playing') {
      const centerCell = grid[25]?.[25];
      if (centerCell?.owner !== playerAllianceId) {
        setGameStatus('lost');
        playSound('error');
      }
    }
  }, [currentTurns, grid, gameStatus, playerAllianceId]);

  const getCellColor = (cell: Cell) => {
    if (!cell.isRevealed) return 'bg-gray-700 hover:bg-gray-600';
    
    if (cell.isCenter) {
      if (cell.owner === playerAllianceId) return 'bg-yellow-500';
      return 'bg-yellow-600 animate-pulse';
    }

    if (!cell.owner) return 'bg-gray-500';
    
    const alliance = alliances.find(a => a.id === cell.owner);
    return alliance?.color || 'bg-gray-500';
  };

  const playerAlliance = alliances.find(a => a.id === playerAllianceId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBack}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <Flag className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Война Альянсов</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-white">
              <span className="text-yellow-400 font-bold">{currentTurns}</span> ходов осталось
            </div>
            {gameStatus === 'won' && (
              <div className="text-green-400 font-bold flex items-center gap-2">
                <Crown className="w-5 h-5" />
                Победа!
              </div>
            )}
            {gameStatus === 'lost' && (
              <div className="text-red-400 font-bold">Поражение!</div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Game Grid */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Flag className="w-5 h-5" />
                  Поле Битвы (50x50)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-50 gap-0.5 max-w-full overflow-auto" style={{ gridTemplateColumns: 'repeat(50, minmax(0, 1fr))' }}>
                  {grid.map((row, x) => 
                    row.map((cell, y) => (
                      <div
                        key={`${x}-${y}`}
                        className={`aspect-square ${getCellColor(cell)} cursor-pointer border border-gray-600 transition-all duration-200 ${
                          cell.isCenter ? 'ring-2 ring-yellow-400' : ''
                        }`}
                        style={{ minWidth: '8px', minHeight: '8px' }}
                        onClick={() => handleCellClick(x, y)}
                        title={`${x},${y} ${cell.isCenter ? '(Центр)' : ''} ${cell.owner ? `Альянс ${cell.owner}` : 'Пусто'}`}
                      >
                        {cell.isCenter && (
                          <div className="w-full h-full flex items-center justify-center">
                            <Crown className="w-2 h-2 text-white" />
                          </div>
                        )}
                        {!cell.isRevealed && (
                          <div className="w-full h-full flex items-center justify-center">
                            <EyeOff className="w-1 h-1 text-gray-400" />
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            {/* Selected Heroes */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Ваши Герои</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {selectedHeroes.map((hero) => (
                  <div key={hero.id} className="flex items-center gap-2 bg-purple-900/30 p-2 rounded">
                    <img src={hero.image} alt={hero.name} className="w-8 h-8 object-cover rounded" />
                    <div className="flex-1">
                      <p className="text-white text-xs font-medium">{hero.name}</p>
                      <p className="text-gray-400 text-xs">{hero.power}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alliances Legend */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Альянсы</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {alliances.map((alliance) => (
                  <div key={alliance.id} className="flex items-center gap-2">
                    <div className={`w-4 h-4 ${alliance.color} rounded`}></div>
                    <span className={`text-xs ${alliance.id === playerAllianceId ? 'text-yellow-400 font-bold' : 'text-gray-300'}`}>
                      {alliance.name} {alliance.id === playerAllianceId && '(Вы)'}
                    </span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-yellow-600 rounded ring-2 ring-yellow-400"></div>
                  <span className="text-xs text-yellow-400 font-bold">Главное Здание</span>
                </div>
              </CardContent>
            </Card>

            {/* Game Status */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white text-sm">Статус</CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-gray-300 space-y-1">
                <p>Ходов: {currentTurns}/5</p>
                <p>Цель: Захватить центр карты</p>
                <p className="text-yellow-400">Клик по клетке = исследование</p>
                <p className="text-green-400">Зеленые клетки = ваши</p>
                <p className="text-gray-400">Серые клетки = неизвестно</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllianceBattleGrid;
