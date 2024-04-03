import React from "react"
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Home } from "../home";
import { Usuario } from "../usuario";

export type RootTabParamList = {
    Home: undefined;
    Usuario: {id: string};
}

const Tab = createBottomTabNavigator<RootTabParamList>();

const MyTheme = {
    ...DefaultTheme,
     colors: {
        ...DefaultTheme.colors,
         primary: 'black',
         background: 'white'
     },
}


export const Routes = ()=>{
    return(
        <NavigationContainer theme={MyTheme}>
            <Tab.Navigator>
                <Tab.Screen 
                name="Home" 
                component={Home} 
                options={
                    {
                        tabBarIcon: ({color}) =>(
                            <MaterialCommunityIcons name= "gamepad-square" color={color} size={26}/>
                        ),
                       title: 'PUC Games'
                    }
                }/>
                <Tab.Screen 
                listeners={({ navigation }) => ({
                    focus: () => {
                      navigation.setParams({ id: undefined });
                    },
                  })}
                name="Usuario" 
                component={Usuario} 
                options={
                    {
                        tabBarIcon: ({color}) =>(
                            <MaterialCommunityIcons name= "account-plus" color={color} size={26}/>
                        ),
                       title: 'Cadastro de Competidor' 
                    }
                }/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}