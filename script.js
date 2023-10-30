let container = document.createElement("center");
let overlay = document.createElement("div");
let country = document.createElement("select");
let state = document.createElement("select");
let city = document.createElement("select");
let br = document.createElement("br");
let showModule = document.createElement("button");
showModule.textContent = "Enter";
let displayModule = document.createElement("div");

// /////////////////////////////////
// let logOutButton = document.createElement("button");
// logOutButton.textContent = "LogOut";
// logOutButton.classList.add("enter-button");
// logOutButton.style.display = "none";
// document.body.append(logOutButton);
// /////////////////////////////////

state.style.display = "none";
city.style.display = "none";
container.style.marginTop = "5rem";

overlay.classList.add("overlay", "hidden");
country.classList.add("country-select");
state.classList.add("state-select");
city.classList.add("city-select");
showModule.classList.add("enter-button");
displayModule.classList.add("display-module", "hidden");

document.body.append(container);
container.append(country, state, city, br, showModule);
document.body.append(displayModule, overlay);

// ///// DATA   ///////////
let RegionData = {
  india: {
    Maharastra: ["Nagpur", "Mumbai", "Pune"],
    Mp: ["Bhopal", "Indore", "Balaghat"],
    up: ["Lucknow", "Agra", "Allahabad"],
  },
  Australia: {
    NewSouthWales: ["Sydney", "Newcastle"],
    Victoria: ["Melbourne", "Geelong"],
  },
  America: {
    California: ["Los Angeles", "San Francisco"],
    NewYork: ["New York City", "Buffalo"],
  },
};

const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Select";
country.append(defaultOption);
state.append(defaultOption.cloneNode(true));
city.append(defaultOption.cloneNode(true));

for (let countryName in RegionData) {
  let countryOpt = document.createElement("option");
  countryOpt.value = countryName;
  countryOpt.textContent = countryName;
  country.append(countryOpt);
}

country.addEventListener("change", () => {
  state.style.display = "block";
  city.style.display = "none";
  state.innerHTML = "";
  city.innerHTML = "";

  let selectedCountry = RegionData[country.value];

  const defaultStateOption = defaultOption.cloneNode(true);

  state.append(defaultStateOption);

  for (let stateName in selectedCountry) {
    let stateOpt = document.createElement("option");
    stateOpt.textContent = stateName;
    state.append(stateOpt);
  }
});

state.addEventListener("change", () => {
  city.style.display = "block";
  city.innerHTML = "";

  let selectedCountry = RegionData[country.value];
  let selectedState = selectedCountry[state.value];

  const defaultCityOption = defaultOption.cloneNode(true);
  city.append(defaultCityOption);

  for (let cityName of selectedState) {
    let cityOpt = document.createElement("option");
    cityOpt.value = cityName;
    cityOpt.textContent = cityName;
    city.append(cityOpt);
  }
});

showModule.addEventListener("click", () => {
  const selectedCountryValue = country.value;
  const selectedStateValue = state.value;
  const selectedCityValue = city.value;

  if (!selectedCountryValue || !selectedStateValue || !selectedCityValue) {
    alert("Please select a country, state, and city before continuing.");
    return;
  } else if ((selectedCityValue, selectedCountryValue, selectedStateValue)) {
    displayModule.classList.remove("hidden");

    overlay.classList.remove("hidden");
  }

  displayModule.innerHTML = `
  
  <div>Selected Country: ${selectedCountryValue}</div>
  <div>Selected State: ${selectedStateValue}</div>
  <div>Selected City: ${selectedCityValue}</div>
  <button class='enter-button' onClick='OpenUserForm()'>Next</button>
`;
});

// //////when close///////////////////
const OpenUserForm = function () {
  displayModule.classList.add("hidden");
  overlay.classList.add("hidden");
  container.classList.remove("hidden");

  userForm.style.display = "block";
  container.style.display = "none";
};
overlay.addEventListener("click", OpenUserForm);

// //////////////////////
// creating User Form //

let userForm = document.createElement("form");
userForm.classList.add("userForm");

let usernameInput = document.createElement("input");
usernameInput.type = "text";
usernameInput.placeholder = "Username";
usernameInput.name = "username";
usernameInput.required = true;

let userIdInput = document.createElement("input");
userIdInput.type = "text";
userIdInput.placeholder = "User ID";
userIdInput.name = "userId";
userIdInput.required = true;

let submitButton = document.createElement("button");
submitButton.type = "submit";
submitButton.textContent = "Submit";

document.body.append(userForm);
userForm.appendChild(usernameInput);
userForm.appendChild(userIdInput);
userForm.appendChild(submitButton);

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = usernameInput.value;
  let userId = userIdInput.value;
  setCookies(username);
  window.location.reload();
});

function setCookies(name) {
  document.cookie = `${name}`;
}

function displayUserData() {
  let cookies = document.cookie.split(" ");
  // console.log(cookies);
  let userName = document.createElement("h1");
  userName.classList.add("displayUserData");
  userName.innerHTML = `Hello, <br/> ${cookies} <br/> I Hope You liked This Page`;
  document.body.append(userName);

  container.style.display = "none";
  logOutButton.style.display = "block";
}

// logOutButton.addEventListener("click", () => {
//   document.cookie = " ";
// });

if (document.cookie) {
  displayUserData();
} else {
  container.style.display = "block";
}
