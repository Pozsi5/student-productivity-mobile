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
            initialRouteName="Login"
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
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Pomodoro"
                component={PomodoroScreen}
                options={{ title: 'Pomodoro Időzítő', headerLeft: () => null }}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;