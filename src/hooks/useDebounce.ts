import { ref, onUnmounted } from 'vue';

/**
 * 防抖 Hook
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒），默认 300ms
 * @returns 返回一个对象，包含防抖后的执行函数和取消函数
 * @example
 * ```ts
 * const { run, cancel } = useDebounce(async (keyword: string) => {
 *   await searchData(keyword);
 * }, 500);
 *
 * // 使用
 * run('搜索关键词');
 *
 * // 如需取消
 * cancel();
 * ```
 */
export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay = 300,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const isExecuting = ref(false);

  /**
   * 防抖执行函数
   */
  const run = function(...args: Parameters<T>) {
    // 取消上一次的定时器
    if (timer) {
      clearTimeout(timer);
    }

    // 延迟执行
    timer = setTimeout(async () => {
      isExecuting.value = true;
      try {
        await fn(...args);
      } finally {
        isExecuting.value = false;
        timer = null;
      }
    }, delay);
  };

  /**
   * 取消防抖
   */
  const cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
      isExecuting.value = false;
    }
  };

  // 组件卸载时自动清理
  onUnmounted(() => {
    cancel();
  });

  return {
    run,
    cancel,
    isExecuting,
  };
}
