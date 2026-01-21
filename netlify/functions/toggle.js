exports.handler = async (event) => {
  const { pageId, done } = JSON.parse(event.body);

  const NOTION_TOKEN = process.env.NOTION_TOKEN;

  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers: {
      "Authorization": `Bearer ${NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        Done: {
          checkbox: done,
        },
      },
    }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ ok: true }),
  };
};
