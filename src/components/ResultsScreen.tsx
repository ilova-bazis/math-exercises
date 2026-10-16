interface Props {
  score: number
  totalCorrect: number
  totalAnswered: number
  bestStreak: number
  elapsedTime: number
  onPlayAgain: () => void
  onHome: () => void
}

function formatTime(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export function ResultsScreen({
  score,
  totalCorrect,
  totalAnswered,
  bestStreak,
  elapsedTime,
  onPlayAgain,
  onHome,
}: Props) {
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center">
        <h2 className="text-2xl font-bold text-gray-900">Session Complete!</h2>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow-lg">
          <div className="text-5xl font-bold text-blue-600">{score}</div>
          <div className="mt-1 text-sm font-medium text-gray-500 uppercase">Total Points</div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white p-3 shadow-md">
            <div className="text-lg font-bold text-green-600">{accuracy}%</div>
            <div className="text-xs text-gray-500">Accuracy</div>
          </div>
          <div className="rounded-xl bg-white p-3 shadow-md">
            <div className="text-lg font-bold text-purple-600">{bestStreak}</div>
            <div className="text-xs text-gray-500">Best Streak</div>
          </div>
          <div className="rounded-xl bg-white p-3 shadow-md">
            <div className="text-lg font-bold text-orange-500">{formatTime(elapsedTime)}</div>
            <div className="text-xs text-gray-500">Time</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={onPlayAgain}
            className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-lg transition active:scale-[0.98] active:bg-blue-700"
          >
            Play Again
          </button>
          <button
            onClick={onHome}
            className="w-full rounded-2xl bg-white py-4 text-lg font-bold text-gray-700 shadow-lg transition active:scale-[0.98] active:bg-gray-100"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  )
}
