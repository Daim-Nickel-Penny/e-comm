exports.Product = {
  category: ({ categoryId }, args, { db }) => {
    return db.categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, args, { db }) => {
    return db.reviews.filter((review) => review.productId === parent.id);
  },
};
