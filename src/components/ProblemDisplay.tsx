import type { Problem } from '../utils/problemGenerator'
import type { Feedback, InputDirection } from '../hooks/useMathGame'

interface Props {
  problem: Problem
  input: string
  feedback: Feedback
  inputDirection: InputDirection
  onToggleDirection: () => void
}

export function ProblemDisplay({
  problem,
  input,
  feedback,
  inputDirection,
  onToggleDirection,
}: Props) {
  const isVertical = problem.a >= 10 || problem.b >= 10

  const feedbackColor =
    feedback === 'correct'
      ? 'text-green-600'
      : feedback === 'incorrect'
        ? 'text-red-500'
        : 'text-gray-900'

  const borderColor =
    feedback === 'correct'
      ? 'border-green-400 bg-green-50'
      : feedback === 'incorrect'
        ? 'border-red-400 bg-red-50'
        : 'border-gray-200 bg-white'

  if (isVertical) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <div
          className={`flex w-full flex-col items-center rounded-2xl border-2 p-5 transition-colors duration-200 ${borderColor}`}
        >
          <div className="mb-4 flex w-full items-center justify-between rounded-xl bg-gray-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => inputDirection !== 'rtl' && onToggleDirection()}
              className={`flex-1 rounded-lg py-1.5 transition ${
                inputDirection === 'rtl'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              &larr; Right to Left (1s first)
            </button>
            <button
              type="button"
              onClick={() => inputDirection !== 'ltr' && onToggleDirection()}
              className={`flex-1 rounded-lg py-1.5 transition ${
                inputDirection === 'ltr'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Left to Right &rarr;
            </button>
          </div>

          <div className="inline-flex min-w-[8rem] flex-col items-end font-mono text-4xl font-bold tracking-widest tabular-nums text-gray-900 sm:text-5xl">
            <div>{problem.a}</div>
            <div className="mt-1 flex w-full items-center justify-between gap-6">
              <span className="select-none text-gray-500">+</span>
              <span>{problem.b}</span>
            </div>
            <div className="my-2 w-full rounded-full border-b-4 border-gray-800" />
            <div
              className={`transition-colors duration-200 ${feedbackColor} ${
                feedback === 'incorrect' ? 'line-through opacity-75' : ''
              }`}
            >
              {input || <span className="text-gray-300">?</span>}
            </div>
            {feedback === 'incorrect' && (
              <div className="mt-1 text-green-600">{problem.answer}</div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-4">
      <div
        className={`w-full rounded-2xl border-2 p-6 text-center transition-colors duration-200 ${borderColor}`}
      >
        <div className="text-4xl font-bold tracking-wide text-gray-900 sm:text-5xl">
          {problem.a} + {problem.b} =
        </div>
        <div className={`mt-2 text-4xl font-bold transition-colors duration-200 sm:text-5xl ${feedbackColor}`}>
          {input || <span className="text-gray-300">?</span>}
          {feedback === 'incorrect' && (
            <span className="ml-2 text-2xl text-gray-400 line-through sm:text-3xl">
              {input}
            </span>
          )}
        </div>
        {feedback === 'incorrect' && (
          <div className="mt-1 text-3xl font-bold text-green-600 sm:text-4xl">
            {problem.answer}
          </div>
        )}
      </div>
    </div>
  )
}
