export { };


//Interface för product-info
export interface IProducts {
    status: string, //"success"
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

//för POST kundinfo + orderinfo

interface IOrder {
    customer_first_name: string,
    customer_last_name: string,
    customer_address: string,
    customer_postcode: string,
    customer_city: string,
    customer_email: string,
    order_total: number,
    order_items: [
        {
            product_id: number,
            qty: number,
            item_price: number,
            item_total: number
        },
    ]
}

//response

interface IResponse {
    status: string,
    data: {
        id: number,
        order_date: string,
        customer_first_name: string,
        customer_last_name: string,
        customer_address: string,
        customer_postcode: string,
        customer_city: string,
        customer_email: string,
        customer_phone: null,
        order_total: number,
        created_at: string,
        updated_at: string,
        items: [
            {
                id: number,
                order_id: number,
                qty: number,
                item_price: number,
                item_total: number,
            }
        ]

    }
}


