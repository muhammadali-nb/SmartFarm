import  * as SecureStore  from 'expo-secure-store';
import * as LocalAuthentication from "expo-local-authentication";


export const checkBiometricType = async (): Promise<string | null> => {
    const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
    if (
        supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
    ) {
        return "Face ID";
    } else if (
        supportedTypes.includes(
            LocalAuthentication.AuthenticationType.FINGERPRINT
        )
    ) {
        return "Отпечаток пальца";
    } else {
        return null;
    }
};

export const handlePasswordAuth = async (password: string[]) => {
    if (password.length <= 0) {
        return "Пожалуйста, введите пароль";
    }

    // Пример: проверка пароля
    if (
        password.join("") !== (await SecureStore.getItemAsync("savedPassword"))
    ) {
        throw new Error('Неправильный пароль');
    }
};