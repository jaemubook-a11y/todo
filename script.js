fetch("/.netlify/functions/todos")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    data.results.forEach(item => {
      const title = item.properties.Name.title[0]?.plain_text || "";
      const li = document.createElement("li");
      li.textContent = title;
      list.appendChild(li);
    });
  });
