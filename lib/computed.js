/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:04:14
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:41:11
 * @Description: 计算属性
 */

import { effect } from './effect'

import { track, trigger } from './reactive'

export function computed(options) {
  let _getter
  let _setter
  let _computed
  let _value
  let _dirty = true

  if (typeof options === 'function') {
    _getter = options
    _setter = () => {
      console.warn('computed _ is readonly')
    }
  } else {
    _getter = options.get
    _setter = options.set
  }

  let runner = effect(_getter, {
    lazy: true,
    scheduler: () => {
      if (!_dirty) {
        _dirty = true
        trigger(_computed, 'value')
      }
    },
  })

  _computed = {
    get value() {
      // 如果数据是脏才重新计算
      if (_dirty) {
        _value = runner()
        _dirty = false
      }
      track(_computed, 'value')
      return _value
    },
    set value(newValue) {
      return _setter(newValue)
    },
  }

  return _computed
}
