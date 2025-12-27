import { ref, onUnmounted } from 'vue';

/**
 * 节流 Hook
 * @param fn 需要节流的函数
 * @param delay 节流时间间隔（毫秒），默认 600ms
 * @returns 返回一个对象，包含节流后的执行函数和重置函数
 * @example
 * ```ts
 * const { run, reset } = useThrottle(async () => {
 *   await submitForm();
 * }, 1000);
 *
 * // 使用
 * run();
 *
 * // 重置节流状态（允许立即执行）
 * reset();
 * ```
 */
export function useThrottle<T extends (...args: any[]) => any>(
  fn: T,
  delay = 600,
) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastExecuteTime = 0;
  const isThrottled = ref(false);

  /**
   * 节流执行函数
   */
  const run = function(...args: Parameters<T>) {
    const now = Date.now();

    // 如果在节流期内，直接返回
    if (isThrottled.value) {
      return;
    }

    // 如果距离上次执行时间小于延迟时间，则等待
    const timeSinceLastExecute = now - lastExecuteTime;

    if (timeSinceLastExecute < delay) {
      return;
    }

    // 标记为节流中
    isThrottled.value = true;
    lastExecuteTime = now;

    // 执行函数
    const result = fn(...args);

    // 如果是 Promise，等待执行完成后再解除节流
    if (result instanceof Promise) {
      result.finally(() => {
        timer = setTimeout(() => {
          isThrottled.value = false;
          timer = null;
        }, delay);
      });
    } else {
      // 同步函数，延迟后解除节流
      timer = setTimeout(() => {
        isThrottled.value = false;
        timer = null;
      }, delay);
    }

    return result;
  };

  /**
   * 重置节流状态（允许立即执行）
   */
  const reset = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    isThrottled.value = false;
    lastExecuteTime = 0;
  };

  // 组件卸载时自动清理
  onUnmounted(() => {
    reset();
  });

  return {
    run,
    reset,
    isThrottled,
  };
}
