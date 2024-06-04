export function matchURL(pattern: string, path: string) {
  const keys: string[] = [];
  const regex = patternToRegex(pattern, keys);
  if (path.includes("?")) {
    path = path.split("?")[0];
  }

  if (path.endsWith("/")) {
    path = path.slice(0, -1);
  }
  if (pattern.endsWith("/")) {
    pattern = pattern.slice(0, -1);
  }

  const match = path.match(regex);
  if (!match) return null;

  const params: {
    [key: string]: any;
  } = {};
  for (let i = 1; i < match.length; i++) {
    params[keys[i - 1]] = match[i];
  }
  return params;
}

function patternToRegex(pattern: string, keys: string[]) {
  const regexStr = pattern.replace(/:([^\/]+)/g, (_, key) => {
    keys.push(key);
    return "([^/]+)";
  });
  return new RegExp(`^${regexStr}$`);
}
