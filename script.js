fetch("/.netlify/functions/todos")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    // 1️⃣ 
    data.results.forEach(item => {
      const title = item.properties.Name.title[0]?.plain_text || "";
      const li = document.createElement("li");
      li.textContent = title;
      list.appendChild(li);
    });

    // 2️⃣ 테스트용 (한 번만)
    const testLi = document.createElement("li");
    testLi.textContent = "테스트 할 일";
    list.appendChild(testLi);
  });
