const { ApolloServer, gql } = require("apollo-server");
const { productsData, categories, categoriesData } = require("./initial_data");

const typeDefs = gql`
  type Query {
    hello: String
    products: [Product!]!
    getProduct(id: ID!): Product
    categories: [Category!]!
    getCategory(id: ID!): Category!
  }

  type Product {
    name: String!
    image: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
  }

  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;
const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    products: () => {
      return productsData;
    },
    getProduct: (parent, args) => {
      const product = productsData.find((product) => product.id === args.id);

      if (!product) return null;

      return product;
    },
    categories: () => {
      return categories;
    },
    getCategory: (parent, args, context) => {
      const category = categoriesData.find(
        (category) => category.id === args.id
      );
      if (!category) return null;
      return category;
    },
  },
  Category: {
    products: (parent, args, context) => {
      const products = productsData.filter(
        (product) => product.categoryId === parent.id
      );
      if (!products) return null;
      return products;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
