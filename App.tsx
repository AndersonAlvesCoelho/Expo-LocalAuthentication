import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert, Button, Text, View } from 'react-native';

import * as LocalAuthentication from 'expo-local-authentication';

import { styles } from './styles';

export default function App() {
  const [iAuthenticated, setIAuthenticated] = useState(false);

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(
      'type ',
      types.map((type) => LocalAuthentication.AuthenticationType[type])
    );
  }

  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      return Alert.alert(
        'Login',
        'Nenhumna biometria encontrada. Pir favor, cadastre no dispositivo.'
      );
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel: "Biometria não reconhecida"
    })
    setIAuthenticated(auth.success)
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Usúario conectado: {iAuthenticated ? 'SIM' : 'NÃO'}</Text>

      <Button title="Entrar" onPress={handleAuthentication} />
    </View>
  );
}
