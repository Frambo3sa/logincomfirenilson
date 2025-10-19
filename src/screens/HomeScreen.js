import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text h2 style={styles.title}>Tá logando certinho, tá vendo? 😎</Text>
      <Button
        title="Sair"
        buttonStyle={styles.button}
        titleStyle={{ fontWeight: 'bold' }}
        onPress={handleLogout}
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
    padding: 20,
  },
  title: {
    color: '#3F51B5', // azul pastel
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#3F51B5',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
});
