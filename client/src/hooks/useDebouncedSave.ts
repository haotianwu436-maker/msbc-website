/**
 * Generic Debounced Save Hook
 * Provides debounced save functionality for Admin panels
 */

import { useState, useRef, useCallback, useEffect } from "react";
import { toast } from "sonner";

interface UseDebouncedSaveOptions {
  delay?: number;
  onSave: (changes: any) => Promise<void>;
  isSupabase?: boolean;
}

export function useDebouncedSave<T extends Record<string, any>>({
  delay = 2000,
  onSave,
  isSupabase = false,
}: UseDebouncedSaveOptions) {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pendingChangesRef = useRef<Partial<T>>({});
  const [saving, setSaving] = useState(false);

  const debouncedSave = useCallback((changes: Partial<T>) => {
    // 清除之前的定时器
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // 累积所有更改
    pendingChangesRef.current = { ...pendingChangesRef.current, ...changes };

    // 如果是 localStorage，立即保存
    if (!isSupabase) {
      onSave(pendingChangesRef.current);
      pendingChangesRef.current = {};
      return;
    }

    // 如果是 Supabase，延迟保存（防抖）
    saveTimeoutRef.current = setTimeout(async () => {
      if (Object.keys(pendingChangesRef.current).length > 0) {
        try {
          setSaving(true);
          const changesToSave = { ...pendingChangesRef.current };
          pendingChangesRef.current = {};
          await onSave(changesToSave);
          toast.success("保存成功");
        } catch (error: any) {
          console.error("Failed to save:", error);
          const errorMessage = error?.message || error?.toString() || "未知错误";
          toast.error("保存失败", {
            description: errorMessage,
          });
        } finally {
          setSaving(false);
        }
      }
    }, delay);
  }, [delay, onSave, isSupabase]);

  // 立即保存（手动触发）
  const saveNow = useCallback(async () => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    if (Object.keys(pendingChangesRef.current).length > 0) {
      try {
        setSaving(true);
        const changesToSave = { ...pendingChangesRef.current };
        pendingChangesRef.current = {};
        await onSave(changesToSave);
        toast.success("保存成功");
      } catch (error: any) {
        console.error("Failed to save:", error);
        const errorMessage = error?.message || error?.toString() || "未知错误";
        toast.error("保存失败", {
          description: errorMessage,
        });
      } finally {
        setSaving(false);
      }
    } else {
      toast.info("没有更改需要保存");
    }
  }, [onSave]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  // 重置待处理的更改
  const resetPending = useCallback(() => {
    pendingChangesRef.current = {};
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
  }, []);

  return {
    debouncedSave,
    saveNow,
    resetPending,
    saving,
    hasPendingChanges: Object.keys(pendingChangesRef.current).length > 0,
  };
}
