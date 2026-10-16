import { LEVELS } from '../utils/problemGenerator'

interface Props {
  currentLevel: number
  onChangeLevel: (levelId: number) => void
}

export function LevelSelector({ currentLevel, onChangeLevel }: Props) {
  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {LEVELS.map((level) => (
          <button
            key={level.id}
            onClick={() => onChangeLevel(level.id)}
            className={`flex-shrink-0 rounded-lg px-2.5 py-2 text-xs font-semibold shadow-sm transition active:scale-95 ${
              currentLevel === level.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 active:bg-gray-100'
            }`}
          >
            {level.name}
          </button>
        ))}
      </div>
    </div>
  )
}
