import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PomodoroScreen from '../screens/PomodoroScreen';

// Definiáljuk a navigációs listánkat (milyen oldalak léteznek az appban)
export type RootStackParamList = {
    Pomodoro: undefined;
    // Ide jön majd később pl: Login: undefined; vagy TaskDetails: { taskId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Pomodoro"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#4A90E2', // Szép kék fejléc, mint a weben
                },
                headerTintColor: '#fff', // Fehér szövegszín a fejlécben
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                cardStyle: { backgroundColor: '#EBF4FA' } // Egységes háttérszín minden oldalnak
            }}
        >
            <Stack.Screen
                name="Pomodoro"
                component={PomodoroScreen}
                options={{ title: 'Pomodoro Időzítő' }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;