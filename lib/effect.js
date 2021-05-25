/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:05:18
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-11 10:09:02
 * @Description: 副作用函数
 */

import global from './globalVariable'
let uid = 0
const effectStack = []

export function effect(fn, options) {
  const effect = createReactiveEffect(fn, options)

  if (!options.lazy) {
    effect()
  }

  return effect
}

function createReactiveEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        global.activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        global.activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }

  effect.id = uid++
  effect.raw = fn
  effect.options = options

  return effect
}
