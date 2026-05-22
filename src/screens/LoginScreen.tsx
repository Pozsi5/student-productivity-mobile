import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';

WebBrowser.maybeCompleteAuthSession();

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: Props) => {
    const KEYCLOAK_URL = 'http://192.168.X.X:9080/realms/student-realm';

    const discovery = useAutoDiscovery(KEYCLOAK_URL);

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'student-mobile-client',
            redirectUri: makeRedirectUri({
                scheme: 'exp'
            }),
            scopes: ['openid', 'profile'],
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;

            SecureStore.setItemAsync('auth_code', code)
                .then(() => {
                    navigation.replace('Pomodoro');
                })
                .catch(err => console.log('Hiba a mentésnél:', err));

        } else if (response?.type === 'error') {
            Alert.alert('Hiba', 'Nem sikerült bejelentkezni a Keycloak rendszerébe!');
        }
    }, [response]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.logo}>🎓</Text>
                <Text style={styles.title}>Student Productivity</Text>
                <Text style={styles.subtitle}>Egyetemi beléptető rendszer</Text>
            </View>

            <View style={styles.formContainer}>
                <TouchableOpacity
                    style={[styles.button, !request && styles.buttonDisabled]}
                    disabled={!request}
                    onPress={() => promptAsync()}
                >
                    <Text style={styles.buttonText}>Bejelentkezés Keycloak-kal</Text>
                </TouchableOpacity>

                {!discovery && (
                    <ActivityIndicator size="small" color="#4A90E2" style={{ marginTop: 20 }} />
                )}
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
        padding: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#A0C4E8',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;