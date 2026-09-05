/**
 * useApi.js — Generic data-fetching hook
 *
 * Usage:
 *   const { data, loading, error, refetch } = useApi(() => blogsAPI.getPublic({ page: 1 }));
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export function useApi(apiFn, deps = [], { immediate = true } = {}) {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error,   setError]   = useState(null);
  const abortRef = useRef(null);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFn(...args);
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    if (immediate) execute();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [execute]);

  return { data, loading, error, refetch: execute };
}

/**
 * useMutation — for POST/PATCH/DELETE operations
 *
 * Usage:
 *   const { mutate, loading, error } = useMutation((data) => contactAPI.submit(data));
 *   await mutate(formData);
 */
export function useMutation(apiFn) {
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [data,    setData]    = useState(null);

  const mutate = useCallback(async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFn(...args);
      setData(res.data);
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Something went wrong';
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFn]);

  return { mutate, loading, error, data };
}
