"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const Widget_1 = require("./Widget");
class Shop {
    constructor(products = []) {
        this.products = {};
        products.forEach(product => this.addProduct(product));
    }
    addProduct(shopItem) {
        const { item, quantity } = shopItem;
        if (!this.products[item.name]) {
            this.products[item.name] = shopItem;
        }
        else {
            console.log(`this item already exists inside the store`);
        }
    }
    removeProduct(name) {
        if (!this.products[name]) {
            delete this.products[name];
        }
    }
    removeProductQuantity(quantity, item) {
        if (shop.products[item.name]) {
            const shopItem = shop.products[item.name];
            if ((shopItem === null || shopItem === void 0 ? void 0 : shopItem.quantity) > quantity) {
                shopItem.quantity -= quantity;
            }
            else {
                console.log('Not enough items in store');
            }
        }
    }
    productList() {
        for (const name in this.products) {
            const { item, quantity } = this.products[name];
            console.log(`${item.name} ${item.price} ${quantity}`);
        }
    }
}
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
const storeItem1 = { item: item1, quantity: 110 };
const item2 = createItem('bacon', 5.99, 'a type of salt-cured pork made from various cuts');
const storeItem2 = { item: item2, quantity: 110 };
const item3 = createItem('milk', 2.49, 'A whitish liquid containing proteins, fats, lactose.');
const storeItem3 = { item: item3, quantity: 110 };
const products = [storeItem1, storeItem2, storeItem3];
const shop = new Shop(products);
function addToCart(user, item, quantity) {
    const cartItem = { item, quantity };
    user.cart.push(cartItem);
    shop.removeProductQuantity(quantity, item);
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
shop.productList();
addToCart(user, item1, 109);
shop.productList();
const canvas = new Widget_1.Canvas(document.body);
const firstElement = new Widget_1.Component();
firstElement.shape = new Widget_1.RightLeaningContainer();
firstElement.locationLeft = 1;
firstElement.locationTop = 1;
firstElement.content = '<h2>Shop</h2>';
canvas;
