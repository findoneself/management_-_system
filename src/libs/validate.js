/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 用户名
 * @param {*} s
 */
export function isName (s) {
  return /^[a-zA-z][a-zA-Z0-9_]*$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(s)
}

/**
 * 电话号码
 * @param {*} s
 */
export function isTelephone (s) {
  return /^([0-9]{3,4}-)?[0-9]{5,8}$/.test(s)
}

/**
 * 联系电话：座机号或者手机号
 * @param {*} s
 */
export function isPhone (s) {
  return isTelephone(s) || isMobile(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}