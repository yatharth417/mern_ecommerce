import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    // load from local storage at start
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // load shipping address from storage
    const [shippingAddress, setShippingAddress] = useState(() => {
        const savedAddress = localStorage.getItem('shippingAddress');
        return savedAddress ? JSON.parse(savedAddress) : [];
    });

    // save to local storage when cart is changed
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    // save address to storage
    useEffect(() => {
        localStorage.setItem('shippingAddress', JSON.stringify(shippingAddress));
    }, [shippingAddress]);


    // Add items 
    const addToCart = (product, qty = 1) => {
        setCartItems((prevItems) =>{
            // check if already in cart
            const existItem = prevItems.find((x) => x._id === product._id);

            if (existItem){
                return prevItems.map((x) => 
                    x._id === existItem._id ? { ...x, qty: x.qty + qty } : x
                );
            }else{
                return [...prevItems, { ...product, qty}];
            }
        });
    };

    // remove item function
    const removeFromCart = (id) => {
        setCartItems((prevItems) => prevItems.filter((x) => x._id !==id));
    };

    // save shipping address function
    const saveShippingAddress = (data) => {
        setShippingAddress(data);
    }

    // clear cart items
    const clearCart = () => {
        setCartItems([]);
    };

    return(
        <CartContext.Provider 
        value={{ 
            cartItems,
            addToCart,
            removeFromCart,
            shippingAddress,
            saveShippingAddress,
            clearCart,
             }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);