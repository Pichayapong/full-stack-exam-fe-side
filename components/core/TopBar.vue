<template>
  <!-- BEGIN: Top Bar -->
  <div
    class="top-bar-boxed border-b border-theme-2 -mt-7 md:-mt-5 -mx-3 sm:-mx-8 px-3 sm:px-8 md:pt-0 mb-12"
  >
    <div class="h-full flex items-center">
      <!-- BEGIN: Logo -->
      <a href="" class="-intro-x hidden md:flex">
        <img
          alt="Icewall Tailwind HTML Admin Template"
          class="w-6"
          src="@/assets/images/logo.svg"
        />
        <span class="text-white text-lg ml-3">
          Admin<span class="font-medium"> Vega</span>
        </span>
      </a>
      <!-- END: Logo -->
      <!-- BEGIN: Breadcrumb -->
      <div class="-intro-x breadcrumb mr-auto">
        <!-- <a href="">Application</a>
        <ChevronRightIcon class="breadcrumb__icon" />
        <a href="" class="breadcrumb--active">Dashboard</a> -->
      </div>
      <!-- END: Breadcrumb -->
      <!-- BEGIN: Search -->

      <!-- END: Search -->
      <!-- BEGIN: Notifications -->

      <!-- END: Notifications -->
      <!-- BEGIN: Account Menu -->
      <div class="intro-x dropdown w-8 h-8">
        <div
          class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in scale-110"
          role="button"
          aria-expanded="true"
        >
          <img
            alt="Icewall Tailwind HTML Admin Template"
            :src="require(`@/assets/images/profile-10.jpg`)"
          />
        </div>
        <div class="dropdown-menu w-56">
          <div
            class="dropdown-menu__content box bg-theme-11 dark:bg-dark-6 text-white"
          >
            <div class="p-4 border-b border-theme-12 dark:border-dark-3">
              <div class="font-medium">ยินดีต้อนรับ</div>
              <div class="text-xs text-theme-13 mt-0.5 dark:text-gray-600">
                Admin Name
              </div>
            </div>
            <!-- <div class="p-2">
              <a
                href="#"
                class="flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                @click="wowowo"
              >
                <UserIcon class="w-4 h-4 mr-2" /> Profile
              </a>
              <a
                href=""
                class="flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
              >
                <EditIcon class="w-4 h-4 mr-2" /> Add Account
              </a>
              <a
                href=""
                class="flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
              >
                <LockIcon class="w-4 h-4 mr-2" /> Reset Password
              </a>
              <a
                href=""
                class="flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
              >
                <HelpCircleIcon class="w-4 h-4 mr-2" /> Help
              </a>
            </div> -->
            <div class="p-2 border-t border-theme-12 dark:border-dark-3">
              <a
                class="flex items-center p-2 transition duration-300 ease-in-out hover:bg-theme-1 dark:hover:bg-dark-3 rounded-md"
                @click="onLogout"
              >
                <ToggleRightIcon class="w-4 h-4 mr-2" /> Logout
              </a>
            </div>
          </div>
        </div>
      </div>
      <!-- END: Account Menu -->
    </div>
  </div>
  <!-- END: Top Bar -->
</template>

<script>
export default {
  data() {
    return {
      searchDropdown: false,
    }
  },
  methods: {
    onLogout() {
      console.log('logout')
    },
    showSearchDropdown() {
      this.searchDropdown = true
    },
    hideSearchDropdown() {
      this.searchDropdown = false
    },
    wowowo() {
      console.log('1')
    },
  },
}
</script>
