const openShopping = document.querySelector(".shopping");
const closeshopping = document.querySelector(".closeShopping");
const list = document.querySelector(".list");
const listCard = document.querySelector(".listCard");
const total = document.querySelector(".total");
const body = document.querySelector("body");
const quantity = document.querySelector(".quantity");

openShopping.addEventListener("click", () => {
    body.classList.add("active");
})
closeshopping.addEventListener("click", () => {
    body.classList.remove("active");
})

let products = [
    {
        id: 1,
        name: "Biryani",
        images: "1.png",
        price: 299
    },
    {
        id: 2,
        name: "Burger",
        images: "2.png",
        price: 99
    },
    {
        id: 3,
        name: "Pizza",
        images: "3.png",
        price: 399
    },
    {
        id: 4,
        name: "Ice Tea",
        images: "4.png",
        price: 149
    },
    {
        id: 5,
        name: "Cold Coffee",
        images: "5.png",
        price: 189
    },
    {
        id: 6,
        name: "Shawarma",
        images: "6.png",
        price: 89
    },
]

let listCards = [];

const initApp = () => {
    products.forEach((value, key) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("item");
        newDiv.innerHTML = `
        <img src="resources/${value.images}">
        <div class="title">${value.name}</div>
        <div class="price">₹ ${value.price.toLocaleString()}</div>
        <button onclick="addToCard(${key})">Add To Cart</button>`;

        list.appendChild(newDiv)
    })
}
initApp()

const addToCard = (key) => {
    if (listCards[key] == null) {
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1
    }
    reloadCard();
}
const reloadCard = () => {
    listCard.innerHTML = "";
    let count = 0;
    let totalprice = 0;

    listCards.forEach((value, key) => {
        totalprice = totalprice + value.price;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement("li");
            newDiv.innerHTML = `
            <div><img src="resources/${value.images}"></div>
            <div class = "cardTitle">${value.name}</div>
                <div class = "cardPrice">${value.price.toLocaleString()}</div>

                <div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class = "count">${value.quantity}</div>
                    <button style = "background-color:#560bad;" class = "cardButton" onclick = "changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>
            `
            listCard.appendChild(newDiv);
        }
        total.innerText = totalprice.toLocaleString();
        quantity.innerText = count;
    })
}
const changeQuantity = (key, quantity) => {
    if (quantity == 0) {
        delete listCards[key]
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price
    }
    reloadCard()
}