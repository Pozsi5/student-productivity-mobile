import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { PomodoroSettings } from '../types/PomodoroSettings';

// TODO
const API_BASE_URL = 'http://192.168.X.X:8080/api';

const DEFAULT_SETTINGS: PomodoroSettings = {
    workDurationMin: 25,
    shortBreakDurationMin: 5,
    longBreakDurationMin: 15,
    loops: 4,
};

export const useSettingsApi = () => {
    const [settings, setSettings] = useState<PomodoroSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    // Segédfüggvény a token kinyeréséhez és a fejléc összeállításához
    const getAuthHeaders = async () => {
        // Ezt a kulcsot mentettük el a LoginScreen-en
        const token = await SecureStore.getItemAsync('auth_code');
        return {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
    };

    const saveSettings = async (settingsToSave: PomodoroSettings) => {
        try {
            const config = await getAuthHeaders();
            await axios.post(`${API_BASE_URL}/pomodoro/settings`, settingsToSave, config);
            console.log('Beállítások sikeresen mentve a backendre (Mobilról).');
        } catch (err) {
            console.error('Hálózati hiba a mentés során.', err);
        }
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const config = await getAuthHeaders();
                const response = await axios.get<PomodoroSettings>(`${API_BASE_URL}/pomodoro/settings`, config);
                setSettings(response.data);
            } catch (error) {
                console.error("Nem sikerült lekérni a beállításokat, default értékek használata.", error);
                setSettings(DEFAULT_SETTINGS);
            } finally {
                setLoading(false);
            }
        };

        void fetchSettings();
    }, []);

    const updateSetting = (key: keyof PomodoroSettings, delta: 1 | -1) => {
        setSettings(prevSettings => {
            const newValue = Math.max(1, prevSettings[key] + delta);
            const newSettings = {
                ...prevSettings,
                [key]: newValue
            };

            void saveSettings(newSettings);
            return newSettings;
        });
    };

    return { settings, loading, saveSettings, updateSetting };
};