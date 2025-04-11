export class ProductService {
  url = "http://localhost:8000/api/v1/products";

  async getAllProducts(page, limit) {
    try {
      const response = await fetch(
        `${this.url}/get-all-products?page${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("all product:", data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getProductsByCategory(category, page, limit) {
    try {
      const response = await fetch(
        `${this.url}/get-product-by-category?category=${category}&page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Posted:", data);
      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

const productService = new ProductService();
export default productService;
