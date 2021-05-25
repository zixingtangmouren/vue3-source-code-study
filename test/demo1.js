/**
 * @Author: tangzhicheng
 * @Date: 2021-05-11 09:44:40
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-11 09:48:37
 * @Description: file content
 */

const {
  Vue,
  reactive,
  watch,
  effect,
  queueJob,
} = require('../lib/index')


const vm = new Vue({
  setup() {
    const state = reactive({
      num: 100,
    })

    watch(() => state.num, (newVal, oldVal) => {
      console.log('触发监听器', newVal, oldVal)
    })

    return {
      state
    }
  }
})

// 模拟组件挂载时生成的渲染effect
effect(
  function componentEffect() {
    // 模拟渲染过程中，访问值
    console.log(vm.ctx.state.num)
    console.log('渲染组件')
  }, {
    lazy: false,
    scheduler: queueJob
  }
)

vm.ctx.state.num = 200