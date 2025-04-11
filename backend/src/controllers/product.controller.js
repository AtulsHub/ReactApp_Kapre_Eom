import { Product } from "../modals/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllItems = async (req, res) => {
  // GET /api/users?page=1&limit=10
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const users = await Product.find()
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Product.countDocuments();

    res.json({
      users,
      total,
      page,
      limit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const query = category ? { category } : {};

    const products = await Product.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // optional: latest first

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const createProducts = async (req, res) => {
  try {
    const { title, description, oldPrice, newPrice, category } = req.body;

    const productLocalPath = req.file?.path || "";

    const productPic = await uploadOnCloudinary(productLocalPath);

    const newProduct = await Product.create({
      product_Id: Product._id,
      title,
      description,
      oldPrice,
      newPrice,
      productImage: productPic?.url || "",
      category,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export { getAllItems, getProductsByCategory, createProducts };
