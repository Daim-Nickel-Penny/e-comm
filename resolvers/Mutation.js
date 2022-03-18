const { v4: uuid } = require("uuid");

exports.Mutation = {
  addCategory: (parent, { input }, { db }) => {
    const { name } = input;

    const newCategory = {
      id: uuid(),
      name,
    };

    db.categories.push(newCategory);

    return newCategory;
  },

  addProduct: (parent, { input }, { db }) => {
    const { name, image, price, onSale, quantity, categoryId, description } =
      input;

    const newProduct = {
      id: uuid(),
      name,
      image,
      price,
      description,
      onSale,
      quantity,
      categoryId,
    };

    db.products.push(newProduct);

    return newProduct;
  },

  addReview: (parent, { input }, { db }) => {
    const { date, title, comment, rating, productId } = input;

    const newReview = {
      id: uuid(),
      date,
      title,
      comment,
      rating,
      productId,
    };

    db.reviews.push(newReview);

    return newReview;
  },

  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter((category) => category.id !== id);
    db.products = db.products.map((product) => {
      if (product.categoryId === id)
        return {
          ...product,
          categoryId: null,
        };
      else return product;
    });
    return true;
  },

  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter((product) => product.id !== id);
    db.reviews = db.reviews.filter((review) => review.productId !== id);
    return true;
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter((review) => review.id !== id);
    return true;
  },
};
