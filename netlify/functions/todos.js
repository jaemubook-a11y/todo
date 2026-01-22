const headers = (token) => ({
  "Authorization": `Bearer ${token}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
});

async function queryDB(databaseId, token) {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}/query`,
    {
      method: "POST",
      headers: headers(token),
      body: JSON.stringify({
        filter: {
          property: "Done",
          checkbox: { equals: false }
        },
        sorts: [
          { property: "Date", direction: "ascending" }
        ]
      }),
    }
  );

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`DB ${databaseId} error: ${t}`);
  }

  return res.json();
}

exports.handler = async () => {
  try {
    const token = process.env.NOTION_TOKEN;
    const dbA = process.env.DATABASE_ID_A;
    const dbB = process.env.DATABASE_ID_B;

    const [a, b] = await Promise.all([
      queryDB(dbA, token),
      queryDB(dbB, token),
    ]);

    // 결과 합치기
    const merged = [...a.results, ...b.results];

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: merged,
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
