/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:04:29
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:42:50
 * @Description: 监听器
 */

import { effect } from './effect'
import { queueJob } from './nextTick'

export function watch(getter, callback) {
  if (typeof getter !== 'function') {
    return
  }

  let _getter = getter
  let oldValue

  function handler() {
    const newValue = getter()
    callback(newValue, oldValue)
    oldValue = newValue
  }

  const runner = effect(_getter, {
    lazy: true,
    scheduler: () => {
      queueJob(handler)
    },
  })

  oldValue = runner()
}
