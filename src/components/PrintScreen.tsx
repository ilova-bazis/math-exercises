import { useState, useMemo, useCallback } from 'react'
import { LEVELS, generateProblem, type Problem } from '../utils/problemGenerator'

interface Props {
  initialLevelId?: number
  initialCount?: number
  onBack: () => void
}

const PRESET_COUNTS = [10, 20, 30, 50]

export function PrintScreen({ initialLevelId = 1, initialCount = 20, onBack }: Props) {
  const [levelId, setLevelId] = useState(initialLevelId)
  const [count, setCount] = useState(initialCount)
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true)
  const [seed, setSeed] = useState(0)

  const level = useMemo(
    () => LEVELS.find((l) => l.id === levelId) ?? LEVELS[0],
    [levelId]
  )

  const problems = useMemo<Problem[]>(() => {
    // seed is used to trigger regeneration on demand
    void seed
    return Array.from({ length: count }, () => generateProblem(levelId))
  }, [levelId, count, seed])

  const regenerate = useCallback(() => {
    setSeed((s) => s + 1)
  }, [])

  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 print:min-h-0 print:bg-white print:p-0">
      {/* Controls (Hidden when printing) */}
      <div className="mx-auto mb-8 max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm print:hidden">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-medium text-gray-500 transition hover:text-gray-800 active:text-gray-900"
          >
            &larr; Back
          </button>
          <h2 className="text-xl font-bold text-gray-900">Print Worksheet</h2>
          <div className="w-12" />
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Difficulty Level
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {LEVELS.map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setLevelId(lvl.id)}
                className={`rounded-xl px-3 py-2 text-left text-xs font-semibold shadow-sm transition active:scale-95 ${
                  levelId === lvl.id
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div>
                  L{lvl.id}: {lvl.name}
                </div>
                <div
                  className={`truncate text-[11px] font-normal ${
                    levelId === lvl.id ? 'text-blue-200' : 'text-gray-400'
                  }`}
                >
                  {lvl.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Number of Problems
            </label>
            <div className="grid grid-cols-4 gap-2">
              {PRESET_COUNTS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={`rounded-xl py-2.5 text-sm font-bold shadow-sm transition active:scale-95 ${
                    count === c
                      ? 'bg-blue-600 text-white'
                      : 'border border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-700 select-none hover:bg-gray-100">
              <input
                type="checkbox"
                checked={includeAnswerKey}
                onChange={(e) => setIncludeAnswerKey(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              Include Answer Key (separate page)
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={regenerate}
            className="flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-base font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-[0.99]"
          >
            Shuffle Problems
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="flex-[2] rounded-xl bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-blue-700 active:scale-[0.99]"
          >
            Print Worksheet
          </button>
        </div>
      </div>

      {/* Printable Worksheet Preview & Print Area */}
      <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-sm print:max-w-none print:rounded-none print:border-none print:p-4 print:shadow-none">
        {/* Worksheet Page */}
        <div>
          <div className="mb-6 border-b border-gray-300 pb-2">
            <h1 className="text-lg font-bold text-gray-900">
              Level {level.id}: {level.name}{' '}
              <span className="font-normal text-gray-500">&mdash; {level.description}</span>
            </h1>
          </div>

          <WorksheetGrid problems={problems} showAnswers={false} />
        </div>

        {/* Answer Key Page */}
        {includeAnswerKey && (
          <div className="mt-12 border-t-2 border-dashed border-gray-300 pt-10 print:mt-0 print:break-before-page print:border-none print:pt-0">
            <div className="mb-6 border-b border-gray-300 pb-2">
              <h2 className="text-lg font-bold text-gray-900">
                Answer Key &mdash; Level {level.id}: {level.name}
              </h2>
            </div>

            <WorksheetGrid problems={problems} showAnswers={true} />
          </div>
        )}
      </div>
    </div>
  )
}

function WorksheetGrid({
  problems,
  showAnswers,
}: {
  problems: Problem[]
  showAnswers: boolean
}) {
  const hasVertical = problems.some((p) => p.a >= 10 || p.b >= 10)

  return (
    <div
      className={
        hasVertical
          ? 'grid grid-cols-4 gap-x-6 gap-y-8 sm:grid-cols-5 print:grid-cols-5'
          : 'grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3 print:grid-cols-3'
      }
    >
      {problems.map((p, idx) => {
        const isVertical = p.a >= 10 || p.b >= 10

        if (isVertical) {
          return (
            <div
              key={idx}
              className="flex break-inside-avoid flex-col items-center rounded-lg p-2"
            >
              <div className="mb-1 self-start text-xs font-medium text-gray-400">
                ({idx + 1})
              </div>
              <div className="inline-flex min-w-[4.5rem] flex-col items-end font-mono text-2xl font-bold tracking-widest tabular-nums text-gray-900">
                <div>{p.a}</div>
                <div className="flex w-full items-center justify-between gap-3">
                  <span className="text-gray-600">+</span>
                  <span>{p.b}</span>
                </div>
                <div className="my-1 w-full border-b-2 border-gray-900" />
                <div className="h-8 text-gray-700">
                  {showAnswers ? p.answer : ''}
                </div>
              </div>
            </div>
          )
        }

        return (
          <div
            key={idx}
            className="flex break-inside-avoid items-baseline gap-2 py-1 font-mono text-xl font-bold tabular-nums text-gray-900"
          >
            <span className="w-8 font-sans text-xs font-medium text-gray-400">
              ({idx + 1})
            </span>
            <span>
              {p.a} + {p.b} =
            </span>
            <span className="inline-block min-w-[3rem] border-b-2 border-gray-900 text-center text-gray-700">
              {showAnswers ? p.answer : '\u00A0'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
