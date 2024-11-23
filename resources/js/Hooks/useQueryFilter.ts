import { router } from "@inertiajs/react";

export function useQueryFilter() {
  const updateQueryParam = (key: string, value: string) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set(key, value);
    } else {
      url.searchParams.delete(key);
    }
    router.get(
      url.pathname + url.search,
      {},
      {
        preserveState: true,
        preserveScroll: true,
        replace: true,
      },
    );
  };

  return { updateQueryParam };
}
