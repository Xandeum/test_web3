/**
 * Sanitizes file path for validate path.
 * Ensures the path contains only allowed characters, prevents path traversal,
 * and normalizes the path to start with a single slash.
 *
 * Allowed characters: alphanumeric, '/', '_', '-', '.'
 * Disallowed: consecutive slashes (//), path traversal (..), control characters,
 *             invalid filesystem characters (<, >, :, ", \, |, ?, *),
 *             empty or whitespace-only paths.
 *
 * @param path - The file path to sanitize.
 * @throws Error if the path is invalid.
 */
export function sanitizePath(path: string): void {
    // Check for empty or whitespace-only paths
    if (!path || path.trim() === "") {
      throw new Error("Path cannot be empty or whitespace-only");
    }
  
    // Check for consecutive slashes (// or more)
    if (/\/\/+/.test(path)) {
      throw new Error("Consecutive slashes (//) are not allowed");
    }
  
    // Check for path traversal sequences (..)
    if (path.includes("..")) {
      throw new Error("Path traversal sequences (..) are not allowed");
    }
  
    // Check for control characters (ASCII 0-31 and 127)
    for (let i = 0; i < path.length; i++) {
      const code = path.charCodeAt(i);
      if (code <= 31 || code === 127) {
        throw new Error("Control characters are not allowed in paths");
      }
    }
  
    // Check for allowed characters: alphanumeric, /, _, -, .
    if (!/^[a-zA-Z0-9\/_\-\.]*$/.test(path)) {
      throw new Error(
        "Path must contain only alphanumeric characters, single slashes, underscores (_), hyphens (-), or periods (.)"
      );
    }
  
    // Check for invalid filesystem characters
    const invalidChars = ["<", ">", ":", '"', "\\", "|", "?", "*"];
    for (let i = 0; i < path.length; i++) {
      if (invalidChars.includes(path[i])) {
        throw new Error(
          'Path contains invalid filesystem characters (<, >, :, ", \\, |, ?, *)'
        );
      }
    }
  
  
    // Check path component length (max 255 bytes)
    const components = path.split("/").filter((c) => c.length > 0);
    for (const component of components) {
      if (new TextEncoder().encode(component).length > 255) {
        throw new Error("Path component exceeds 255 bytes");
      }
    }
  
    // Check total path length (max 4096 bytes)
    if (new TextEncoder().encode(path).length > 4096) {
      throw new Error("Total path length exceeds 4096 bytes");
    }

  }