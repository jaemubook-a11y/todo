exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const NOTION_TOKEN = process.env.NOTION_TOKEN;
  const { pageId, value } = JSON.parse(event.body);

  const res = await fetch(
    `https://api.notion.com/v1/pages/${pageId}`,
    {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        properties: {
          Done: { checkbox: value }
        }
      })
    }
  );

  const data = await res.json();

  return {
    statusCode: res.status,
    body: JSON.stringify(data),
  };
};
