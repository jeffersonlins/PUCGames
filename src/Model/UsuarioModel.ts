export default class UsuarioModel {
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

    constructor(
        id: string,
        primeiroNome: string,
        ultimoNome: string,
        email: string,
        cep: string,
        endereco: string,
        numero: string,
        bairro: string,
        cidade: string,
        uf: string
    ){
        this.id = id;
        this.primeiroNome = primeiroNome;
        this.ultimoNome = ultimoNome;
        this.email = email;
        this.cep = cep;
        this.endereco = endereco;
        this.numero = numero;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }
}