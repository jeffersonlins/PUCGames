import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { styles } from './styles';

export type CardProps = {
  id: string;
  primeiroNome: string;
  ultimoNome: string;
  email: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
}
type Props = {
  data: CardProps;
  onPress: () => void;
}

export function Card({ data, onPress }: Props) {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  
  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <View>
          <Text style={styles.linha}>
            Nome: {data.primeiroNome} {data.ultimoNome}
          </Text>
          <Text style={styles.linha2}>
            E-mail: {data.email}
          </Text>
          <Text style={styles.linha2}>
            Endereço: {data.endereco}, {data.numero} - {data.bairro} - {data.cidade}/{data.uf}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <MaterialIcons
          name="edit"
          size={22}
          color="#888D97"
        />
      </TouchableOpacity>
    </View>
  );
}