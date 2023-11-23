import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // check if the user is logged in (access_token cookie is set)
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  // redirect to the image
  const response = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    res.status(response.status).send(await response.text());
    return;
  }

  const body = await response.json();
  const avatarUrl = body.avatar_url;

  if (!avatarUrl) {
    res.status(500).send("No avatar URL from GitHub API");
    return;
  }

  res.redirect(301, avatarUrl);
}
