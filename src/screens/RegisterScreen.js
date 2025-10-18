// src/screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');

  const handleRegister = async () => {
    if (senha !== confirmar) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível criar a conta.');
    }
  };

  return (
    <View style={styles.container}>
      <Text h3 style={{ marginBottom: 20 }}>Cadastro</Text>
      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email' }}
        onChangeText={setEmail}
        value={email}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'material', name: 'lock' }}
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
      />
      <Input
        placeholder="Confirmar senha"
        leftIcon={{ type: 'material', name: 'lock' }}
        secureTextEntry
        onChangeText={setConfirmar}
        value={confirmar}
      />
      <Button title="Cadastrar" onPress={handleRegister} containerStyle={{ width: '80%' }} />
      <Button
        title="Voltar ao login"
        type="clear"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});
