export const env = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string | undefined,
  };
  
  if (!env.apiBaseUrl) {
    // Fail fast so you don’t silently call “undefined/auth/login”
    // eslint-disable-next-line no-console
    console.error("Missing VITE_API_BASE_URL. Add it to .env.local");
  }
  