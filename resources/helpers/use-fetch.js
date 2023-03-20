// Fetch and set data to local storage
const fetchData = (url, name) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => localStorage.setItem(name, JSON.stringify(data)));
  };
  