import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const PomodoroScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Student Productivity</Text>
            <Text style={styles.subtitle}>Mobil Pomodoro Időzítő</Text>

            <View style={styles.timerCircle}>
                <Text style={styles.timerText}>25:00</Text>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Fókusz indítása</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF4FA',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4A90E2',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40,
    },
    timerCircle: {
        width: 220,
        height: 220,
        borderRadius: 110,
        borderWidth: 6,
        borderColor: '#4A90E2',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        marginBottom: 40,
    },
    timerText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#333',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PomodoroScreen;