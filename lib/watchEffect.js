/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:04:39
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:42:42
 * @Description: file content
 */

export function watchEffect(cb) {
  return effect(cb, {
    lazy: false,
    scheduler: queueJob,
  })
}
