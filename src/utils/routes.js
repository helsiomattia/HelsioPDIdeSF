export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/$/, '');
export const ABOUT_PROJECT_ROUTE = 'about-project';
export const REDIRECT_STORAGE_KEY = 'crm-specialist-redirect';

const HASH_ALIASES = { skills: 'expertise' };
const PATH_ALIASES = { skills: 'expertise', '': 'home' };

export function stripBasePath(pathname) {
  if (!BASE_PATH) return pathname;
  if (pathname === BASE_PATH) return '/';
  if (pathname.startsWith(`${BASE_PATH}/`)) return pathname.slice(BASE_PATH.length) || '/';
  return pathname;
}

function normalizeRoutePath(path) {
  return String(path || '').replace(/^\/+|\/+$/g, '');
}

function getRedirectPath() {
  return window.sessionStorage.getItem(REDIRECT_STORAGE_KEY);
}

function clearRedirectPath() {
  window.sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
}

function parseAppPath(path) {
  const [route, projectId] = normalizeRoutePath(path).split('/');

  if (route === 'projects' && projectId) {
    return { type: 'project', projectId };
  }

  if (route === ABOUT_PROJECT_ROUTE) {
    return { type: 'aboutProject' };
  }

  return { type: 'home' };
}

export function getAppRouteFromLocation() {
  const redirectedPath = getRedirectPath();

  if (redirectedPath) {
    const redirectedRoute = parseAppPath(redirectedPath);
    if (redirectedRoute.type !== 'home') {
      clearRedirectPath();
      return redirectedRoute;
    }
  }

  return parseAppPath(stripBasePath(window.location.pathname));
}

export function getSectionFromLocation() {
  const redirectedPath = getRedirectPath();
  if (redirectedPath) {
    clearRedirectPath();
    const redirectedId = normalizeRoutePath(redirectedPath).split('/').filter(Boolean).pop() || 'home';
    return PATH_ALIASES[redirectedId] || redirectedId;
  }

  const hashId = window.location.hash.replace('#', '');
  if (hashId) return HASH_ALIASES[hashId] || hashId;

  const pathId = stripBasePath(window.location.pathname).split('/').filter(Boolean).pop() || 'home';
  return PATH_ALIASES[pathId] || pathId;
}

export function getHomeUrl(search = window.location.search) {
  return `${BASE_PATH || ''}/${search}`;
}

export function getSectionUrl(id, search = window.location.search) {
  const path = id === 'home' ? `${BASE_PATH || ''}/` : `${BASE_PATH || ''}/${id}`;
  return `${path}${search}`;
}

export function getProjectUrl(projectId) {
  return `${BASE_PATH || ''}/projects/${projectId}`;
}

export function getHomeProjectsUrl(search = window.location.search) {
  return `${BASE_PATH || ''}/projects${search}`;
}

export function getAboutProjectUrl(search = window.location.search) {
  return `${BASE_PATH || ''}/${ABOUT_PROJECT_ROUTE}${search}`;
}

export function navigateToUrl(url, { replace = false, notify = true } = {}) {
  const nextUrl = new URL(url, window.location.origin);
  const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  const nextRelativeUrl = `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;

  if (currentUrl === nextRelativeUrl) return false;

  window.history[replace ? 'replaceState' : 'pushState'](null, '', url);
  if (notify) window.dispatchEvent(new Event('popstate'));
  return true;
}
