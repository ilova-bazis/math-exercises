interface Props {
  onEndless: () => void
  onFinite: () => void
  onPrint: () => void
}

export function HomeScreen({ onEndless, onFinite, onPrint }: Props) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Math Practice</h1>
        <p className="mt-2 text-gray-500">Addition</p>

        <div className="mt-10 flex flex-col gap-4">
          <button
            onClick={onEndless}
            className="w-full rounded-2xl bg-blue-600 py-5 text-xl font-bold text-white shadow-lg transition active:scale-[0.98] active:bg-blue-700"
          >
            Endless Mode
            <span className="mt-1 block text-sm font-normal text-blue-200">
              Practice as long as you want
            </span>
          </button>

          <button
            onClick={onFinite}
            className="w-full rounded-2xl bg-white py-5 text-xl font-bold text-gray-800 shadow-lg transition active:scale-[0.98] active:bg-gray-100"
          >
            Finite Session
            <span className="mt-1 block text-sm font-normal text-gray-500">
              Set difficulty and number of problems
            </span>
          </button>

          <button
            onClick={onPrint}
            className="w-full rounded-2xl bg-white py-5 text-xl font-bold text-gray-800 shadow-lg transition active:scale-[0.98] active:bg-gray-100"
          >
            Print Worksheet
            <span className="mt-1 block text-sm font-normal text-gray-500">
              Generate printable exercises &amp; answer key
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}
