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

class Shop {
    private products: { [name: string]: CartQuantity  };

    constructor(products:CartQuantity[] = []){
        this.products = {};
        products.forEach(product=> this.addProduct(product));
    }

    addProduct(shopItem:CartQuantity):void {
        const {item, quantity} = shopItem;
        if (!this.products[item.name]){
            this.products[item.name] = shopItem
        }
        else {
            console.log(`this item already exists inside the store`)
        }
    }

    removeProduct(name:string):void {
        if(!this.products[name]){
            delete this.products[name]
        }
    }

    removeProductQuantity(quantity:number, item:Item){
        if (shop.products[item.name]){
            const shopItem = shop.products[item.name];
            if (shopItem?.quantity > quantity){
                shopItem.quantity -= quantity
            }
            else {
                console.log('Not enough items in store')
            }
        }
    }

    productList():void{
        for (const name in this.products){
            const {item, quantity} = this.products[name]
            console.log(`${item.name} ${item.price} ${quantity}`)
        }
    }

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
const storeItem1: CartQuantity = {item: item1, quantity:110};

const item2: Item = createItem('bacon', 5.99, 'a type of salt-cured pork made from various cuts');
const storeItem2: CartQuantity = {item: item2, quantity:110};

const item3: Item = createItem('milk', 2.49, 'A whitish liquid containing proteins, fats, lactose.');
const storeItem3: CartQuantity = {item: item3, quantity:110};

const products = [storeItem1, storeItem2, storeItem3];

const shop = new Shop(products);


function addToCart(user:User, item:Item, quantity:number){
    const cartItem : CartQuantity = {item, quantity};
    user.cart.push(cartItem);
    shop.removeProductQuantity(quantity, item)
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


shop.productList();
addToCart(user, item1, 109);
shop.productList();
