const cupcakeContainer = document.querySelector("#cupcake-list");

const allCupcakes = [];

// *****************************
//    *** SET UP ***
//  *****************************

document.addEventListener("DOMContentLoaded", loadCupcakes());

async function loadCupcakes() {
  await getAllCupcakes();
  createCupcakes(allCupcakes);
}

async function getAllCupcakes() {
  const resp = await axios.get("/api/cupcakes");
  for (let cupcake of resp.data.cupcakes) {
    allCupcakes.push(cupcake);
  }
}

function createCupcakes(allCupcakes) {
  for (let i = 0; i < allCupcakes.length; i++) {
    createCupcakeCard(allCupcakes[i]);
  }
}

function createCupcakeCard(cupcake) {
  const newCard = document.createElement("div");
  newCard.classList.add("card", "mx-3");
  newCard.setAttribute("style", "width: 18rem;");
  newCard.setAttribute("data-id", cupcake.id);

  newCard.innerHTML = `  
  <img class="card-img-top" src="${cupcake.image}" alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">${cupcake.flavor}</h5>
    <p class="card-text">Size: ${cupcake.size} <br> Rating: ${cupcake.rating} </p>
  </div>`;

  cupcakeContainer.appendChild(newCard);
}

// *****************************
//    *** FORM HANDLING ***
//  *****************************

addCupcakeForm = document.querySelector("#add-cupcake");
addCupcakeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let flavor = document.getElementById("flavor").value;
  let size = document.getElementById("size").value;
  let rating = document.getElementById("rating").value;
  let image = document.getElementById("image").value;

  const resp = await axios.post(
    "/api/cupcakes",
    (data = {
      flavor: flavor,
      size: size,
      rating: rating,
      image: image,
    })
  );
  console.log(resp.data);
  addCupcakeForm.reset();
  clearContainer(cupcakeContainer);
  allCupcakes.length = 0;
  loadCupcakes();
});

// *****************************
//    *** Clearing Container ***
//  *****************************

function clearContainer(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// *****************************
//    *** Search Form ***
//  *****************************

// searchForm = document.querySelector("#search-form");

// searchForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   searchTerm = document.getElementById("search").value;
//   const res = await axios.get("/api/cupcakes/search", {
//     params: { q: searchTerm },
//   });
//   console.log(res);
//   searchForm.reset();
// });
