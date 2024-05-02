import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <div className="container">
      <Header />
    </div>
  );
}

function Header() {
  const [pokemonData, setPokemonData] = useState([]);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=50&offset=50";

  // first API CALL

  useEffect(() => {
    const fetchPokemons = async function () {
      try {
        const pokemonAPI = await fetch(API);
        const pokemonData1 = await pokemonAPI.json();
        return await pokemonData1.results;
      } catch (err) {
        console.error(err, `klarte ikke hente FØRSTE API`);
      }
    };

    // second API CALL
    fetchPokemons().then((results) => {
      Promise.all(
        // promise all .then
        results.map(async (pokemon) => {
          try {
            const pokemonData2 = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
            );
            const res = await pokemonData2.json();

            return res;

            //console.log(res);
          } catch (err) {
            console.error(err, `klarte ikke hente ANDRE 2 API`);
          }
        })
      ).then((pokemonDetails) => {
        // console.log(pokemonDetails);
        // types.push([pokemonDetails.types[0].type.name]);

        setPokemonData(pokemonDetails);
      });
    });
  }, []);

  // all types
  const allTypes = [...pokemonData].map((type) => type.types[0].type.name);

  const uniqueTypes = [...new Set(allTypes)];

  return (
    <>
      <div>
        <h1 className="header-h1"> Welcome to the pokemon wiki </h1>
        <form className="search">
          {/* Type  */}
          <div>
            <select className="type">
              <option>All</option>
              {uniqueTypes.map((type, i) => {
                return <option key={i}>{[type]}</option>;
              })}
            </select>
            <button onClick={getType} className="btn-type">
              {" "}
              Get Type{" "}
            </button>
          </div>

          {/* EXP  */}
          <button onClick={sortExp} className="btn-sort">
            {" "}
            Sort EXP{" "}
          </button>
          <button onClick={sortName} className="btn-name">
            {" "}
            Sort Name{" "}
          </button>
        </form>
      </div>
      <div className="pokemon-card-container">
        {pokemonData.map((poki, i) => {
          return (
            <PokemonCard
              pokemonImg={poki.sprites.front_default}
              name={`${poki.name}`.toUpperCase()}
              base_experience={poki.base_experience}
              type={poki.types[0].type.name}
              id={poki.id}
              key={i}
            />
          );
        })}
      </div>
    </>
  );

  // get Type Btn
  function getType(e) {
    e.preventDefault();

    const selectedType = document.querySelector(".type").value;

    const allPokemonsCards = document.querySelectorAll(".pokemon-Card");

    allPokemonsCards.forEach((pokemon, i) => {
      const parentContainer = pokemon;
      const h3Type = pokemon.childNodes[2].innerText;

      if (selectedType !== h3Type) {
        parentContainer.style.display = "none";
      }

      if (selectedType === "All") {
        parentContainer.style.display = "flex";
      }
    });
  }

  // sort EXP Btn
  function sortExp(e) {
    e.preventDefault();
    console.log("exp btn clicked");
    document.querySelector(".btn-sort").classList.toggle("sort");

    const allPokemonsCards = document.querySelectorAll(".pokemon-Card");
    console.log(allPokemonsCards);

    const pokemonObj = [];

    allPokemonsCards.forEach((p, i) => {
      const allExp = p.childNodes[0].childNodes[2].innerText;
      const card = {
        id: i,
        parentClass: p,
        exp: Number(allExp),
      };

      pokemonObj.push(card);
    });

    // sorted
    const sortObj = pokemonObj.sort((a, b) => a.exp - b.exp).reverse();

    // render new sorted pokemons
    const containerBox = document.querySelector(".container").childNodes[1];

    // insert sorted pokemons

    sortObj.map((card) => containerBox.appendChild(card.parentClass));
  }

  function sortName(e) {
    e.preventDefault();

    const allPokemonsCards = document.querySelectorAll(".pokemon-Card");

    const pokemonObj = [];

    allPokemonsCards.forEach((p, i) => {
      const allNames = p.childNodes[0].childNodes[0].innerText;
      console.log(allNames);

      const card = {
        pokemonName: allNames,
        parentClass: p,
      };

      pokemonObj.push(card);
    });

    console.log(pokemonObj);

    // sort names in object
    const sortedNames = pokemonObj.sort(function (a, b) {
      if (a.pokemonName < b.pokemonName) {
        return -1;
      }
      if (a.pokemonName > b.pokemonName) {
        return 1;
      }
      return 0;
    });

    // render new sorted pokemons
    const containerBox = document.querySelector(".container").childNodes[1];

    // insert sorte name
    sortedNames.map((card) => containerBox.appendChild(card.parentClass));
  }

  // generate new pokemons
  function getnewPokemons() {
    // next lecture
  }
}

function PokemonCard({ pokemonImg, name, base_experience, type, id }) {
  return (
    <div className={`pokemon-Card id${id}`}>
      <div>
        <h2>{name}</h2>
        <span>EXP:</span>
        <h3>{base_experience}</h3>
      </div>
      <img src={pokemonImg} alt={`pokiImg`}></img>
      <h3>{type}</h3>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
