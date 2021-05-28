<template>
  <div>
    <div class="container sm:px-10">
      <div class="block">
        <div class="h-screen flex">
          <div
            class="my-auto mx-auto bg-white dark:bg-dark-1 px-5 sm:px-8 py-8 rounded-md shadow-md w-full sm:w-3/4 lg:w-2/4 xl:w-1/4"
          >
            <h2 class="intro-x font-bold text-2xl text-center">Login Admin</h2>
            <div class="intro-x mt-8">
              <input
                v-model="username"
                type="text"
                class="intro-x login__input form-control py-3 px-4 border-gray-300 block"
                placeholder="Username"
                autocomplete="off"
              />
              <!-- <themplate v-if="errors.username">
                <div class="text-theme-6 mt-2 text-left">
                  {{ errors.username }}
                </div>
              </themplate> -->
              <input
                v-model="password"
                type="password"
                class="intro-x login__input form-control py-3 px-4 border-gray-300 block mt-4"
                placeholder="Password"
                autocomplete="off"
              />
              <!-- <themplate v-if="errors.password">
                <div class="text-theme-6 mt-2 text-left">
                  {{ errors.password }}
                </div>
              </themplate> -->
            </div>

            <div class="intro-x mt-5 text-center">
              <button
                class="btn btn-primary py-3 px-4 w-full align-top"
                @click="onLogin"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  middleware: 'noAuthenticated',
  data() {
    return {
      username: 'adminVega',
      password: 'Aa123456*',
    }
  },
  mounted() {
    document.body.classList.remove('main')
    document.body.classList.remove('error-page')
    document.body.classList.remove('login')
  },
  methods: {
    async onLogin() {
      try {
        this.$nuxt.$loading.start()
        const param = {
          username: this.username,
          password: this.password,
        }
        await this.$auth.loginWith('local', { data: param })
      } catch (error) {
        console.log(error)
        this.$swal('ผิดพลาด', 'กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน', 'error')
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>
