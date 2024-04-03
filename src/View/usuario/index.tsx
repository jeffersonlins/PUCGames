import React, { useEffect, useState } from 'react';
import { Center, HStack, Heading, Modal, VStack } from 'native-base'
import { Controller, useForm } from 'react-hook-form';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import uuid from "react-native-uuid";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-tiny-toast';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { RootTabParamList } from '../router';
import { FunctionSetInputValue } from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';
import { ActivityIndicator } from 'react-native';
import { ExcluirItemDialog } from '../../components/Dialog';
import UsuarioModel from '../../Model/UsuarioModel';
import UsuarioController from '../../Controller/UsuarioController';
import CepController from '../../Controller/CepController';
import CepModel from '../../Model/CepModel';

const schemaRegister = yup.object({
  primeiroNome: yup.string().required('Primeiro nome obrigatório'),
  ultimoNome: yup.string().required('Último nome obrigatório'),
  cep: yup.string().required('CEP obrigatório'),
  endereco: yup.string().required('Endereço obrigatório'),
  numero: yup.string().required('Número obrigatório'),
  bairro: yup.string().required('Bairro obrigatório'),
  cidade: yup.string().required('Cidade obrigatório'),
  uf: yup.string().required('UF obrigatório'),
  email: yup.string().required('Email obrigatório').min(6, 'Informe no minímo 6 digitos').email('E-mail informado não é valido'),
})

type UsuarioRouterProp = BottomTabScreenProps<RootTabParamList, 'Usuario'>;

export const Usuario = ({route, navigation}: UsuarioRouterProp ) =>{
  const {control, handleSubmit, reset, setValue, formState:{errors}} = useForm<UsuarioModel>({
    resolver: yupResolver(schemaRegister) as any
  }
  );
  
  const [loading, setLoading] = useState(true);
  const [seacherID, setSeacherID] = useState(true);
  const [cep, setCep] = useState('');
  const [ceps, setCeps] = useState<CepModel[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const isEditing = !!route?.params?.id;

  useEffect(() => {
    if (isEditing){
      handlerSearcher(route.params.id)
      setSeacherID(true);
    }else{
	  setSeacherID(false);
	  reset();
      setLoading(false);				
    }

    return () => setLoading(true);
  },[route, isEditing ]);
 
  useEffect(() => {
    if (route?.params?.id) handlerSearcher(route?.params?.id);
    else {
      reset();
      setLoading(false);
    }

    return () => setLoading(true);
  }, [route]);

  function handleList(){
    navigation.navigate('Home');
  }

  async function handlerRegister(data:UsuarioModel){
    data.id = uuid.v4().toString();
    try{
      setLoading(true);
      const returnRegister = await UsuarioController.registerUsuario(data);
      
      if (returnRegister){
        Toast.showSuccess('Cadastro realizado com sucesso')

        reset();
        handleList();
      }else{
        Toast.show('Erro ao tentar Cadastrar!');
      }
    }catch (err) {
      console.log(err);
    }
  }

  async function handlerAlterRegister(data:UsuarioModel){ 
    try{
      setLoading(true);
      const returnAlter = await UsuarioController.alterUsuario(data);
      
      if (returnAlter){
        Toast.showSuccess('Cadastro alterado com sucesso')
        setLoading(false)
        setSeacherID(false);
        reset();
        handleList();

      }else{
        Toast.show('Registro não localizado!');
      }
    }
    catch (err) {
      console.log(err);
    }    
  }

  async function handleDelete(data:UsuarioModel){ 
    try{
      setLoading(true);
      const returnDelete = await UsuarioController.deleteUsuario(data.id);
      
      if (returnDelete){
        Toast.showSuccess('Registro excluido com sucesso')

        setShowDeleteDialog(false);
        setSeacherID(false);

        reset();
        handleList();
      }else{
        Toast.show('Registro não localizado!');
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handlerSearcher(id: string) {
    try{
      setLoading(true);

      const itemEncontrado = await UsuarioController.getUsuarioFindById(id);

      if(itemEncontrado){
        Object.keys(itemEncontrado).forEach((key =>
          setValue(key as keyof UsuarioModel, itemEncontrado?.[key as keyof UsuarioModel] as string) ));
          setSeacherID(true);
      }
      setLoading(false);
    }catch (error){
      setLoading(false);
    }
  }

  async function handlerCep(e:any) {
    try{
      
      setLoading(true);

      const returnCep = await CepController.fetchCep(e.nativeEvent.text).then(() =>{
        setCeps([...CepController.getCeps()]);
      });

      console.log(ceps);

      setValue("bairro", ceps[0]['bairro']);
      setValue("endereco", ceps[0]['logradouro']);
      setValue("cidade", ceps[0]['localidade']);
      setValue("uf", ceps[0]['uf']);
      
      setLoading(false);
      
    }catch (err) {
      console.log(err);
    }
  }

  if (loading) return <ActivityIndicator size='large' color='#0000ff'/>

  return (
    <KeyboardAwareScrollView>
      <VStack flex={1} px={5} pb={100}>
        <Center>
          <Heading my={2}></Heading>

          <Controller
            control={control}
            name='primeiroNome'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Primeiro Nome'
                onChangeText={onChange}
                errorMessage={errors.primeiroNome?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='ultimoNome'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Último Nome'
                onChangeText={onChange}
                errorMessage={errors.ultimoNome?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='email'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='E-mail'
                onChangeText={onChange}
                errorMessage={errors.email?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='cep'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Cep'
                onChangeText={onChange}
                errorMessage={errors.cep?.message}
                value={value}
                onBlur={handlerCep}
                onKeyPress={newText => setCep(newText)}
              />
            )}
          />

          <Controller
            control={control}
            name='endereco'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Endereço'
                onChangeText={onChange}
                errorMessage={errors.endereco?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='numero'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Número'
                onChangeText={onChange}
                errorMessage={errors.numero?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='bairro'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Bairro'
                onChangeText={onChange}
                errorMessage={errors.bairro?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='cidade'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='Cidade'
                onChangeText={onChange}
                errorMessage={errors.cidade?.message}
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name='uf'
            defaultValue=''
            render={({ field: { onChange, value } }) => (
              <Input
                placeholder='UF'
                onChangeText={onChange}
                errorMessage={errors.uf?.message}
                value={value}
              />
            )}
          />

          {seacherID ? (
            <VStack>
            <HStack>
              <Button rounded="md" shadow={3} title='Alterar' color='#F48B20' onPress={handleSubmit(handlerAlterRegister)} />
            </HStack>
            <HStack paddingTop={5}>
              <Button rounded="md" shadow={3} title='Excluir' color='#CC0707' onPress={() => setShowDeleteDialog(true)} />
            </HStack>
            </VStack>
          ) : (
            <Button title='Cadastrar' color='green.700' onPress={handleSubmit(handlerRegister)} />
          )}

        </Center>
      </VStack>
      {/* Diálogo de exclusão renderizado como um modal */}
      <Modal isOpen={showDeleteDialog} onClose={() => setShowDeleteDialog(false)}>
        <ExcluirItemDialog
          isVisible={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleSubmit(handleDelete)}
        />
      </Modal>
    </KeyboardAwareScrollView>
    
  );
}

