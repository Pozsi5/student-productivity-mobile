import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Egyelőre egy vak teszt: ha beírt valamit, átengedjük a Pomodoróra
        if (email.trim() === '' || password.trim() === '') {
            Alert.alert('Hiba', 'Kérlek töltsd ki az összes mezőt!');
            return;
        }

        // Ha otthon bejelentkezel, egyből átugrik a Pomodoro főoldalra
        navigation.replace('Pomodoro');
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>🎓</Text>
                <Text style={styles.title}>Student Productivity</Text>
                <Text style={styles.subtitle}>Jelentkezz be a fejlődésed követéséhez</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Email input */}
                <TextInput
                    style={styles.input}
                    placeholder="E-mail cím"
                    placeholderTextColor="#999"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Jelszó input */}
                <TextInput
                    style={styles.input}
                    placeholder="Jelszó"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry // Ez teszi pöttyökké a jelszót
                />

                {/* Bejelentkezés gomb */}
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Bejelentkezés</Text>
                </TouchableOpacity>

                {/* Regisztráció link (egyelőre csak dizájn) */}
                <TouchableOpacity style={styles.registerLink}>
                    <Text style={styles.registerText}>Még nincs fiókod? Regisztrálj!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EBF4FA',
        justifyContent: 'center',
        padding: 20,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        fontSize: 60,
        marginBottom: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
        textAlign: 'center',
    },
    formContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    input: {
        backgroundColor: '#F5F8FA',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E1E8ED',
    },
    button: {
        backgroundColor: '#4A90E2',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    registerLink: {
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        color: '#4A90E2',
        fontSize: 14,
    },
});

export default LoginScreen;