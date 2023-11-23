import { panic } from "@/lib/panic";
import type { NextApiRequest, NextApiResponse } from "next";

const ridirectUri =
  (process.env.HOSTNAME ?? panic("HOSTNAME is not set")) + "/api/callback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append(
    "client_id",
    process.env.GITHUB_CLIENT_ID ?? panic("GITHUB_CLIENT_ID is not set"),
  );
  url.searchParams.append("redirect_uri", ridirectUri);

  const refreshToken = req.cookies.refresh_token;
  if (refreshToken) {
    url.searchParams.append("refresh_token", refreshToken);
  }

  res.redirect(301, url.href);
}
