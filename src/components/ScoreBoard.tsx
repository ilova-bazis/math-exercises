interface Props {
  score: number
  streak: number
  bestStreak: number
  totalAnswered: number
  totalCorrect: number
}

export function ScoreBoard({ score, streak, bestStreak, totalAnswered, totalCorrect }: Props) {
  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 100

  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-4 gap-2 text-center">
        <div className="rounded-xl bg-white p-3 shadow-md">
          <div className="text-xs font-medium text-gray-500 uppercase">Score</div>
          <div className="text-xl font-bold text-gray-900">{score}</div>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-md">
          <div className="text-xs font-medium text-gray-500 uppercase">Streak</div>
          <div className="text-xl font-bold text-orange-500">{streak}</div>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-md">
          <div className="text-xs font-medium text-gray-500 uppercase">Best</div>
          <div className="text-xl font-bold text-purple-600">{bestStreak}</div>
        </div>
        <div className="rounded-xl bg-white p-3 shadow-md">
          <div className="text-xs font-medium text-gray-500 uppercase">Accuracy</div>
          <div className="text-xl font-bold text-blue-600">{accuracy}%</div>
        </div>
      </div>
    </div>
  )
}
