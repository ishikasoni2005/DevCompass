import { useEffect, useState } from "react";


export function useAsyncData(loader, deps = []) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    let active = true;

    async function run() {
      setLoading(true);
      setError("");
      try {
        const result = await loader();
        if (active) {
          setData(result);
        }
      } catch (caughtError) {
        if (active) {
          setError(caughtError?.response?.data?.detail || "Something went wrong.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      active = false;
    };
  }, deps);

  return { data, setData, error, loading };
}
