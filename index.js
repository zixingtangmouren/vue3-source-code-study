/**
 * @Author: tangzhicheng
 * @Date: 2021-05-10 16:27:58
 * @LastEditors: tangzhicheng
 * @LastEditTime: 2021-05-15 14:57:08
 * @Description: 测试案例
 */

/**
 * 欢迎前端爱好者 前来交流 wx:tzc241241
 */

const {
  Vue,
  reactive,
  watch,
  computed,
  effect,
  queueJob,
  watchEffect,
} = require('./lib/index')

const vm = new Vue({
  setup() {
    const state = reactive({
      num: 100,
      person: {
        a: 1,
      },
    })

    const doubleNum = computed(() => state.num * 2)

    watch(
      () => state.num,
      (newVal, oldVal) => {
        console.log('触发监听器', newVal, oldVal)
      }
    )

    watchEffect(() => {
      console.log('watchEffect', state.num)
    })

    return {
      state,
      doubleNum,
    }
  },
})

// 模拟组件挂载时生成的渲染effect
effect(
  function componentEffect() {
    // 模拟渲染过程中，访问值
    console.log(vm.ctx.state.num)
    console.log(vm.ctx.state.person.a)
    console.log(vm.ctx.doubleNum.value)
    console.log('渲染组件')
  },
  {
    lazy: false,
    scheduler: queueJob,
  }
)

while (vm.ctx.state.person.a <= 100) {
  vm.ctx.state.person.a++
}

while (vm.ctx.state.num <= 200) {
  vm.ctx.state.num++
}
