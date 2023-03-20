//Elements
const body = document.querySelector("body");
const layoutPlaceholder = document.querySelector(".layout-placeholder");
const gridContainer = document.querySelector(".gridContainer");
const loadMoreButton = document.querySelector(".loadMoreButton");

let errorContainer = createElements({
  Tag: "div",
  classList: "errorContainer",
  childNodes: [body],
});

//Error
function error(display, message, el) {
  el.style.display = display;

  el.innerHTML = `
  <h1>${message}</h1>
  <button class="exitButton">X</button>
  `;
  
  document.querySelector(".exitButton").addEventListener("click", function() {
    el.style.display = "none"
  })
}

//Set local json
fetchData("./resources/data/data.json", "posts");

//Get data from local storage
let posts = JSON.parse(localStorage.getItem("posts"));

//Store card div's
let card = [];

//Initial posts
let initialPosts = 4;

let out = "";

posts.map((post) => {
  out += `
  <div class="card ${post.source_type}-card">
    <div class="cardHeader">
      <div class="cardHeader__photoContainer">
        <img src="${post.profile_image}"/>  
      </div>
      <div class="cardHeader__infoContainer">
        <h3>${post.name}</h3>
        <p>${new Date(post.date).toLocaleString("en-us", {
          day: "numeric",
          month: "short",
        })} ${new Date(post.date).toLocaleString("en-us", {
    year: "numeric",
  })}</p>
      </div>
      <div class="cardHeader__iconContainer ${post.source_type}">
        <img src="../resources/icons/${post.source_type}.svg" alt="${
    post.source_type
  } logo"/>
      </div>
    </div>
    <div class="cardBody">
      <div class="cardBody__photoContainer">
        <img src="${post.image}"/>
      </div>
      <div class="cardBody__textContainer">
        <div class="bodyText">
          <p>${post.caption}</p>
        </div>
        <div class="moreButton">...more</div>
      </div>
      <div class="cardBody__likeContainer">
        <div class="likeButton disliked"></div>
        <p class="likes">${post.likes}</p>
      </div>
    </div>
  </div>
`;

  gridContainer.innerHTML = out;
});

//Show more post by setting them to display flex
loadMoreButton.addEventListener("click", () => {
  let cards = [...document.querySelectorAll(".card")];

  for (var i = initialPosts; i < initialPosts + 4; i++) {
    cards[i].style.display = "flex";
  }
  initialPosts += 4;

  if (initialPosts >= cards.length) {
    loadMoreButton.style.display = "none";
  }
  removeReadMoreButton();
});

// Filter
document.addEventListener("click", function (e) {
  if (e.target.name === "filterBySource") {
    let cards = [...document.querySelectorAll(".card")];
    let value = e.target.value;

    cards.forEach((card) => {
      if (value === "all") {
        card.style.display = "flex";
        loadMoreButton.style.display = "flex";
        error("none", "Sorry, no twitter posts!", errorContainer);
        return;
      }
      if (value === "twitter") {
        card.style.display = "none";
        loadMoreButton.style.display = "none";
        error("flex", "Sorry, no twitter posts!", errorContainer);
        return;
      }

      card.style.display = "flex";

      if (!card.classList.contains("instagram-card") && value === "instagram") {
        card.style.display = "none";
        loadMoreButton.style.display = "none";
        error("none", "Sorry, no twitter posts!", errorContainer);
        return;
      }
      if (!card.classList.contains("facebook-card") && value === "facebook") {
        card.style.display = "none";
        loadMoreButton.style.display = "none";
        error("none", "Sorry, no twitter posts!", errorContainer);
        return;
      }
    });
  }
});

//Likes
let likeButtons = document.querySelectorAll(".likeButton");

likeButtons.forEach((button) => {
  button.addEventListener("click", function (e) {
    const heart = e.target; //heart

    const likesPara = e.target.nextElementSibling; //like
    const likesCount = likesPara.innerHTML;
    const parsedLikesCount = parseInt(likesCount);

    if (heart.classList.contains("liked")) {
      heart.classList.remove("liked");
      heart.classList.toggle("disliked");
      likesPara.innerHTML = parsedLikesCount - 1;
      return;
    }
    if (heart.classList.contains("disliked")) {
      heart.classList.toggle("liked");
      heart.classList.remove("disliked");
      likesPara.innerHTML = parsedLikesCount + 1;
      return;
    }
  });
});

//Read More (extra: i know this wasn't part of the requirements but i had to handle captions to archive more realistic look)
let readMoreButton = document.querySelectorAll(".moreButton");

readMoreButton.forEach((button) => {
  button.addEventListener("click", function (e) {
    const click = e.target.previousElementSibling;
    const parent = e.target.parentElement;
    const button = e.target;

    click.classList.toggle("showMoreText");
    parent.classList.toggle("expendParent");

    if (button.innerText === "...more") {
      button.innerText = "less...";
      return;
    }
    if (button.innerText === "less...") {
      button.innerText = "...more";
      return;
    }
  });
});

//Remove read more button if there is no text or < 70char

function removeReadMoreButton() {
  let captionContainer = document.querySelectorAll(".bodyText");

  captionContainer.forEach((container) => {
    let paragraphLength = container.firstChild.nextSibling.innerHTML.length;
    let moreButton = container.nextElementSibling
    
    if (paragraphLength < 71) {
      moreButton.style.display = "none"
    }
  })
}

removeReadMoreButton();

// card
let cards = document.querySelectorAll(".card");

//Card background color
let cardBackgroundColorPicker = document.getElementById("cardBackgroundColor");

cards.forEach((card) => {
  cardBackgroundColorPicker.addEventListener("change", function () {
    card.style.backgroundColor = cardBackgroundColorPicker.value;
  });

  //Choose theme

  document.addEventListener("click", function (e) {
    if (e.target.type === "radio") {
      if (e.target.value === "darkTheme") {
        card.style.backgroundColor = "rgb(32, 33, 36)";
        card.style.color = "white";
        return;
      }
      if (e.target.value === "lightTheme") {
        card.style.backgroundColor = "rgb(255, 255, 255)";
        card.style.color = "black";
        return;
      }
    }
  });
});

//Cards space between (I am not sure if i was allowed to modify the basic setup of the html,i just changed the input value type to number to prevent the user entering strings like px, rem etc)
const spaceBetweenInput = document.getElementById("cardSpaceBetween");

spaceBetweenInput.addEventListener("change", function (e) {
  gridContainer.style.gridGap = `${e.target.value}px`;
  gridContainer.style.columGap = `${e.target.value}px`;
});

//Number of columns
const numberOfColumnsSelect = document.getElementById("numberOfColumns");

numberOfColumnsSelect.addEventListener("change", function (e) {
  if (window.innerWidth < 992) {
    error("flex", "Sorry, your screen is too small for this feature :(", errorContainer);
    return;
  }
  if (e.target.value !== "dynamic") {
    gridContainer.style.gridTemplateColumns = `repeat(${e.target.value}, auto)`;
    gridContainer.style.width = "fit-content";
    return;
  }

  if (e.target.value === "dynamic") {
    gridContainer.style.gridTemplateColumns =
      "repeat(auto-fill, minmax(250px, 350px)";
    gridContainer.style.width = "90%";
    return;
  }
});
