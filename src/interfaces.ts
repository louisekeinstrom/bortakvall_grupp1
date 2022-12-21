export { };
//Interface för product-info

export interface IProducts {
    "status": "success",
    "data": [
        {
            "id": number,
            "name": string,
            "description": string,
            "price": number,
            "on_sale": boolean,
            "images": {
                "thumbnail": string,
                "large": string
            },
            "stock_status": string,
            "stock_quantity": null


        }
    ]
}


/*
export interface IProducts {

    "id": number,
    "name": string,
    "description": string,
    "price": number,
    "on_sale": boolean,
    "images": {
        "thumbnail": string,
        "large": string
    },
    "stock_status": string,
    "stock_quantity": null




} */

/*
export interface IProducts {
    status: "success",
    data: [
        {
            id: number,
            name: string,
            description: string,
            price: number,
            on_sale: boolean,
            images: {
                thumbnail: string,
                large: string
            },
            stock_status: string,
            stock_quantity: null


        }
    ]
}
*/
/*
export interface IProducts {


    id: number,
    name: string,
    description: string,
    price: number,
    on_sale: boolean,
    images: {
        thumbnail: string,
        large: string
    },
    stock_status: string,
    stock_quantity: null

} */

