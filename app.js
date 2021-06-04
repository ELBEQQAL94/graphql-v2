const { v4: uuid } = require('uuid');
const { ApolloServer, gql } = require("apollo-server");

const books = [
  {
    id: uuid(),
    title: "Nodejs",
    author: "J.Dane",
  },
  {
    id: uuid(),
    title: "JavaScript async/await",
    author: "Jack.M",
  },
];

const typeDefs = gql`
  type Book {
    id: String,
    title: String,
    author: String
  }

  type Query {
    books: [Book],
    getBook(id: String): Book
  }

  type Mutation {
      createBook(title: String, author: String): [Book],
      updateBook(id: String, title: String, author: String): Book,
      deletedBook(id: String): Book
  }
`;

const resolvers = {
  Query: {
    books: () => books,
    getBook: (_, { id }) => books.filter((book) => book.id === id)[0]
  },

  Mutation: {
    createBook: (_, book) => {
        books.push(book);
        return books
    },
    updateBook: (_, book) => {
        const isBook = (book) => book.id === book.id;
        const index = books.findIndex(isBook);
        let updatedBook = books[index];
        updatedBook = book;
        return updatedBook;
    },
    deletedBook: (_, { id }) => books.filter((book) => book.id === id)[0]
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => console.log(`Server ready at ${url}`));
