interface Props {
  onDigit: (digit: string) => void
  onBackspace: () => void
  onClear: () => void
  onSubmit: () => void
  disabled: boolean
}

export function NumberPad({ onDigit, onBackspace, onClear, onSubmit, disabled }: Props) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  return (
    <div className="w-full max-w-sm">
      <div className="grid grid-cols-3 gap-2">
        {digits.map((d) => (
          <button
            key={d}
            onClick={() => onDigit(d)}
            disabled={disabled}
            className="rounded-xl bg-white py-4 text-2xl font-semibold text-gray-800 shadow-md transition active:scale-95 active:bg-gray-100 disabled:opacity-40 sm:py-5"
          >
            {d}
          </button>
        ))}
        <button
          onClick={onClear}
          disabled={disabled}
          className="rounded-xl bg-gray-200 py-4 text-lg font-semibold text-gray-600 shadow-md transition active:scale-95 active:bg-gray-300 disabled:opacity-40 sm:py-5"
        >
          C
        </button>
        <button
          onClick={() => onDigit('0')}
          disabled={disabled}
          className="rounded-xl bg-white py-4 text-2xl font-semibold text-gray-800 shadow-md transition active:scale-95 active:bg-gray-100 disabled:opacity-40 sm:py-5"
        >
          0
        </button>
        <button
          onClick={onBackspace}
          disabled={disabled}
          className="rounded-xl bg-gray-200 py-4 text-lg font-semibold text-gray-600 shadow-md transition active:scale-95 active:bg-gray-300 disabled:opacity-40 sm:py-5"
        >
          ⌫
        </button>
      </div>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="mt-3 w-full rounded-xl bg-blue-600 py-4 text-xl font-bold text-white shadow-lg transition active:scale-[0.98] active:bg-blue-700 disabled:opacity-40 sm:py-5"
      >
        Enter
      </button>
    </div>
  )
}
