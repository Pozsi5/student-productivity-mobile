import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {/* Beágyazzuk a navigációs térképünket */}
                <AppNavigator />
                {/* Beállítjuk, hogy a telefon felső ikonsor (óra, akksi) sötét stílusú legyen */}
                <StatusBar style="dark" />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}