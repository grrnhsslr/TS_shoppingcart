import { v4 as uuidv4 } from 'uuid';

interface Item{
    id: string,
    name: string,
    price: number,
    desc: string
}

interface User{
    id: string,
    name: string,
    age: number,
    cart: CartQuantity []
}

interface CartQuantity{
    quantity: number
    item: Item
}

function createUser(name:string, age: number){
    const id = uuidv4();
    const cart: any = []

    return {id, name, age, cart}
}

const user : User = createUser('Gurt Shorendorfer', 23);
const user1 : User = createUser('Zachariah Shmickleshniezer', 123);

function createItem(name: string, price: number, desc: string) {
    const id = uuidv4();
    return { id, name, price, desc };
}


const item1: Item = createItem('eggs', 1.99, 'produced by a bird, considered as food');
const item2: Item = createItem('bacon', 5.99, 'a type of salt-cured pork made from various cuts');
const item3: Item = createItem('milk', 2.49, 'A whitish liquid containing proteins, fats, lactose.');


function addToCart(user:User, item:Item, quantity:number){
    const cartItem : CartQuantity = {item, quantity};
    user.cart.push(cartItem);
}


function removeFromCart(item: Item, user: User): void {
    user.cart = user.cart.filter(cartItem => cartItem.item.id !== item.id);
}


function removeQuantityFromCart(item: Item, quantity: number, user: User): void {
    const cartItem = user.cart.find(cartItem => (cartItem.item.id === item.id && cartItem.item.name === item.name));
    if (cartItem){
        if (cartItem?.quantity > quantity){
            cartItem.quantity -= quantity
        }
        else {
            const index = user.cart.indexOf(cartItem);
            user.cart.splice(index, 1);
        }
    }
}


function cartTotal(user:User): number {
    return user.cart.reduce((total, cartItem) => {
        let itemTotal = cartItem.item.price * cartItem.quantity;
        return total + itemTotal;
    }, 0)
}


addToCart(user, item1, 10);
addToCart(user, item2, 10);
addToCart(user, item3, 10);

console.log(user.cart)
console.log(cartTotal(user));

removeFromCart(item1, user);
console.log(cartTotal(user));

removeQuantityFromCart(item3, 2, user);

console.log(user.cart)
console.log(cartTotal(user));
