
export function checkPhone(phone: string, format = '', str: string = '手机号') {
  phone = String(phone);

  if (!phone) {
    return `请输入${format}${str}`;
  }

  if (phone.length > 11) {
    return `输入的${format}${str}最多填写11位`;
  }

  const reg = /^1[3-9]\d{9}$/;

  if (!reg.test(phone)) {
    return `${format}${str}格式不正确`;
  }

  return '';
}

export function checkSmsCode(code: string) {
  code = String(code);

  if (!code || !code.trim()) {
    return '请输入验证码';
  }

  if (code.length > 6) {
    return '验证码最多填写6位数字';
  }

  const reg = /^[0-9]{1,6}$/;

  if (!reg.test(code)) {
    return '验证码必须为数字';
  }

  if (code.length !== 6) {
    return '验证码长度为6位数字';
  }

  return '';
}

export function checkEmail(emailStr: string, format = '') {
  if (!emailStr || !emailStr.trim()) {
    return `请输入${format}邮箱`;
  }

  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;

  if (!reg.test(emailStr)) {
    return `${format}邮箱格式不正确`;
  }

  return '';
}

export function checkSSNId(id: string, format = '', str: string = '身份证号') {
  if (!id || !id.trim()) {
    return `请输入${format}${str}`;
  }

  if (!isValidID(id)) {
    return `${format}${str}格式不正确`;
  }

  return '';
}

export function checkPass(pass: string, format = '') {
  if (!pass || !pass.trim()) {
    return `请输入${format}密码`;
  }

  if (pass.length < 6) {
    return `${format}密码最少6位`;
  }

  if (pass.length > 20) {
    return `${format}密码最多20位`;
  }

  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/;

  if (!reg.test(pass)) {
    return `${format}密码必须包含字母和数字`;
  }

  return '';
}

/** 校验小数或整数 */
export function checkNumber(val: string, format: string, digit: number) {
  if (!val || !val.trim()) {
    return `请输入${format}`;
  }

  let decimalRegex = /^\d+(\.\d)?$/;

  // 校验整数
  // 校验小数（包括整数）
  if (digit === 1) {
    decimalRegex = /^\d+(\.\d)?$/;
  } else if (digit === 2) {
    decimalRegex = /^\d+(\.\d\d?)?$/;
  } else if (digit === 3) {
    decimalRegex = /^\d+(\.\d\d?\d?)?$/;
  }

  if (!decimalRegex.test(val)) {
    return `${format}必须是有效的整数或保留${digit}位小数`;
  }

  return '';
}

/** 校验小数或整数 */
export function checkDigit(val: string, format: string) {
  if (!val || !val.trim()) {
    return `请输入${format}`;
  }

  // 整数（可以0开头）
  let decimalRegex = /^\d+$/;

  if (!decimalRegex.test(val)) {
    return `${format}必须是有效的数字`;
  }

  return '';
}

/** 校验整数 */
export function checkInterge(val: string) {
  if (!val || !val.trim()) {
    return '请输入整数';
  }

  if (!/^\d+$/.test(val)) {
    return '请输入有效的整数';
  }

  return '';
}

/** 校验社会信用代码 */
export function checkSCCode(scCode: string, format = '') {
  if (!scCode || !scCode.trim()) {
    return `请输入${format}统一社会信用代码`;
  }

  if (scCode.length !== 18) {
    return `${format}统一社会信用代码长度为18位`;
  }

  return '';
}

export function checkUserNames(name: string, str: string = '用户名称') {
  if (!name || !name.trim()) {
    return `请输入${str}`;
  }

  if (name.length > 20) {
    return '请输入不超过20个字符';
  }

  return '';
}

/** 只能输入正数，小数点后最多保留两位小数 */
export function formatMoney(val) {
  const regex = /^\d+(\.\d{1,2})?$/;

  if (!regex.test(val)) {
    return '请输入正数，并且小数点后不得超过两位';
  }
  return '';
}

export function formatPayNumber(val) {
  console.log('val', val);
  const str = String(val);

  // 匹配数字（包括负数和小数）
  const numMatch = str.match(/-?\d+\.?\d*/);

  if (!numMatch) return '0';

  let num = parseFloat(numMatch[0]);

  if (isNaN(num)) return '0';

  // 格式化为两位小数
  return String(num.toFixed(2)) as any;
}

function isValidID(id) {
  // 18位身份证号码正则表达式
  const regex18 = /^[1-9]\d{5}(18|19|20|21|22)?\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}(\d|[Xx])$/;

  // 15位老身份证号码正则表达式
  const regex15 = /^[1-9]\d{5}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])\d{3}$/;

  return regex18.test(id) || regex15.test(id);
}
