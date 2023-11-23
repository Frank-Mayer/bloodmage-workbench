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
  const response = await fetch("https://api.github.com/user/installations", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    res.status(response.status).send(await response.text());
    return;
  }

  const body = (await response.json()) as InstallationResponse;

  res.status(200).json(body);
}

export interface InstallationResponse {
  total_count: number;
  installations: Installation[];
  [k: string]: unknown;
}
/**
 * Installation
 */
export interface Installation {
  /**
   * The ID of the installation.
   */
  id: number;
  account: (SimpleUser | Enterprise) &
    (((SimpleUser | Enterprise) & null) | (SimpleUser | Enterprise));
  /**
   * Describe whether all repositories have been selected or there's a selection involved
   */
  repository_selection: "all" | "selected";
  access_tokens_url: string;
  repositories_url: string;
  html_url: string;
  app_id: number;
  /**
   * The ID of the user or organization this token is being scoped to.
   */
  target_id: number;
  target_type: string;
  permissions: AppPermissions;
  events: string[];
  created_at: string;
  updated_at: string;
  single_file_name: string | null;
  has_multiple_single_files?: boolean;
  single_file_paths?: string[];
  app_slug: string;
  suspended_by: null | SimpleUser1;
  suspended_at: string | null;
  contact_email?: string | null;
  [k: string]: unknown;
}
/**
 * A GitHub user.
 */
export interface SimpleUser {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
  [k: string]: unknown;
}
/**
 * An enterprise on GitHub.
 */
export interface Enterprise {
  /**
   * A short description of the enterprise.
   */
  description?: string | null;
  html_url: string;
  /**
   * The enterprise's website URL.
   */
  website_url?: string | null;
  /**
   * Unique identifier of the enterprise
   */
  id: number;
  node_id: string;
  /**
   * The name of the enterprise.
   */
  name: string;
  /**
   * The slug url identifier for the enterprise.
   */
  slug: string;
  created_at: string | null;
  updated_at: string | null;
  avatar_url: string;
  [k: string]: unknown;
}
/**
 * The permissions granted to the user access token.
 */
export interface AppPermissions {
  /**
   * The level of permission to grant the access token for GitHub Actions workflows, workflow runs, and artifacts.
   */
  actions?: "read" | "write";
  /**
   * The level of permission to grant the access token for repository creation, deletion, settings, teams, and collaborators creation.
   */
  administration?: "read" | "write";
  /**
   * The level of permission to grant the access token for checks on code.
   */
  checks?: "read" | "write";
  /**
   * The level of permission to grant the access token for repository contents, commits, branches, downloads, releases, and merges.
   */
  contents?: "read" | "write";
  /**
   * The level of permission to grant the access token for deployments and deployment statuses.
   */
  deployments?: "read" | "write";
  /**
   * The level of permission to grant the access token for managing repository environments.
   */
  environments?: "read" | "write";
  /**
   * The level of permission to grant the access token for issues and related comments, assignees, labels, and milestones.
   */
  issues?: "read" | "write";
  /**
   * The level of permission to grant the access token to search repositories, list collaborators, and access repository metadata.
   */
  metadata?: "read" | "write";
  /**
   * The level of permission to grant the access token for packages published to GitHub Packages.
   */
  packages?: "read" | "write";
  /**
   * The level of permission to grant the access token to retrieve Pages statuses, configuration, and builds, as well as create new builds.
   */
  pages?: "read" | "write";
  /**
   * The level of permission to grant the access token for pull requests and related comments, assignees, labels, milestones, and merges.
   */
  pull_requests?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage the post-receive hooks for a repository.
   */
  repository_hooks?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage repository projects, columns, and cards.
   */
  repository_projects?: "read" | "write" | "admin";
  /**
   * The level of permission to grant the access token to view and manage secret scanning alerts.
   */
  secret_scanning_alerts?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage repository secrets.
   */
  secrets?: "read" | "write";
  /**
   * The level of permission to grant the access token to view and manage security events like code scanning alerts.
   */
  security_events?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage just a single file.
   */
  single_file?: "read" | "write";
  /**
   * The level of permission to grant the access token for commit statuses.
   */
  statuses?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage Dependabot alerts.
   */
  vulnerability_alerts?: "read" | "write";
  /**
   * The level of permission to grant the access token to update GitHub Actions workflow files.
   */
  workflows?: "write";
  /**
   * The level of permission to grant the access token for organization teams and members.
   */
  members?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage access to an organization.
   */
  organization_administration?: "read" | "write";
  /**
   * The level of permission to grant the access token for custom repository roles management. This property is in beta and is subject to change.
   */
  organization_custom_roles?: "read" | "write";
  /**
   * The level of permission to grant the access token for custom property management.
   */
  organization_custom_properties?: "read" | "write" | "admin";
  /**
   * The level of permission to grant the access token to view and manage announcement banners for an organization.
   */
  organization_announcement_banners?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage the post-receive hooks for an organization.
   */
  organization_hooks?: "read" | "write";
  /**
   * The level of permission to grant the access token for viewing and managing fine-grained personal access token requests to an organization.
   */
  organization_personal_access_tokens?: "read" | "write";
  /**
   * The level of permission to grant the access token for viewing and managing fine-grained personal access tokens that have been approved by an organization.
   */
  organization_personal_access_token_requests?: "read" | "write";
  /**
   * The level of permission to grant the access token for viewing an organization's plan.
   */
  organization_plan?: "read";
  /**
   * The level of permission to grant the access token to manage organization projects and projects beta (where available).
   */
  organization_projects?: "read" | "write" | "admin";
  /**
   * The level of permission to grant the access token for organization packages published to GitHub Packages.
   */
  organization_packages?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage organization secrets.
   */
  organization_secrets?: "read" | "write";
  /**
   * The level of permission to grant the access token to view and manage GitHub Actions self-hosted runners available to an organization.
   */
  organization_self_hosted_runners?: "read" | "write";
  /**
   * The level of permission to grant the access token to view and manage users blocked by the organization.
   */
  organization_user_blocking?: "read" | "write";
  /**
   * The level of permission to grant the access token to manage team discussions and related comments.
   */
  team_discussions?: "read" | "write";
  [k: string]: unknown;
}
/**
 * A GitHub user.
 */
export interface SimpleUser1 {
  name?: string | null;
  email?: string | null;
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  starred_at?: string;
  [k: string]: unknown;
}
