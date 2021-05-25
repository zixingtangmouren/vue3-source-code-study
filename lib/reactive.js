/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:04:08
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:40:36
 * @Description: 响应式核心
 */

import global from './globalVariable'

function getter(target, key, receiver) {
  const res = Reflect.get(target, key, receiver)
  track(target, key)

  if (typeof res === 'object') {
    return reactive(res)
  }

  return res
}

export function track(target, key) {
  if (global.activeEffect === undefined) {
    return
  }
  let depsMap = global.targetMap.get(target)

  if (!depsMap) {
    global.targetMap.set(target, (depsMap = new Map()))
  }
  let dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }

  if (!dep.has(global.activeEffect)) {
    dep.add(global.activeEffect)
    // global.activeEffect.deps.push(dep);
  }
}

function setter(target, key, value, receiver) {
  const res = Reflect.set(target, key, value, receiver)
  trigger(target, key)
  return res
}

export function trigger(target, key) {
  const depsMap = global.targetMap.get(target)
  if (!depsMap) return

  const dep = depsMap.get(key)

  dep.forEach(effect => {
    // 如果effect存在一个调度的机制，就使用这个调度去执行
    // 这里涉及到后面要说异步队列机制，计算属性等等
    if (effect.options.scheduler) {
      effect.options.scheduler(effect)
    } else {
      // 直接执行这个`effect`
      effect()
    }
  })
}

const handler = {
  get: getter,
  set: setter,
}

function createReactive(target) {
  return new Proxy(target, handler)
}

export function reactive(target) {
  if (typeof target !== 'object') return target

  return createReactive(target)
}
