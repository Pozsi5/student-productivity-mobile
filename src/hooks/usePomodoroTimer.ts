import {useState, useEffect, useCallback, useMemo} from 'react';
import {PomodoroSettings} from '../types/PomodoroSettings';

type Phase = 'Focus' | 'ShortBreak' | 'LongBreak';

const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const format = (num: number) => num.toString().padStart(2, '0');

    return `${format(minutes)}:${format(remainingSeconds)}`;
};

export const usePomodoroTimer = (settings: PomodoroSettings) => {

    const [isRunning, setIsRunning] = useState(false);
    const [currentPhase, setCurrentPhase] = useState<Phase>('Focus');
    const [cycle, setCycle] = useState(1);


    const getPhaseDuration = useCallback((phase: Phase): number => {
        switch (phase) {
            case 'Focus':
                return settings.workDurationMin * 60;
            case 'ShortBreak':
                return settings.shortBreakDurationMin * 60;
            case 'LongBreak':
                return settings.longBreakDurationMin * 60;
            default:
                return settings.workDurationMin * 60;
        }
    }, [settings]);

    const resetTimer = useCallback((currentSettings: PomodoroSettings) => {
        const focusDuration = currentSettings.workDurationMin * 60;

        setIsRunning(false);
        setCurrentPhase('Focus');
        setCycle(1);

        return focusDuration;
    }, []);

    const initialTime = useMemo(() => resetTimer(settings), [resetTimer, settings]);
    const [timeLeft, setTimeLeft] = useState(initialTime);

    const handleStartPause = useCallback(() => {
        setIsRunning((prevIsRunning) => !prevIsRunning);
    }, []);

    const handleReset = useCallback(() => {
        const newTime = resetTimer(settings);
        setTimeLeft(newTime);
    }, [settings, resetTimer]);


    useEffect(() => {
        if (!isRunning) {
            const newTime = resetTimer(settings);
            setTimeLeft(newTime);
        }

    }, [settings, resetTimer, isRunning]);

    useEffect(() => {
        if (!isRunning || timeLeft <= 0) return;

        const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, [isRunning, timeLeft]);

    useEffect(() => {
        if (timeLeft === 0) {

            if (!isRunning) return;

            if (currentPhase === 'Focus') {

                if (cycle === settings.loops) {
                    setCurrentPhase('LongBreak');
                    setCycle(1);
                    setTimeLeft(getPhaseDuration('LongBreak'));
                } else {
                    setCurrentPhase('ShortBreak');
                    setCycle((prevCycle) => prevCycle + 1);
                    setTimeLeft(getPhaseDuration('ShortBreak'));
                }
            } else {

                if (currentPhase === 'LongBreak') {
                    handleReset();
                    return;

                } else {
                    setCurrentPhase('Focus');
                    setTimeLeft(getPhaseDuration('Focus'));
                }
            }
        }
    }, [timeLeft, currentPhase, cycle, settings.loops, getPhaseDuration, isRunning, handleReset]);

    return {
        timeLeft,
        isRunning,
        currentPhase,
        cycle,
        handleStartPause,
        handleReset,
        formatTime,
    };
};