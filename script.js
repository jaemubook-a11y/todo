fetch("/.netlify/functions/todos")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("todo-list");
    list.innerHTML = "";

    (data.results || []).forEach(item => {
      const pageId = item.id;
      const title = item.properties.Name?.title?.[0]?.plain_text || "";
      const done = item.properties.Done?.checkbox || false;

      const li = document.createElement("li");
      if (done) li.classList.add("done");

      const label = document.createElement("label");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = done;

      const span = document.createElement("span");
      span.textContent = title;

      checkbox.addEventListener("change", async () => {
        const next = checkbox.checked;

        // UI 먼저 반영
        li.classList.toggle("done", next);

        // 노션 반영
        const r = await fetch("/.netlify/functions/toggle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pageId, done: next }),
        });

        // 실패하면 UI 롤백
        if (!r.ok) {
          const err = await r.json().catch(() => ({}));
          checkbox.checked = !next;
          li.classList.toggle("done", !next);
          alert(`노션 반영 실패: ${err.message || err.error || r.status}`);
        }
      });

      label.appendChild(checkbox);
      label.appendChild(span);
      li.appendChild(label);
      list.appendChild(li);
    });
  });
