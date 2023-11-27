let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#exampleModalCenter");

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log(`"${pokemon}" is not a valid Pokémon!`);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let btn = document.createElement("button");
    btn.setAttribute("data-toggle", "modal");
    btn.setAttribute("data-target", "#exampleModalCenter");
    btn.classList.add("btn-primary");
    btn.innerText = pokemon.name;
    listItem.appendChild(btn);
    pokemonList.appendChild(listItem);

    btn.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        json.results.forEach((item) => {
          // JSON으로 변환된 정보를 처리하고, 각 포켓몬에 대한 정보를 추출하고 새로운 포켓몬 객체를 만듭니다. 그런 다음 add 함수를 사용하여 이러한 새로운 포켓몬을 목록에 추가합니다.
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            height: item.height,
          };
          add(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //loadDetails 함수는 loadList에서 만들어진 목록의 각 포켓몬에 대해 호출됩니다. 이렇게 하면 목록에 있는 포켓몬들이 더 많은 정보를 가지게 됩니다.
  function loadDetails(pokemon) {
    let url = pokemon.detailsUrl; //use the detailsUrl property to load the detailed data for a given Pokémon.
    return fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((details) => {
        // Now we add the details to the item
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //when a user clicks on a Pokémon
  function showDetails(pokemon) {
    loadDetails(pokemon)
      .then((details) => {
        showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
        return pokemon;
      })
      .catch((e) => {
        console.error(e);
      });
  }

  //Modal shows these information
  function showModal(pokemonName, pokemonHeight, pokemonImage) {
    let titleElement = document.querySelector(".modal-title");
    titleElement.innerText = pokemonName.toUpperCase();
    let height = document.querySelector(".pokemonHeight");
    height.innerText = "Height: " + pokemonHeight + " cm";

    let imageElement = document.querySelector(".PokemonImg");
    imageElement.src = pokemonImage;
    imageElement.setAttribute("width", "304");
    imageElement.setAttribute("height", "228");
    imageElement.setAttribute("alt", "Pokemon Image");
  }

  function hideModal() {
    modalContainer.classList.remove("isVisible");
  }

  // "Esc" 키를 눌렀을 때 모달(팝업 창)이 열려 있다면 모달을 닫는 역할
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("isVisible")) {
      hideModal();
    }
  });

  //컴퓨터 화면에 무엇인가를 클릭했을 때, 그 클릭한 곳을 확인하고, 만약 그게 팝업 창의 바깥 부분이면, 그 팝업 창을 닫아준다.
  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then((it) => {
  pokemonRepository.getAll().forEach((pokemon) => {
    pokemonRepository.addListItem(pokemon);
  });
});

//ToDo1: Set the Top button
//ToDo2: Portfolio link
//ToDo3: Logo link
//ToDo4: Read.md file update
