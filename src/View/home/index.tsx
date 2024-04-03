// src/screens/HomeScreen.tsx

import React, { useCallback, useState } from 'react';
import { View, FlatList } from 'react-native';
import { Card, CardProps } from '../../components/card';
import { useFocusEffect } from '@react-navigation/native'; 
import { Container, Header, Content, styles } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { InputSearch } from "../../components/input/InputSearch";

import coverImg from "../../../assets/bgHome.jpg";

interface CardItem {
    id: string;
  }
type Props = {
    navigation: any;
};  

export const Home = ({navigation}:Props) => {
    //const navigation = useNavigation();
    const [data, setData] = useState<CardProps[]>([]);
    const [text, setText] = useState('');
    // Adicione uma interface para definir o tipo esperado para o parâmetro `id`
  
  function handleEdit(id:any) {
    navigation.navigate('Usuario', {id:id});
  }

  useFocusEffect (useCallback(() => {
    handleFectchData(); //função responsavel por carregar os dados.
},[]))

async function handleFectchData () {
    try {
      const jsonValue = await AsyncStorage.getItem('@fromHook:cadastro');
      const data = jsonValue ? JSON.parse(jsonValue) : [];
      setData(data);
      return jsonValue 
    } catch (e) {
      // error reading value
    }
  };


  async function handleFectchDataSearch () {
    try {
      const jsonValue = await AsyncStorage.getItem('@fromHook:cadastro');
      const data = jsonValue ? JSON.parse(jsonValue) : [];
      //console.log(dbData);
      const resultado = data?.filter((item)=> item.primeiroNome.includes(text))
      console.log(resultado);
      setData(resultado);
      return resultado 
    } catch (e) {
      // error reading value
    }
  };


  return (
    <Container>
      <Header source={coverImg}>
        <InputSearch placeholder="Pesquisar por nome..." onBlur={handleFectchDataSearch} onChangeText={newText => setText(newText)}></InputSearch>
      </Header>
      <Content>
        <FlatList
            data={data}
            keyExtractor={item => item.id}
            style={styles.list}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) =>
              <Card
                data={item}
                onPress={() => handleEdit(item.id)}
              />
            }
          />
      </Content>
    </Container>

    
  );
};
