import { panic } from "@/lib/panic";
import type { NextApiRequest, NextApiResponse } from "next";

const ridirectUri =
  (process.env.HOSTNAME ?? panic("HOSTNAME is not set")) + "/api/callback";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // check if the user is logged in (access_token cookie is set)
  if (req.cookies.access_token) {
    res.redirect(301, "/dashboard");
    return;
  }

  newLogin(res);
}

function newLogin(res: NextApiResponse) {
  const url = new URL("https://github.com/login/oauth/authorize");
  url.searchParams.append(
    "client_id",
    process.env.GITHUB_CLIENT_ID ?? panic("GITHUB_CLIENT_ID is not set"),
  );
  url.searchParams.append("redirect_uri", ridirectUri);

  res.redirect(301, url.href);
}
