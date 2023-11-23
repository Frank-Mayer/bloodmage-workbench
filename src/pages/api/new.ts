import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const projectname = req.query.name;
  if (typeof projectname !== "string") {
    res.status(400).send("Invalid name");
    return;
  }

  // check if the user is logged in (access_token cookie is set)
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    res.status(401).send("Unauthorized");
    return;
  }

  const user = await getUser(res, accessToken);
  if (!user) {
    return;
  }

  await createFork(res, accessToken, projectname);

  const modname = `github.com/${user.login}/${projectname}`;

  res.redirect(302, "https://" + modname);
}

async function getUser(res: NextApiResponse, accessToken: string) {
  const getUserResp = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!getUserResp.ok) {
    res.status(getUserResp.status).send(await getUserResp.text());
    return undefined;
  }

  const body = await getUserResp.json();
  return {
    login: body.login,
  };
}

async function createFork(
  res: NextApiResponse,
  accessToken: string,
  pojectname: string,
) {
  const createForkResp = await fetch(
    "https://api.github.com/repos/bloodmagesoftware/bloodmage-engine/forks",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: pojectname,
        default_branch_only: true,
      }),
    },
  );

  if (!createForkResp.ok) {
    res.status(createForkResp.status).send(await createForkResp.text());
    return false;
  }

  return true;
}
