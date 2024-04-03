import AsyncStorage from '@react-native-async-storage/async-storage';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';
import UsuarioModel from '../Model/UsuarioModel';

export default class UsuarioController {

    static async getUsuarioFindById(id: string){
        try{
            const responseData = await AsyncStorage.getItem('@fromHook:cadastro');
            const dbData: UsuarioModel[] = responseData ? JSON.parse(responseData): [];

            return (
                dbData?.find((item)=> item.id === id)
            );
        }catch (err) {
            console.log(err);
        }
    }

    static async registerUsuario(data: UsuarioModel){ 
        try{
            const responseData = await AsyncStorage.getItem('@fromHook:cadastro');
            const dbData = responseData ? JSON.parse(responseData): [];
            const previewData = [...dbData, data];
            await AsyncStorage.setItem ('@fromHook:cadastro' ,JSON.stringify(previewData));
            return (true);
        }catch (err) {
            console.log(err);
        }
    }

    static async alterUsuario(data: UsuarioModel){ 
        try{
            const responseData = await AsyncStorage.getItem('@fromHook:cadastro');
            const dbData: UsuarioModel[] = responseData ? JSON.parse(responseData): [];

            const indexToAlter = dbData.findIndex(item => item.id === data.id);

            if (indexToAlter !== -1){
                dbData.splice(indexToAlter, 1);
                const previewData = [...dbData, data];
                await AsyncStorage.setItem ('@fromHook:cadastro' ,JSON.stringify(previewData));
                return (true);
            }
            else {
                return (false);
            }
        }catch (err) {
            console.log(err);
        }
    }

    static async deleteUsuario(id: string){ 
        try{
            const responseData = await AsyncStorage.getItem('@fromHook:cadastro');
            const dbData: UsuarioModel[] = responseData ? JSON.parse(responseData): [];

            const indexToRemove = dbData.findIndex(item => item.id === id);

            if (indexToRemove !== -1){
                dbData.splice(indexToRemove, 1);
                await AsyncStorage.setItem ('@fromHook:cadastro' ,JSON.stringify(dbData));
                return (true);
            }
            else {
                return (false);
            }
        }catch (err) {
            console.log(err);
        }
    }
}