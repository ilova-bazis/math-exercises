interface Props {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: Props) {
  const progress = Math.round((current / total) * 100)

  return (
    <div className="w-full max-w-sm">
      <div className="mb-1 flex justify-between text-sm font-medium text-gray-600">
        <span>Problem {current} of {total}</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
