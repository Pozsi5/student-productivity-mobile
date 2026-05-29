import React, { useCallback } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSettingsApi } from "../hooks/useSettingsApi";
import { usePomodoroTimer } from "../hooks/usePomodoroTimer";

const PomodoroScreen = () => {
    const { settings, loading, updateSetting } = useSettingsApi();

    const {
        timeLeft,
        isRunning,
        currentPhase,
        handleStartPause,
        formatTime
    } = usePomodoroTimer(settings);

    const handleStartClick = useCallback(() => {
        handleStartPause();
    }, [handleStartPause]);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>Beállítások betöltése...</Text>
            </View>
        );
    }

    const timerDisplay = formatTime(timeLeft);

    return (
        <View style={styles.container}>
            {/* 1. KÉP ÉS IDŐ KIJELZÉS */}
            <View style={styles.timerCircle}>
                <Text style={styles.phaseText}>{currentPhase}</Text>
                <Text style={styles.timeText}>{timerDisplay}</Text>
            </View>
            <Text style={styles.cycleText}>
                Cycle: {currentPhase === 'Focus' ? 'Focus' : 'Break'}
            </Text>

            {/* 2. IDŐ BEÁLLÍTÓK */}
            <View style={styles.settingsGrid}>
                <SettingRow
                    label="Pomodoro (min)"
                    value={settings.workDurationMin}
                    onInc={() => updateSetting('workDurationMin', 1)}
                    onDec={() => updateSetting('workDurationMin', -1)}
                />
                <SettingRow
                    label="Short Break (min)"
                    value={settings.shortBreakDurationMin}
                    onInc={() => updateSetting('shortBreakDurationMin', 1)}
                    onDec={() => updateSetting('shortBreakDurationMin', -1)}
                />
                <SettingRow
                    label="Long Break (min)"
                    value={settings.longBreakDurationMin}
                    onInc={() => updateSetting('longBreakDurationMin', 1)}
                    onDec={() => updateSetting('longBreakDurationMin', -1)}
                />
                <SettingRow
                    label="Loops"
                    value={settings.loops}
                    onInc={() => updateSetting('loops', 1)}
                    onDec={() => updateSetting('loops', -1)}
                />
            </View>

            {/* 3. START / SZÜNET GOMB */}
            <TouchableOpacity
                style={[styles.startButton, isRunning ? styles.stopButton : null]}
                onPress={handleStartClick}
            >
                <Text style={styles.startButtonText}>{isRunning ? 'Stop' : 'Start'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const SettingRow = ({ label, value, onInc, onDec }: any) => (
    <View style={styles.settingRow}>
        <Text style={styles.settingLabel}>{label}</Text>
        <View style={styles.controls}>
            <TouchableOpacity style={styles.controlBtn} onPress={onDec}>
                <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.settingValue}>{value}</Text>
            <TouchableOpacity style={styles.controlBtn} onPress={onInc}>
                <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF4FA', // Bg-blue-100 ekvivalens
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EBF4FA',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4A90E2',
    },
    timerCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 20,
    },
    phaseText: {
        fontSize: 20,
        color: '#666',
        marginBottom: 10,
    },
    timeText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    cycleText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 40,
    },
    settingsGrid: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    settingLabel: {
        fontSize: 16,
        color: '#333',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    controlBtn: {
        backgroundColor: '#EBF4FA',
        width: 35,
        height: 35,
        borderRadius: 17.5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    controlText: {
        fontSize: 20,
        color: '#4A90E2',
        fontWeight: 'bold',
    },
    settingValue: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 15,
        minWidth: 25,
        textAlign: 'center',
    },
    startButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 50,
        borderRadius: 25,
    },
    stopButton: {
        backgroundColor: '#E24A4A',
    },
    startButtonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default PomodoroScreen;