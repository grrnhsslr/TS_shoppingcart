"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function createUser(name, age) {
    const id = (0, uuid_1.v4)();
    const cart = [];
    return { id, name, age, cart };
}
const user = createUser('Gurt Shorendorfer', 23);
const user1 = createUser('Zachariah Shmickleshniezer', 123);
function createItem(name, price, desc) {
    const id = (0, uuid_1.v4)();
    return { id, name, price, desc };
}
const item1 = createItem('eggs', 1.99, 'produced by a bird, considered as food');
const item2 = createItem('bacon', 5.99, 'a type of salt-cured pork made from various cuts');
const item3 = createItem('milk', 2.49, 'A whitish liquid containing proteins, fats, lactose.');
function addToCart(user, item, quantity) {
    const cartItem = { item, quantity };
    user.cart.push(cartItem);
}
function removeFromCart(item, user) {
    user.cart = user.cart.filter(cartItem => cartItem.item.id !== item.id);
}
function removeQuantityFromCart(item, quantity, user) {
    const cartItem = user.cart.find(cartItem => (cartItem.item.id === item.id && cartItem.item.name === item.name));
    if (cartItem) {
        if ((cartItem === null || cartItem === void 0 ? void 0 : cartItem.quantity) > quantity) {
            cartItem.quantity -= quantity;
        }
        else {
            const index = user.cart.indexOf(cartItem);
            user.cart.splice(index, 1);
        }
    }
}
function cartTotal(user) {
    return user.cart.reduce((total, cartItem) => {
        let itemTotal = cartItem.item.price * cartItem.quantity;
        return total + itemTotal;
    }, 0);
}
addToCart(user, item1, 10);
addToCart(user, item2, 10);
addToCart(user, item3, 10);
console.log(user.cart);
console.log(cartTotal(user));
removeFromCart(item1, user);
console.log(cartTotal(user));
removeQuantityFromCart(item3, 2, user);
console.log(user.cart);
console.log(cartTotal(user));
