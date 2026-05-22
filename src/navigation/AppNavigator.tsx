import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import PomodoroScreen from '../screens/PomodoroScreen';

export type RootStackParamList = {
    Login: undefined;
    Pomodoro: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login" // <-- Átállítottuk! Mostantól a Login az első oldal!
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4A90E2',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                cardStyle: { backgroundColor: '#EBF4FA' }
            }}
        >
            {/* Login képernyő - a fejlécet elrejtjük (headerShown: false) */}
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            {/* Pomodoro képernyő */}
            <Stack.Screen
                name="Pomodoro"
                component={PomodoroScreen}
                options={{ title: 'Pomodoro Időzítő', headerLeft: () => null }} // headerLeft: null elrejti a vissza gombot, mert bejelentkezés után ne lehessen visszamenni a loginra a gombbal
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;