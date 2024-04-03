import React from "react";
import { NativeBaseProvider } from "native-base";
import { Routes } from "./src/View/router";


export default function App() {
  return (
    <NativeBaseProvider>
      <Routes/>
    </NativeBaseProvider>
    
  );
}

