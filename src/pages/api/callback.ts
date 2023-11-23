import { panic } from "@/lib/panic";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { code } = req.query;
  if (!code) {
    res.status(400).json({ error: "No code provided" });
    return;
  }

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.GITHUB_CLIENT_ID ?? panic("No client ID"),
      client_secret:
        process.env.GITHUB_CLIENT_SECRET ?? panic("No client secret"),
      code,
    }),
  });

  const body = await response.text();

  console.log(body);

  const params = new URLSearchParams(body);
  const error = params.get("error");
  if (error) {
    const errorDescription = params.get("error_description");
    res.status(400).json({ error, errorDescription });
    return;
  }
  const accessToken = params.get("access_token");
  if (!accessToken) {
    res.status(500).send("No access token");
    return;
  }
  const expiresIn = params.get("expires_in");
  if (!expiresIn) {
    res.status(500).send("No expires in");
    return;
  }
  const refreshToken = params.get("refresh_token");
  if (!refreshToken) {
    res.status(500).send("No refresh token");
    return;
  }
  const refreshTokenExpiresIn = params.get("refresh_token_expires_in");
  if (!refreshTokenExpiresIn) {
    res.status(500).send("No refresh token expires in");
    return;
  }

  res.setHeader("Set-Cookie", [
    `access_token=${accessToken}; HttpOnly; Secure; Max-Age=${expiresIn}`,
    `refresh_token=${refreshToken}; HttpOnly; Secure; Max-Age=${refreshTokenExpiresIn}`,
  ]);

  res.redirect(301, "/dashboard");
}
