import { useMathGame } from './hooks/useMathGame'
import { HomeScreen } from './components/HomeScreen'
import { SetupScreen } from './components/SetupScreen'
import { ResultsScreen } from './components/ResultsScreen'
import { PrintScreen } from './components/PrintScreen'
import { ProblemDisplay } from './components/ProblemDisplay'
import { NumberPad } from './components/NumberPad'
import { ScoreBoard } from './components/ScoreBoard'
import { LevelSelector } from './components/LevelSelector'
import { ProgressIndicator } from './components/ProgressIndicator'

export default function App() {
  const game = useMathGame()

  if (game.screen === 'home') {
    return (
      <HomeScreen
        onEndless={() => game.startEndless(1)}
        onFinite={game.goToSetup}
        onPrint={game.goToPrint}
      />
    )
  }

  if (game.screen === 'setup') {
    return (
      <SetupScreen
        onStart={game.startFinite}
        onBack={game.goHome}
      />
    )
  }

  if (game.screen === 'print') {
    return <PrintScreen onBack={game.goHome} />
  }

  if (game.screen === 'results') {
    return (
      <ResultsScreen
        score={game.score}
        totalCorrect={game.totalCorrect}
        totalAnswered={game.totalAnswered}
        bestStreak={game.bestStreak}
        elapsedTime={game.elapsedTime}
        onPlayAgain={() => game.startFinite(game.levelId, game.totalProblems)}
        onHome={game.goHome}
      />
    )
  }

  if (!game.problem) return null

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-6 sm:py-10">
      <header className="mb-4 flex w-full max-w-sm items-center justify-between">
        <button
          onClick={game.goHome}
          className="text-sm font-medium text-gray-500 transition active:text-gray-700"
        >
          &larr; Home
        </button>
        <div className="text-sm font-semibold text-gray-700">
          {game.mode === 'endless' ? 'Endless' : 'Finite'}
        </div>
      </header>

      <main className="flex w-full flex-col items-center gap-5">
        {game.mode === 'endless' && (
          <LevelSelector currentLevel={game.levelId} onChangeLevel={game.startEndless} />
        )}

        {game.mode === 'finite' && (
          <ProgressIndicator current={game.currentProblemIndex} total={game.totalProblems} />
        )}

        <ScoreBoard
          score={game.score}
          streak={game.streak}
          bestStreak={game.bestStreak}
          totalAnswered={game.totalAnswered}
          totalCorrect={game.totalCorrect}
        />

        <ProblemDisplay
          problem={game.problem}
          input={game.input}
          feedback={game.feedback}
          inputDirection={game.inputDirection}
          onToggleDirection={game.toggleInputDirection}
        />

        <NumberPad
          onDigit={game.appendDigit}
          onBackspace={game.backspace}
          onClear={game.clear}
          onSubmit={game.checkAnswer}
          disabled={game.feedback !== null}
        />
      </main>

      <footer className="mt-auto pt-8 text-center text-xs text-gray-400">
        Use keyboard or tap the number pad
      </footer>
    </div>
  )
}
