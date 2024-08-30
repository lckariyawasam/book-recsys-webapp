// utils/redirectWithParams.ts
export function redirectWithParams(path: string, params: Record<string, any>) {
    const url = new URL(path, window.location.origin);
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, JSON.stringify(value));
    });
    window.location.href = url.toString();
  }
  