exports.Query = {
  hello: (parent, args, context) => "World",
  products: (parent, { filter }, { db }) => {
    let filteredProducts = db.products;

    return filteredProducts;
  },
  product: (parent, { id }, { db }) => {
    return db.products.find((product) => product.id === id);
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, { id }, { db }) => {
    return db.categories.find((category) => category.id === id);
  },
};
