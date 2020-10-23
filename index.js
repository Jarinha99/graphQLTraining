const { gql, ApolloServer } = require('apollo-server')

const typeDefs = gql`
    type Produto {
        nome: String!
        preco: Float!
        desconto: Float
        precoComDesconto: Float!
    }

    type Usuario {
        id: ID
        nome: String!
        email: String!
        salario: Float
        vip: Boolean
    }


    type Query {
        ola: String
        horaAtual: String
        usuarioLogado: Usuario
        produtoEmDestaque: Produto
        numerosMegaSena: [Int]
    }
`

const resolvers = {
    Usuario: {
        salario(usuario){
            return usuario.salario_real
        }
    },

    Produto: {
        precoComDesconto(produto){
            if(produto.desconto){
                return produto.preco - ((produto.desconto / 100) * produto.preco)
            }

            return produto.preco
        }
    },

    Query: {
        ola(){
            return 'Batata';
        },

        horaAtual(){
            return `${new Date}`;
        },

        numerosMegaSena(){
            return Array(6).fill(0).map(() => parseInt(Math.random() * 60 + 1)).sort((a, b) => a - b)
        },

        usuarioLogado(){
            return {
                id: 1,
                nome: 'Banana',
                email: 'Banana@gmail.com',
                salario_real: 1250.05,
                vip: true,
            }
        },

        produtoEmDestaque(){
            return {
                nome: 'Advil',
                preco: 50.50,
                desconto: 0,
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Tá rodando aqui ${url}`)
})