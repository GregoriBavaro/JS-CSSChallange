const fetchData = (url, setData) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setData(data));
  };
  