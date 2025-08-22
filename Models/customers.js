const mongoose = require('mongoose');
const { Schema } = mongoose;

main().then(() =>console.log("connection successsful")).catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');
}


const orderSchema = new Schema({
    item: String,
    price: Number,
})


const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
})

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);


const findCustomers = async() => {
    let result = await Customer.find({}).populate("orders");
    console.log(result[0]);
};

findCustomers();

const addCust = async () =>{
    let newCust = new Customer({
        name: "Karan Arjun"
    })
}

// const addCustomer = async() =>{
//     let cus1 = new Customer({
//         name: "Rahul Kumar"
//     });

//     let order1 = await Order.findOne({item: "Chips"})
//     let order2 = await Order.findOne({item: "Chocolate"})

//     cus1.orders.push(order1);
//     cus1.orders.push(order2);

//     let result = await cus1.save();
//     console.log(result);
// }

// addCustomer();

// const addOrders = async() =>{
//     let result = await Order.insertMany([
//         {item: "Samosa", price: 12},
//         {item: "Chips", price: 10},
//         {item: "Chocolate", price: 40}
//     ]);
//     console.log(result);
// }

// addOrders();