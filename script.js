fetch("/.netlify/functions/todos")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    data.results.forEach(item => {
      const pageId = item.id;
      const title = item.properties.Name.title[0]?.plain_text || "";
      const done = item.properties.Done?.checkbox || false;

      const li = document.createElement("li");
      if (done) li.classList.add("done");

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = done;

      const span = document.createElement("span");
      span.textContent = title;

      checkbox.addEventListener("change", () => {
        li.classList.toggle("done", checkbox.checked);

        fetch("/.netlify/functions/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pageId,
            done: checkbox.checked,
          }),
        });
      });

      label.appendChild(checkbox);
      label.appendChild(span);
      li.appendChild(label);
      list.appendChild(li);
    });
  });
