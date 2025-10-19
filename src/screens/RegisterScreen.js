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
      <Text h3 style={styles.title}>Crie sua conta</Text>

      <Input
        placeholder="Email"
        leftIcon={{ type: 'material', name: 'email', color: '#3F51B5' }}
        onChangeText={setEmail}
        value={email}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Senha"
        leftIcon={{ type: 'material', name: 'lock', color: '#3F51B5' }}
        secureTextEntry
        onChangeText={setSenha}
        value={senha}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Confirmar senha"
        leftIcon={{ type: 'material', name: 'lock', color: '#3F51B5' }}
        secureTextEntry
        onChangeText={setConfirmar}
        value={confirmar}
        containerStyle={styles.inputContainer}
      />

      <Button
        title="Cadastrar"
        onPress={handleRegister}
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: 'bold' }}
      />

      <Button
        title="Voltar ao login"
        type="clear"
        titleStyle={styles.linkText}
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1', // amarelo pastel
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
    backgroundColor: '#3F51B5',
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
