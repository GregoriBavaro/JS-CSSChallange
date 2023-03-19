//Parent
const layoutPlaceholder = document.querySelector(".layout-placeholder");

//Data
let postsArray = [];

// read local JSON
fetchData("./resources/data/data.json", setData);

function setData(data) {
  postsArray = [...data];
}

let card = [];
let buttons = [];

setTimeout(() => {
  postsArray.map((post) => {
    card = createElements({
      Tag: "div",
      classList: "card",
      childNodes: [layoutPlaceholder],
    });

    card.innerHTML = `
    <div class="cardHeader">
        <div class="cardHeader__photoContainer">
            <img src="${post.profile_image}"/>  
        </div>
        <div class="cardHeader__infoContainer">
          <h3>${post.name}</h3>
          <p>${post.date}</p>
        </div>
        <div class="cardHeader__iconContainer ${post.source_type}">
          <img src="../resources/icons/${post.source_type}.svg" alt="${post.source_type} logo"/>
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
        <button class="moreButton">...more</button>
      </div>
      <div class="cardBody__likeContainer">
        <img src="../resources/icons/heart.svg"/>
        <p>${post.likes}</p>
      </div>
    </div>
    `;
  });

  let readMoreButton = document.querySelectorAll(".moreButton");

  readMoreButton.forEach((button) => {
    button.addEventListener("click", function (e) {

      const click = e.target.previousElementSibling;
      const parent = e.target.parentElement;
      const button = e.target;

      if (!click) return;

      click.classList.toggle("showMoreText");
      parent.classList.toggle("expendParent");

      if(button.innerText === "less") {
        button.innerText = "...more"
      } else {
        button.innerText = "less.."
      }
      
      
    });
  });
}, 100);
