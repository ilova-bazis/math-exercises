import { useState } from 'react'
import { LEVELS } from '../utils/problemGenerator'

interface Props {
  onStart: (levelId: number, count: number) => void
  onBack: () => void
}

const PRESET_COUNTS = [10, 20, 50]

export function SetupScreen({ onStart, onBack }: Props) {
  const [selectedLevel, setSelectedLevel] = useState(1)
  const [selectedCount, setSelectedCount] = useState(20)

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-sm">
        <button
          onClick={onBack}
          className="mb-6 text-sm font-medium text-gray-500 transition active:text-gray-700"
        >
          &larr; Back
        </button>

        <h2 className="text-2xl font-bold text-gray-900">Setup Session</h2>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Difficulty
          </label>
          <div className="grid grid-cols-2 gap-2">
            {LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`rounded-xl px-3 py-2.5 text-sm font-semibold shadow-md transition active:scale-95 ${
                  selectedLevel === level.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 active:bg-gray-100'
                }`}
              >
                <div>{level.name}</div>
                <div className={`text-xs font-normal ${selectedLevel === level.id ? 'text-blue-200' : 'text-gray-400'}`}>
                  {level.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Number of Problems
          </label>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_COUNTS.map((count) => (
              <button
                key={count}
                onClick={() => setSelectedCount(count)}
                className={`rounded-xl px-3 py-3 text-lg font-bold shadow-md transition active:scale-95 ${
                  selectedCount === count
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 active:bg-gray-100'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => onStart(selectedLevel, selectedCount)}
          className="mt-8 w-full rounded-2xl bg-green-600 py-4 text-xl font-bold text-white shadow-lg transition active:scale-[0.98] active:bg-green-700"
        >
          Start Session
        </button>
      </div>
    </div>
  )
}
