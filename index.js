//Parent
const layoutPlaceholder = document.querySelector(".layout-placeholder");

//Grid container
const gridContainer = createElements({
  Tag: "div",
  classList: "gridContainer",
  childNodes: [layoutPlaceholder],
});

//Load more button

const loadMoreButton__container = createElements({
  Tag: "div",
  classList: "loadMoreButton__container",
  childNodes: [layoutPlaceholder],
});

// copy of data
let postsArray = [];

// read local data
fetchData("./resources/data/data.json", setData);

let card = [];

//set copy of data
function setData(data) {
  postsArray = [...data];
}

setTimeout(() => {
  loadMoreButton__container.innerHTML = `<button class="loadMoreButton">load more</button>`;
  const loadMoreButton = document.querySelector(".loadMoreButton");

  localStorage.setItem("number", 0);

  function increment() {
    let number = localStorage.getItem("number");
    let parsedNumber = parseInt(number);

    localStorage.setItem("number", (parsedNumber += 4));

    console.log(parsedNumber);
    return parsedNumber;
  }

  loadMoreButton.addEventListener("click", function () {
    increment();
  });

  let slicedArray = postsArray.slice(0, 20);

  //Filter by source

  // document.addEventListener("click", function (e) {
  //   if(e.target.name === "filterBySource") {
  //     localStorage.setItem("source", e.target.value)
  //   }
  // })

  slicedArray.map((post) => {
    card = createElements({
      Tag: "div",
      classList: "card",
      childNodes: [gridContainer],
    });

    card.innerHTML = `
    
    <div class="cardHeader">
        <div class="cardHeader__photoContainer">
            <img src="${post.profile_image}"/>  
        </div>
        <div class="cardHeader__infoContainer">
          <h3>${post.name}</h3>
          <p>${post.date.substring(0, 10)}</p>
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
    `;
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

  //Read More

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

  // card
  let cards = document.querySelectorAll(".card");

  //Card background color

  let cardBackgroundColorPicker = document.getElementById(
    "cardBackgroundColor"
  );

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

  //Cards space between

  const spaceBetweenInput = document.getElementById("cardSpaceBetween");

  spaceBetweenInput.addEventListener("change", function (e) {
    gridContainer.style.gridGap = e.target.value;
    gridContainer.style.columGap = e.target.value;
  });

  //Number of columns

  const numberOfColumnsSelect = document.getElementById("numberOfColumns");

  numberOfColumnsSelect.addEventListener("change", function (e) {
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
}, 100);
