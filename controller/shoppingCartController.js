const ShoppingCart =require('../models/ShoppingCart')

const addToCart = async (req,res)=> {
    try{
        const {userId, bookId,quantity} = req.body;
        let shoppingCart= await ShoppingCart.findOne({user:userId});

        if (!shoppingCart){
            shoppingCart = await ShoppingCart.create({
                user:userId,
                items:[{book:bookId,quantity:quantity}]
            });
        } else{
            // checking if the book is already in the cart 
            const existingItem= shoppingCart.items.find(item => item.book.toString() === bookId);
            if(existingItem){
                // if the book is already in the cart, update the quantity
                existingItem.quantity += quantity;
            }else{
                // if the book is not in the cart, add it as new item
                shoppingCart.items.push({book:bookId,quantity:quantity});

            }
        }
        await shoppingCart.save();

        res.status(200).json({ message: 'Item added to the cart successfully', shoppingCart });
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ error: 'An error occurred while adding to the cart' });
    }
};
    
const removeFromCart =async(req , res) => {
    try{
        const {userId , bookId}= req.body;
        const shoppingCart = await shoppingCart.findOne({user:userId});

        if(!shoppingCart){
            return res.status(404).json({error:'shopping cart not found'});
        }
        //Remove the items from the cart 
        shoppingCart.items= shoppingCart.items.fliter(item.book.toString() !==bookId);
        await shoppingCart.save();
        res.status(200).json({message:'Item removed from the cart sucessfully', shoppingCart});

    }catch(error){
        console.error('Error removing from cart:', error);
        res.status(500).json({ error: 'An error occurred while removing from the cart' });
    }
};

const  updateCartItemQuantity = async (req, res) => {
    try {
        const { userId, bookId, quantity } = req.body;

        const shoppingCart = await ShoppingCart.findOne({ user: userId });

        if (!shoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }

        // Updating  the quantity of the specified book in the cart
        const updatedItems = shoppingCart.items.map(item => {
            if (item.book.toString() === bookId) {
                item.quantity = quantity;
            }
            return item;
        });

        shoppingCart.items = updatedItems;
        await shoppingCart.save();

        res.status(200).json({ message: 'Cart item updated successfully', shoppingCart });
    } catch (error) {
        console.error('Error updating cart item:', error);
        res.status(500).json({ error: 'An error occurred while updating cart item' });
    }
};

const calculateTotalCost = async (req, res) => {
    try {
        const { userId } = req.params;
  
        const shoppingCart = await ShoppingCart.findOne({ user: userId }).populate('items.book', 'price');
  
        if (!shoppingCart) {
            return res.status(404).json({ error: 'Shopping cart not found' });
        }
  
        const totalCost = shoppingCart.items.reduce((total, item) => {
            return total + item.book.price * item.quantity;
        }, 0);
  
        res.status(200).json({ totalCost });
    } catch (error) {
        console.error('Error calculating total cost:', error);
        res.status(500).json({ error: 'An error occurred while calculating total cost' });
    }
  };

  module.exports = {
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    calculateTotalCost, 
     
  };