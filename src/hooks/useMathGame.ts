import { useState, useCallback, useEffect, useRef } from 'react'
import { generateProblem, POINTS, type Problem } from '../utils/problemGenerator'

export type Feedback = 'correct' | 'incorrect' | null
export type GameMode = 'endless' | 'finite'
export type Screen = 'home' | 'setup' | 'practice' | 'results'
export type InputDirection = 'ltr' | 'rtl'

const NEXT_PROBLEM_DELAY = 800

export function useMathGame() {
  const [screen, setScreen] = useState<Screen>('home')
  const [mode, setMode] = useState<GameMode>('endless')
  const [problem, setProblem] = useState<Problem | null>(null)
  const [input, setInput] = useState('')
  const inputRef = useRef('')
  const [inputDirection, setInputDirection] = useState<InputDirection>('rtl')
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [feedback, setFeedback] = useState<Feedback>(null)
  const [levelId, setLevelId] = useState(1)
  const [totalProblems, setTotalProblems] = useState(0)
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)
  const [totalCorrect, setTotalCorrect] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isVerticalProblem = problem !== null && (problem.a >= 10 || problem.b >= 10)
  const effectiveDirection: InputDirection = isVerticalProblem ? inputDirection : 'ltr'

  const updateInput = useCallback((newInput: string) => {
    inputRef.current = newInput
    setInput(newInput)
  }, [])

  const toggleInputDirection = useCallback(() => {
    setInputDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'))
  }, [])

  const goHome = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setScreen('home')
    setProblem(null)
    updateInput('')
    setFeedback(null)
  }, [updateInput])

  const goToSetup = useCallback(() => {
    setScreen('setup')
  }, [])

  const startEndless = useCallback((lvl: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMode('endless')
    setLevelId(lvl)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setTotalAnswered(0)
    setTotalCorrect(0)
    setCurrentProblemIndex(0)
    setTotalProblems(0)
    setStartTime(Date.now())
    setElapsedTime(0)
    setProblem(generateProblem(lvl))
    updateInput('')
    setFeedback(null)
    setScreen('practice')
  }, [updateInput])

  const startFinite = useCallback((lvl: number, count: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setMode('finite')
    setLevelId(lvl)
    setScore(0)
    setStreak(0)
    setBestStreak(0)
    setTotalAnswered(0)
    setTotalCorrect(0)
    setCurrentProblemIndex(1)
    setTotalProblems(count)
    setStartTime(Date.now())
    setElapsedTime(0)
    setProblem(generateProblem(lvl))
    updateInput('')
    setFeedback(null)
    setScreen('practice')
  }, [updateInput])

  const checkAnswer = useCallback(() => {
    const currentInput = inputRef.current
    if (currentInput.length === 0 || feedback !== null || !problem) return

    const isCorrect = parseInt(currentInput, 10) === problem.answer

    if (isCorrect) {
      const basePoints = POINTS[levelId] ?? 10
      setScore((s) => s + basePoints + streak * 2)
      setStreak((s) => {
        const newStreak = s + 1
        setBestStreak((b) => Math.max(b, newStreak))
        return newStreak
      })
      setTotalCorrect((c) => c + 1)
      setFeedback('correct')
    } else {
      setStreak(0)
      setFeedback('incorrect')
    }

    setTotalAnswered((a) => a + 1)

    timeoutRef.current = setTimeout(() => {
      if (mode === 'finite' && currentProblemIndex >= totalProblems) {
        setElapsedTime(Date.now() - startTime)
        setScreen('results')
      } else {
        setProblem(generateProblem(levelId))
        updateInput('')
        setFeedback(null)
        if (mode === 'finite') {
          setCurrentProblemIndex((i) => i + 1)
        }
      }
    }, NEXT_PROBLEM_DELAY)
  }, [feedback, problem, levelId, streak, mode, currentProblemIndex, totalProblems, startTime, updateInput])

  const appendDigit = useCallback((digit: string) => {
    if (feedback !== null) return
    const newInput =
      effectiveDirection === 'rtl'
        ? digit + inputRef.current
        : inputRef.current + digit
    if (newInput.length > 7) return
    updateInput(newInput)
  }, [feedback, effectiveDirection, updateInput])

  const backspace = useCallback(() => {
    if (feedback !== null) return
    const nextInput =
      effectiveDirection === 'rtl'
        ? inputRef.current.slice(1)
        : inputRef.current.slice(0, -1)
    updateInput(nextInput)
  }, [feedback, effectiveDirection, updateInput])

  const clear = useCallback(() => {
    if (feedback !== null) return
    updateInput('')
  }, [feedback, updateInput])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (screen !== 'practice') return
      if (e.key >= '0' && e.key <= '9') {
        appendDigit(e.key)
      } else if (e.key === 'Backspace') {
        backspace()
      } else if (e.key === 'Enter') {
        checkAnswer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [appendDigit, backspace, checkAnswer, screen])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  return {
    screen,
    mode,
    problem,
    input,
    inputDirection,
    toggleInputDirection,
    score,
    streak,
    bestStreak,
    feedback,
    levelId,
    totalProblems,
    currentProblemIndex,
    totalAnswered,
    totalCorrect,
    elapsedTime,
    appendDigit,
    backspace,
    clear,
    checkAnswer,
    goHome,
    goToSetup,
    startEndless,
    startFinite,
  }
}
