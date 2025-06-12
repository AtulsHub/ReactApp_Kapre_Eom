import { Product } from "../modals/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Add a new product with multiple images
const createProduct = async (req, res) => {
  try {
    const { title, description, oldPrice, newPrice, category, brand, size, color, stock } = req.body;
    let productImages = [];
    if (req.files && req.files.length > 0) {
      // Upload all images to Cloudinary and collect URLs
      for (const file of req.files) {
        const uploaded = await uploadOnCloudinary(file.path);
        if (uploaded?.url) productImages.push(uploaded.url);
      }
    }
    const newProduct = await Product.create({
      title,
      description,
      oldPrice,
      newPrice,
      category,
      brand,
      size,
      color,
      stock,
      productImages, // Array of image URLs
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
};

// Remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleted = await Product.findByIdAndDelete(productId);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error removing product", error: error.message });
  }
};

// Get products by category with pagination
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const products = await Product.find({ category })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments({ category });
    res.status(200).json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching products by category", error: error.message });
  }
};

// Filter products by various fields (title, brand, price range, etc.) with pagination
const filterProducts = async (req, res) => {
  try {
    const { title, brand, minPrice, maxPrice, category } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    let filter = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (brand) filter.brand = { $regex: brand, $options: "i" };
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.newPrice = {};
      if (minPrice) filter.newPrice.$gte = Number(minPrice);
      if (maxPrice) filter.newPrice.$lte = Number(maxPrice);
    }
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments(filter);
    res.status(200).json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error filtering products", error: error.message });
  }
};

// Get products with pagination
const getProductsPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Product.countDocuments();
    res.status(200).json({
      products,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching paginated products", error: error.message });
  }
};

export { createProduct, removeProduct, getProductsByCategory, filterProducts, getProductsPaginated };
