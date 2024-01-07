export interface SignUp{
    name:string,
    email:string,
    password:string
    
}
export interface loge{
    email:string,
    password:string
}

export interface product{
    productId: number | undefined,
    name:string,
    price:string,
    color:string,
    Category:string,
    Description:string,
    image:string,
    id:number,
    quantity:undefined|number,
    
}

export interface cart{
    name:string ,
    price:string ,
    color:string ,
    Category:string ,
    Description:string ,
    image:string ,
    id:number|undefined
    quantity:number|undefined ,
    userId:number ,
    productId:number,
}

export interface pricesummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface order{
    email:string,
    address:string,
    contact:string,
    totalPrice:number,
    userId:number,
    id:number|undefined
}