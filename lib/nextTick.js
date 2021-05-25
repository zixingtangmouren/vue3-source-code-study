/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:04:20
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:41:35
 * @Description: 异步队列机制
 */

const queue = []

let currentFlushPromise

let isFlushPending = false
let isFlushing = false

export function queueJob(job) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

function queueFlush() {
  if (!isFlushPending && !isFlushing) {
    isFlushPending = true
    currentFlushPromise = Promise.resolve().then(flushJobs)
  }
}

function flushJobs() {
  isFlushPending = false
  isFlushing = true
  queue.forEach(job => job())
  isFlushing = false
}

export function nextTick(job) {
  queueJob(job)
}
