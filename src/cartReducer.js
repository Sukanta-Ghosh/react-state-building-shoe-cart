//Each reducer accepts state and action argument
//Whatever we return from useReducer becomes the new state
export default function cartReducer(cart, action) {
    switch (action.type) {
        case "empty":
            return []
        case "add": { /* Wrap a case in curly braces to give it a seperate scope so that 
            This will remove error as sku variable is used in two different cases */
            const {id, sku} = action;
            //Predicate: Fancy word for a function which returns either true or false.
            const itemInCart =  cart.find((i) => i.sku === sku)  //If the sku is already in the cart, we need to increment the quantity by 1
            //itemInCart.quantity++;  //Don't do this
            if(itemInCart) {
            //Return new array with the matching item replaced
            return cart.map((i) => i.sku === sku ? {...i, quantity: i.quantity + 1} : i)
            } else {
            //Return new array with the new item appended
            return [...cart, {id, sku, quantity: 1}]
            }
        }
        case "updateQuantity":
            const {sku, quantity} = action;
            return quantity === 0 ? 
            cart.filter((i) => i.sku !== sku) : 
            cart.map((i) => i.sku === sku ? {...i, quantity} : i)
        default:
            throw new Error("Unhandled action " + action.type)
    }
}