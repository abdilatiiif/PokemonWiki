import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
{
name: "Focaccia",
ingredients: "Bread with italian olive oil and rosemary",
price: 6,
photoName: "pizzas/focaccia.jpg",
soldOut: false,
},
{
name: "Pizza Margherita",
ingredients: "Tomato and mozarella",
price: 10,
photoName: "pizzas/margherita.jpg",
soldOut: false,
},
{
name: "Pizza Spinaci",
ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
price: 12,
photoName: "pizzas/spinaci.jpg",
soldOut: false,
},
{
name: "Pizza Funghi",
ingredients: "Tomato, mozarella, mushrooms, and onion",
price: 12,
photoName: "pizzas/funghi.jpg",
soldOut: false,
},
{
name: "Pizza Salamino",
ingredients: "Tomato, mozarella, and pepperoni",
price: 15,
photoName: "pizzas/salamino.jpg",
soldOut: true,
},
{
name: "Pizza Prosciutto",
ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
price: 18,
photoName: "pizzas/prosciutto.jpg",
soldOut: false,
},
];

function App() {
return (

<div className="container">
<Header />
<Menu />
<Footer />
</div>
);
}

function Header() {
return (

<header className="header">
<h1>Fast React Pizza Co.</h1>
</header>
);
}

function Menu() {
// const pizzas = pizzaData;

return (
/_fragments _/

    <main className="menu">
      <h2>Our Menu </h2>

      <p>
        Authentic Italian cuisine. 6 creative dishes to choose from. All from
        our stone oven, all organic, all delicious.{" "}
      </p>

      <ul className="pizzas">
        {pizzaData.map((pizza) => (
          <Pizza pizzaObj={pizza} key={pizza.name} />
        ))}
      </ul>
    </main>

);
}

function Pizza({ pizzaObj }) {
console.log(pizzaObj);

// if (pizzaObj.soldOut) return null;

return (

<li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
<img src={pizzaObj.photoName} alt={pizzaObj.photoName} />
<div>
<h3 className="pizza">{pizzaObj.name}</h3>
<p>{pizzaObj.ingredients}</p>

<span> {pizzaObj.soldOut ? "SOLD OUT" : `$ ${pizzaObj.price}`}</span>

</div>
</li>

);
}

function Footer() {
// return React.createElement("footer", null, "We`er currently open");

const hour = new Date().getHours();
const openHour = 0;
const closeHour = 23;
const isOpen = hour >= openHour && hour <= closeHour;
console.log(isOpen);

//if (!isOpen) return <p> return 1: We`er closed, come back {openHour}:00</p>;

return (

<div className="order">
<footer className="footer">
{isOpen ? (
<Order closeHour={closeHour} openHour={openHour} />
) : (
<p> return 2: We`er closed, come back {openHour}:00</p>
)}
</footer>

      <button className="btn"> Order now!</button>
    </div>

);
}

function Order({ closeHour, openHour }) {
return (

<div className="order">
<p>
{" "}
We`er open from {openHour}:00 to {closeHour}:00
</p>
</div>
);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
<React.StrictMode>
<App />
</React.StrictMode>
);
