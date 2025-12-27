import { ref, onBeforeUnmount } from 'vue';

/**
 * 延迟执行任务 Hook
 * 自动管理定时器生命周期，防止内存泄漏
 * @returns 返回一个对象，包含延迟执行函数
 * @example
 * ```ts
 * const { scheduleTask } = useScheduleTask();
 *
 * // 延迟 500ms 执行任务
 * scheduleTask(() => {
 *   console.log('执行任务');
 * }, 500);
 *
 * // 组件卸载时会自动清理所有待执行的定时器
 * ```
 */
export function useScheduleTask() {
  const pendingTimeouts = ref<number[]>([]);

  /**
   * 延迟执行任务，自动管理定时器生命周期
   * @param fn 要执行的函数
   * @param delay 延迟时间（毫秒）
   */
  function scheduleTask(fn: () => void, delay: number) {
    const timeoutId = setTimeout(fn, delay) as unknown as number;

    pendingTimeouts.value.push(timeoutId);
  }

  /**
   * 手动清理所有待执行的定时器
   */
  function clearAllTasks() {
    pendingTimeouts.value.forEach((id) => clearTimeout(id));
    pendingTimeouts.value = [];
  }

  // 组件卸载时自动清理
  onBeforeUnmount(() => {
    clearAllTasks();
  });

  return {
    scheduleTask,
    clearAllTasks,
  };
}
