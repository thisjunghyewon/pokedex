let pokemonRepository = (function () {
  let e = [],
    t = document.querySelector("#exampleModalCenter");
  function i(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log(`"${t}" is not a valid Pok\xe9mon!`);
  }
  function o() {
    return e;
  }
  function n(e) {
    return fetch(e.detailsUrl)
      .then((e) => e.json())
      .then((t) => {
        (e.imageUrl = t.sprites.front_default), (e.height = t.height);
      })
      .catch((e) => {
        console.error(e);
      });
  }
  function r(e) {
    n(e)
      .then((t) => (a(e.name, e.height, e.imageUrl), e))
      .catch((e) => {
        console.error(e);
      });
  }
  function a(e, t, i) {
    document.querySelector(".modal-title").innerText = e.toUpperCase();
    document.querySelector(".pokemonHeight").innerText = "Height: " + t + " cm";
    let o = document.querySelector(".PokemonImg");
    (o.src = i),
      o.setAttribute("width", "304"),
      o.setAttribute("height", "228"),
      o.setAttribute("alt", "Pokemon Image");
  }
  function l() {
    t.classList.remove("isVisible");
  }
  return (
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && t.classList.contains("isVisible") && l();
    }),
    t.addEventListener("click", (e) => {
      e.target === t && l();
    }),
    {
      add: i,
      getAll: o,
      addListItem: function e(t) {
        let i = document.querySelector(".list-group"),
          o = document.createElement("li");
        o.classList.add("list-group-item");
        let n = document.createElement("button");
        n.setAttribute("data-toggle", "modal"),
          n.setAttribute("data-target", "#exampleModalCenter"),
          n.classList.add("btn-primary"),
          (n.innerText = t.name),
          o.appendChild(n),
          i.appendChild(o),
          n.addEventListener("click", function (e) {
            r(t);
          });
      },
      showDetails: r,
      loadList: function e() {
        return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
          .then((e) => e.json())
          .then((e) => {
            e.results.forEach((e) => {
              i({ name: e.name, detailsUrl: e.url, height: e.height });
            });
          })
          .catch((e) => {
            console.error(e);
          });
      },
      loadDetails: n,
      showModal: a,
      hideModal: l,
    }
  );
})();
pokemonRepository.loadList().then((e) => {
  pokemonRepository.getAll().forEach((e) => {
    pokemonRepository.addListItem(e);
  });
});
