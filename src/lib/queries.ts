export const GET_PRODUCTS_QUERY = `
  query GetProducts($first: Int = 6, $category: String) {
    products(first: $first, where: { category: $category }) {
      nodes {
        id
        databaseId
        name
        slug
        shortDescription
        description
        image {
          sourceUrl
          altText
        }
        averageRating
        reviewCount
        onSale
        ... on SimpleProduct {
          price
          regularPrice
          salePrice
        }
        ... on VariableProduct {
          price
          regularPrice
          salePrice
        }
      }
    }
  }
`;
