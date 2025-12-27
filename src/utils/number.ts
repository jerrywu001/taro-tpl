/**
 * 处理数字，保留指定位数的小数
 * @param num 要处理的数字
 * @param decimal 保留的小数位数，默认2位
 */
export function formatNumber(num: number, decimal = 2): number {
  return Number((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal));
}

/**
 * 安全的数字相加（避免浮点数精度问题）
 * @param numbers 要相加的数字数组
 */
export function safeAdd(numbers: number[]): number {
  // 将所有数字乘以100，转为整数计算，避免浮点数精度问题
  const sum = numbers.reduce((total, num) => {
    return total + Math.round(num * 100);
  }, 0);

  // 除以100，恢复小数点位置，并保留两位小数
  return formatNumber(sum / 100);
}
