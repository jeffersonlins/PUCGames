import React from "react";
import { TextInputProps } from "react-native";

import { Container } from "./styles";

export function InputSearch({ ...rest }: TextInputProps) {
    return <Container {...rest}></Container>;
}