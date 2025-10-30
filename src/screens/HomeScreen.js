import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { Text, Button, ListItem, Icon } from 'react-native-elements';
import axios from 'axios';
import { signOut } from 'firebase/auth';
import { auth, databaseURL } from '../firebaseConfig';

export default function HomeScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [contatos, setContatos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  
  useEffect(() => {
    carregarContatos();
  }, []);


  const carregarContatos = async () => {
    try {
      const response = await axios.get(`${databaseURL}/contatos.json`);
      if (response.data) {
        const data = Object.entries(response.data).map(([id, value]) => ({
          id,
          nome: value.nome,
          telefone: value.telefone,
        }));
        setContatos(data);
      } else {
        setContatos([]);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os contatos.');
      console.error('Erro ao carregar contatos:', error);
    }
  };


  const adicionarContato = async () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Preencha nome e telefone.');
      return;
    }

    try {
      await axios.post(`${databaseURL}/contatos.json`, { nome, telefone });
      setNome('');
      setTelefone('');
      carregarContatos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar o contato.');
      console.error('Erro ao adicionar:', error);
    }
  };


  const editarContato = (contato) => {
    setEditandoId(contato.id);
    setNome(contato.nome);
    setTelefone(contato.telefone);
  };


  const salvarEdicao = async () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Atenção', 'Preencha nome e telefone.');
      return;
    }

    try {
      await axios.put(`${databaseURL}/contatos/${editandoId}.json`, { nome, telefone });
      setNome('');
      setTelefone('');
      setEditandoId(null);
      carregarContatos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível editar o contato.');
      console.error('Erro ao salvar edição:', error);
    }
  };


  const excluirContato = async (id) => {
  if (!id) {
    Alert.alert('Erro', 'ID do contato inválido.');
    return;
  }

  try {
    console.log('🗑 Excluindo contato com ID:', id);
    await axios.delete(`${databaseURL}/contatos/${id}.json`);
    carregarContatos();
  } catch (error) {
    console.error('Erro ao excluir contato:', error);
    Alert.alert('Erro', 'Não foi possível excluir o contato.');
  }
};

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  
  return (
    <View style={styles.container}>
      <Text h3 style={styles.title}> Lista Telefônica</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        keyboardType="phone-pad"
        onChangeText={setTelefone}
      />

      {editandoId ? (
        <Button
          title="Salvar Edição"
          buttonStyle={[styles.addButton, { backgroundColor: '#FFA000' }]}
          onPress={salvarEdicao}
        />
      ) : (
        <Button
          title="Adicionar Contato"
          buttonStyle={styles.addButton}
          onPress={adicionarContato}
        />
      )}

      <FlatList
        data={contatos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListItem bottomDivider>
            <Icon name="person" color="#3F51B5" />
            <ListItem.Content>
              <ListItem.Title>{item.nome}</ListItem.Title>
              <ListItem.Subtitle>{item.telefone}</ListItem.Subtitle>
            </ListItem.Content>

            <Icon
              name="edit"
              type="material"
              color="#FFA000"
              onPress={() => editarContato(item)}
            />
            <Icon
              name="delete"
              type="material"
              color="#F44336"
              onPress={() => excluirContato(item.id)}
            />
          </ListItem>
        )}
      />

      <Button
        title="Sair"
        buttonStyle={styles.logoutButton}
        onPress={handleLogout}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E1',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#3F51B5',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#3F51B5',
    borderRadius: 25,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: '#F44336',
    borderRadius: 25,
    marginTop: 20,
  },
});
