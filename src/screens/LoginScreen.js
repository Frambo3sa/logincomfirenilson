import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Email ou senha inválidos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}>Bem-vindo de volta!</Text>

      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email', color: '#3F51B5' }}
        onChangeText={setEmail}
        value={email}
        inputStyle={{ color: '#333' }}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'material', name: 'lock', color: '#3F51B5' }}
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
        inputStyle={{ color: '#333' }}
        containerStyle={styles.inputContainer}
      />

      <Button
        title="Entrar"
        onPress={handleLogin}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: 'bold' }}
      />

      <Button
        title="Criar conta"
        type="clear"
        titleStyle={styles.linkText}
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD', // azul pastel
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
  title: {
    marginBottom: 40,
    color: '#3F51B5',
  },
  inputContainer: {
    width: '90%',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FFEE58', // amarelo pastel
    borderRadius: 25,
    paddingVertical: 12,
    width: '90%',
  },
  linkText: {
    color: '#3F51B5',
    marginTop: 10,
    fontWeight: 'bold',
  },
});
