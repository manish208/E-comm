import { EmailValidator } from "@angular/forms"

export interface SignUp{
    name:string,
    email:string,
    password:string
}

export interface Login{
    email:string,
    password:string
}

export interface Product{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    productId:undefined|number
}

export interface Cart{
    name:string,
    price:number,
    color:string,
    category:string,
    description:string,
    image:string,
    id: undefined | number,
    quantity:undefined | number,
    userId:number,
    productId:number
}

export interface priceSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}

export interface Order{
    name:string,
    email:string,
    phone:number,
    address:string,
    totalPrice:number,
    userId:number,
    id:number| undefined
}