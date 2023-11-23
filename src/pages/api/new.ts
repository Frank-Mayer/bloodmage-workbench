import type { NextApiRequest, NextApiResponse } from "next";

const reponameRegex = /^[a-z][a-z0-9]*$/;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const accountname = req.query.account;
  if (typeof accountname !== "string" || accountname.length === 0) {
    res.status(400).send("Invalid account name");
    return;
  }

  const projectname = req.query.repo;
  if (typeof projectname !== "string" || !reponameRegex.test(projectname)) {
    res.status(400).send("Invalid repo name");
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

  const org = user.login === accountname ? undefined : accountname;

  await createFork(res, accessToken, org, projectname);

  const modname = `github.com/${accountname}/${projectname}`;

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
  org: string | undefined,
  pojectname: string,
) {
  const body = {
    name: pojectname,
    default_branch_only: true,
    organization: org,
  };

  if (org) {
    body.organization = org;
  }

  const createForkResp = await fetch(
    "https://api.github.com/repos/bloodmagesoftware/bloodmage-engine/forks",
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!createForkResp.ok) {
    res.status(createForkResp.status).send(await createForkResp.text());
    return false;
  }

  return true;
}
