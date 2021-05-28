<template>
  <div>
    <!-- <DarkModeSwitcher /> -->
    <MobileMenu />
    <TopBar />
    <div class="wrapper">
      <div class="wrapper-box">
        <!-- BEGIN: Side Menu -->
        <nav class="side-nav">
          <ul>
            <!-- BEGIN: First Child -->
            <template v-for="(menu, menuKey) in formattedMenu">
              <li
                v-if="menu == 'devider'"
                :key="menu + menuKey"
                class="side-nav__devider my-6"
              ></li>
              <li v-else :key="menu + menuKey">
                <a
                  :ref="`menu-${menuKey}`"
                  v-tippy="{
                    arrow: true,
                    arrowType: 'round',
                    placement: 'right',
                  }"
                  :content="menu.title"
                  class="side-menu cursor-pointer focus:outline-none"
                  :class="{
                    'side-menu--active': menu.active,
                    'side-menu--open': menu.activeDropdown,
                  }"
                  @click="linkTo(menu, router, $event)"
                >
                  <div class="side-menu__icon">
                    <component :is="menu.icon" />
                  </div>
                  <div class="side-menu__title">
                    {{ menu.title }}
                    <div
                      v-if="menu.subMenu"
                      class="side-menu__sub-icon"
                      :class="{ 'transform rotate-180': menu.activeDropdown }"
                    >
                      <ChevronDownIcon />
                    </div>
                  </div>
                </a>
                <!-- BEGIN: Second Child -->
                <transition @enter="enter" @leave="leave">
                  <ul v-if="menu.subMenu && menu.activeDropdown">
                    <li
                      v-for="(subMenu, subMenuKey) in menu.subMenu"
                      :key="subMenuKey"
                      class="cursor-pointer"
                    >
                      <a
                        v-tippy="{
                          arrow: true,
                          arrowType: 'round',
                          placement: 'right',
                        }"
                        class="side-menu focus:outline-none"
                        :class="{
                          'side-menu--active': subMenu.active,
                          'side-menu--open': subMenu.activeDropdown,
                        }"
                        :content="subMenu.title"
                        @click="linkTo(subMenu, router, $event)"
                      >
                        <div class="side-menu__icon">
                          <ActivityIcon />
                        </div>
                        <div class="side-menu__title">
                          {{ subMenu.title }}
                          <div
                            v-if="subMenu.subMenu"
                            class="side-menu__sub-icon"
                            :class="{
                              'transform rotate-180': subMenu.activeDropdown,
                            }"
                          >
                            <ChevronDownIcon />
                          </div>
                        </div>
                      </a>
                      <!-- BEGIN: Third Child -->
                      <transition @enter="enter" @leave="leave">
                        <ul
                          v-if="subMenu.subMenu && subMenu.activeDropdown"
                          class="block"
                        >
                          <li
                            v-for="(
                              lastSubMenu, lastSubMenuKey
                            ) in subMenu.subMenu"
                            :key="lastSubMenuKey"
                            class="cursor-pointer"
                          >
                            <a
                              v-tippy="{
                                arrow: true,
                                arrowType: 'round',
                                placement: 'right',
                              }"
                              class="side-menu focus:outline-none"
                              :class="{
                                'side-menu--active': lastSubMenu.active,
                              }"
                              @click="linkTo(lastSubMenu, router, $event)"
                            >
                              <div class="side-menu__icon">
                                <ZapIcon />
                              </div>
                              <div class="side-menu__title">
                                {{ lastSubMenu.title }}
                              </div>
                            </a>
                          </li>
                        </ul>
                      </transition>
                      <!-- END: Third Child -->
                    </li>
                  </ul>
                </transition>
                <!-- END: Second Child -->
              </li>
            </template>
            <!-- END: First Child -->
          </ul>
        </nav>
        <!-- END: Side Menu -->
        <!-- BEGIN: Content -->
        <div class="content">
          <nuxt />
        </div>
        <!-- END: Content -->
      </div>
    </div>
    <!-- </client-only> -->
  </div>
</template>

<script>
import { linkTo, nestedMenu } from '@/utils/layout'
import { helper as $h } from '@/utils/helper'
import TopBar from '@/components/core/TopBar'
import MobileMenu from '@/components/core/MobileMenu'
export default {
  components: {
    TopBar,
    MobileMenu,
  },
  data() {
    return { formattedMenu: '' }
  },
  watch: {
    $route() {
      this.formattedMenu = $h.toRaw(this.sideMenu())
    },
  },
  mounted() {
    document.body.classList.add('main')
    document.body.classList.remove('error-page')
    document.body.classList.remove('login')
    this.formattedMenu = $h.toRaw(this.sideMenu())
    // this.$nextTick(() => {
    //   console.log(this.$refs)
    //   console.log(this.$refs['menu-1'])
    // })
  },
  methods: {
    sideMenu() {
      return nestedMenu(this.$store.state.menu.menu, this.$router.currentRoute)
    },
    linkTo,
    enter(el, done) {
      return this.$velocity(
        el,
        'slideDown',
        { duration: 300 },
        { complete: done }
      )
    },
    leave(el, done) {
      return this.$velocity(
        el,
        'slideUp',
        { duration: 300 },
        { complete: done }
      )
    },
    router() {
      return this.$nuxt.$router
    },
  },
}
</script>

<style></style>
