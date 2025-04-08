import {Cart} from "../modals/cart.model.js";



const addToCart = async (req, res) => {
    try {
        console.log(req.body);
      const { userId, productId } = req.body;
        
      
      if (!userId || !productId) {
        return res.status(400).json({ message: "userId and productId are required" });
      }
  
      let cart = await Cart.findOne({ owner: userId });
  
      if (!cart) {
        cart = new Cart({ owner: userId, items: [mongoose.Types.ObjectId(productId)] });
      } else {
        if (!cart.items.some((item) => item.toString() === productId.toString())) {
          cart.items.push(mongoose.Types.ObjectId(productId));
        }
      }
  
      await cart.save();
      res.status(200).json({ message: "Item added to cart", cart });
    } catch (err) {
      res.status(500).json({ message: "Error adding to cart", error: err.message });
    }
  };

  const removeFromCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      const cart = await Cart.findOne({ owner: userId });
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      cart.items = cart.items.filter(
        (item) => item.toString() !== productId.toString()
      );
  
      await cart.save();
      res.status(200).json({ message: "Item removed", cart });
    } catch (err) {
      res.status(500).json({ message: "Error removing item", error: err });
    }
  };

  
  const getCartItems = async (req, res) => {
    try {
      const userId = req.query.userId;
  
      const cart = await Cart.findOne({ owner: userId }).populate("items");
  
      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
  
      res.status(200).json(cart.items);
    } catch (err) {
      res.status(500).json({ message: "Error fetching cart", error: err });
    }
  };
  
  
  export {
    addToCart,
    removeFromCart,
    getCartItems
  }