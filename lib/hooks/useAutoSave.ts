import { useEffect, useRef, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface UseAutoSaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<void>;
  delay?: number;
  enabled?: boolean;
}

export function useAutoSave<T>({
  data,
  onSave,
  delay = 2000,
  enabled = true,
}: UseAutoSaveOptions<T>) {
  const debouncedData = useDebounce(data, delay);
  const isFirstRun = useRef(true);
  const isSaving = useRef(false);

  const save = useCallback(async () => {
    if (!enabled || isSaving.current) return;

    isSaving.current = true;
    try {
      await onSave(debouncedData);
    } catch (error) {
      console.error('Auto-save failed:', error);
    } finally {
      isSaving.current = false;
    }
  }, [debouncedData, onSave, enabled]);

  useEffect(() => {
    // Skip the first run to avoid saving on mount
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    save();
  }, [save]);

  return { isSaving: isSaving.current };
}
