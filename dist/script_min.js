let e = (function () {
  let e = [],
    t = "https://pokeapi.co/api/v2/pokemon/?limit=150",
    n = document.querySelector("#exampleModalCenter");
  function o(t) {
    "object" == typeof t && "name" in t
      ? e.push(t)
      : console.log(`"${t}" is not a valid Pokémon!`);
  }
  function i(e) {
    let t = document.querySelector(".list-group"),
      n = document.createElement("li"),
      o = document.createElement("button");
    r(e).then(function () {
      n.classList.add("list-group-item"),
        (o.innerHTML += "<h1>" + e.id + ". " + e.name + "</h1>"),
        (o.innerHTML +=
          '<img src="' +
          e.imageUrl +
          '" alt="' +
          e.name +
          "'s image and button\" >"),
        o.setAttribute("data-bs-toggle", "modal"),
        o.setAttribute("data-bs-target", "#exampleModalCenter"),
        o.classList.add("btn-primary");
    }),
      n.appendChild(o),
      t.appendChild(n),
      o.addEventListener("click", function (t) {
        a(e);
      });
  }
  function r(e) {
    let t = e.detailsUrl;
    return fetch(t)
      .then((e) => e.json())
      .then((t) => {
        (e.imageUrl = t.sprites.front_default),
          (e.modalImageUrl = t.sprites.other.dream_world.front_default),
          (e.id = t.id),
          (e.height = t.height / 10),
          (e.weight = t.weight / 10),
          (e.types = []);
        for (let n = 0; n < t.types.length; n++)
          e.types[n] = t.types[n].type.name;
      })
      .catch((e) => {
        c(), console.error(e);
      });
  }
  function a(e) {
    r(e).then(() => {
      d(e);
    });
  }
  function d(e) {
    document.querySelector(".modal-body");
    let t = document.querySelector(".modal-title");
    document.querySelector(".modal-header");
    bootstrap.Modal.getInstance(document.querySelector(".modal"));
    (t.innerText = e.id + ". " + e.name + "\n"),
      (document.querySelector(".height-el").innerText =
        "Height: " + e.height + "m"),
      (document.querySelector(".weight-el").innerText =
        "Weight: " + e.weight + "kg");
    let n = document.querySelector(".type-el");
    (n.innerText = "Types: " + e.types[0]),
      e.types.length > 1 && (n.innerText += ", " + e.types[1]);
    let o = document.getElementById("modalImage");
    o.setAttribute("src", e.modalImageUrl),
      o.setAttribute("width", "304"),
      o.setAttribute("height", "228"),
      o.setAttribute("alt", "Pokemon's Image");
  }
  function l() {
    n.classList.remove("isVisible");
  }
  function s() {
    document.querySelector(".pokedex").classList.add("hidden");
  }
  function c() {
    document.querySelector(".pokedex").classList.remove("hidden"),
      document.querySelector(".loader").classList.add("hidden");
  }
  return (
    document.querySelector(".search-bar").addEventListener("input", (t) => {
      const n = t.target.value.toLowerCase(),
        o = e.filter((e) => e.name.toLowerCase().includes(n));
      (document.querySelector(".list-group").innerHTML = ""),
        o.forEach((e) => {
          i(e);
        });
    }),
    document.querySelector(".btn-close").addEventListener("click", (e) => {
      document.getElementById("exampleModalCenter").classList.add("hidden");
    }),
    window.addEventListener("keydown", (e) => {
      "Escape" === e.key && n.classList.contains("isVisible") && l();
    }),
    n.addEventListener("click", (e) => {
      e.target === n && l();
    }),
    {
      add: o,
      getAll: function () {
        return e;
      },
      addListItem: i,
      showDetails: a,
      loadList: function () {
        return (
          s(),
          fetch(t)
            .then((e) => e.json())
            .then((e) => {
              e.results.forEach((e) => {
                o({ name: e.name, detailsUrl: e.url });
              });
            })
            .catch((e) => {
              console.error(e);
            })
        );
      },
      loadDetails: r,
      showModal: d,
      showLoadingMessage: s,
      hideLoadingMessage: c,
      hideModal: l,
    }
  );
})();
e.loadList()
  .then(function () {
    e.getAll().forEach(function (t) {
      e.addListItem(t);
    });
  })
  .then(function () {
    e.hideLoadingMessage();
  })
  .catch(function (t) {
    e.hideLoadingMessage(), console.error(t);
  });
