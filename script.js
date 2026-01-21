async function fetchTodos() {
  const res = await fetch("/.netlify/functions/todos");
  const data = await res.json();
  if (!res.ok) {
    console.log("API error", data);
    return;
  }
  render(data.results || []);
}

async function updateTodo(pageId, value) {
  await fetch("/.netlify/functions/toggle", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pageId, value })
  });
  fetchTodos();
}
