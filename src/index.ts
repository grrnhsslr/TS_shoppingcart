import { v4 as uuidv4 } from 'uuid'

class User{
    public get age(): string{
        return this._age;
    }
    public set age(value: string){
        this._age = value;
    }
    public get name(): string{
        return this._name;
    }
    public set name(value: string){
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
    public get cart():Item[] {
        return this._cart;
    }
    public set cart(value: Item[]){
        this._cart = value;
    }


    private readonly _id: string;
    private _cart: Item[];


    constructor (
        private _name: string,
        private _age: string
    ){
        this._id = uuidv4();
        this._cart = [];
    }

    public addToCart(item:Item):void{
        this._cart.push(item);
        this.createCart();
    }

    public removeQuantity(item:Item):void{
        let removed:boolean = false;
        let i:number = 0;
        while (i < this.cart.length && !removed) {
            if (this.cart[i].id == item.id){
                this.cart.splice(i, 1);
                removed = true;
            }
            else {
                i++;
            }
        }
    }

    public removeFromCart(item:Item):void{
        let i: number = 0;
        while (i < this.cart.length) {
            if (this.cart[i].id == item.id){
                this.cart.splice(i, 1);
            }
            else {
                i++;
            }
        }
    }

    public cartTotal():number {
        let total:number = 0;
        for (let i of this.cart){
            total += i.price;
        }
        return (total * 100) / 100;
    }

    public itemQuantity(item:Item):number {
        let count = 0;
        this.cart.forEach((i) => (i === item && count++));
        return count;
    }

    public createCart(){

        this._cart = this._cart.sort((a:Item, b:Item) => {
            return a.description.length - b.description.length
        })
        let cartSet = new Set(this.cart);
        let cartDiv = <HTMLDivElement>document.getElementById('cart')
        cartDiv.innerHTML = '<h1>Your Cart:</h1>';
        if (this.cart.length === 0){
            cartDiv.innerHTML = 'Your cart is empty';
        }
        else{
            for (let i of cartSet){
                let quantity = this.itemQuantity(i);
                let cartCard = this.cardForCart(i, quantity);
                cartDiv?.append(cartCard)
            }
        }
        let total:HTMLElement = document.createElement('h2');
        total.innerHTML = `Total: ${this.cartTotal()}`
        cartDiv?.append(total);
    }
    private cardForCart(item:Item, quantity:number):HTMLDivElement {
        let mainDiv: HTMLDivElement = document.createElement('div');
        let title: HTMLElement = document.createElement('h3');
        let subhead: HTMLElement = document.createElement('p');
        let removeQuantity: HTMLButtonElement = document.createElement('button');
        let remove: HTMLButtonElement = document.createElement('button');
        title.innerHTML = item.name
        subhead.innerHTML = `${quantity} ${item.name} in your cart. Your total is ${this.cartTotal}`;
        removeQuantity.innerHTML = '-1';
        remove.innerHTML = 'delete';
        removeQuantity.addEventListener('click', () => {
            this.removeQuantity(item);
            this.createCart();
        });
        remove.addEventListener('click', () => {
            this.removeFromCart(item);
            this.createCart();
        });
        mainDiv.append(title, subhead, remove, removeQuantity)
        return mainDiv
    }

    static userLogin(): User|undefined {
        let name:string = (<HTMLInputElement>document.getElementById('name')).value;
        console.log(name);
        let age:string = (<HTMLInputElement>document.getElementById('age')).value;
        console.log(age);
        if (name && age) {
            return new User(name, age)
        }
        else {
            return undefined
        }
    }
}

class Item {
    public get description(): string {
        return this._description;
    }
    public set description(value: string){
        this._description = value;
    }
    public get price():number {
        return this._price;
    }
    public set price(value: number){
        this._price = value;
    }
    public get name(): string{
        return this._name;
    }
    public set name(value: string){
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
    private readonly _id: string;
    constructor (
        private _name:string,
        private _price:number,
        private _description:string
    ){
        this._id = uuidv4();
    }
}

class Shop {
    public static get myUser():User {
        return Shop._myUser;
    }
    public set myUser(value: User){
        Shop._myUser = value;
    }
    private static _myUser:User;
    private _items = new Set<Item>();
    public get items(){
        return this._items;
    }
    public set items(value){
        this._items = value;
    }
    constructor(user:User){
        Shop._myUser = user;
    }
    public shopItems(item: Item):void{
        this.items.add(item)
    }
    public forSale(): void {
        let shopDiv= <HTMLDivElement>document.getElementById('shop');
        shopDiv.innerHTML = '';
        for (let i of this.items) {
            let shopItem = Shop.shopCard(i)
            shopDiv?.append(shopItem)
        }
    }

    private static shopCard(item:Item):HTMLDivElement {
        let mainDiv:HTMLDivElement = document.createElement('div');
        mainDiv.classList.add('shop-items');
        let title: HTMLElement = document.createElement('h1');
        title.classList.add('shop-item-title');
        let description:HTMLElement = document.createElement('p');
        title.classList.add('shop-item-description')
        let add: HTMLButtonElement = document.createElement('button');
        title.classList.add('shop-item-button');
        title.innerHTML = `${item.name} $${item.price}`;
        description.innerHTML = `${item.description}`;
        add.innerHTML = 'add to cart';
        add.addEventListener('click', () =>{
            Shop.myUser?.addToCart(item);
        })
        mainDiv.append(title, description, add)
        return mainDiv
    }

    static displayItems(items:Item[]){
        const container = document.getElementById('shop') as HTMLDivElement;
        items.forEach(item => {
            const card = this.shopCard(item);
            container.appendChild(card);
        })
    }
}

let loginButton:HTMLButtonElement = <HTMLButtonElement> document.getElementById('submit')

let loginDiv = <HTMLDivElement>document.getElementById('login');
let shopDiv = <HTMLDivElement>document.getElementById('shop');
let cartDiv = <HTMLDivElement>document.getElementById('cart');
let mainDiv = [loginDiv, shopDiv, cartDiv];





let item1 = new Item('eggs', 1.99, 'produced by a bird, considered as food');
let item2 = new Item('bacon', 5.99, 'a type of salt-cured pork made from various cuts');
let item3 = new Item('milk', 2.49, 'A whitish liquid containing proteins, fats, lactose.');

let itemsInShop = [item1, item2, item3]


shopDiv.style.display = 'none';
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    let user = User.userLogin();
    console.log(user);

    if (!user) {
        (<HTMLInputElement>document.getElementById('name')).value = '';
        (<HTMLInputElement>document.getElementById('age')).value = '';
        (<HTMLInputElement>document.getElementById('name')).placeholder = 'please enter a valid name';
        (<HTMLInputElement>document.getElementById('age')).placeholder = 'please enter a valid age';
    }
    else {
        let shop = new Shop(user);
        for (let i of itemsInShop){
            shop.shopItems(i)
        }
        Shop.displayItems(itemsInShop);
        shop.myUser?.createCart();
        loginDiv.style.display = 'none';
        shopDiv.style.display = 'block';
    }

})

