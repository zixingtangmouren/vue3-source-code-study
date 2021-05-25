/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:01:24
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:46:22
 * @Description: 导出
 */

import { reactive } from './reactive'
import { watch } from './watch'
import { computed } from './computed'
import { effect } from './effect'
import { queueJob } from './nextTick'
import { watchEffect } from './watchEffect'

function Vue(options) {
  const { setup } = options
  const setupResult = setup()
  this.ctx = setupResult
}

export default {
  Vue,
  reactive,
  watch,
  computed,
  effect,
  queueJob,
  watchEffect,
}
