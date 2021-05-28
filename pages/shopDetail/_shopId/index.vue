<template>
  <div class="flex flex-wrap space-y-4 mt-4">
    <div class="w-full flex flex-wrap align-middle space-x-2">
      <button
        class="hover:bg-gray-400 p-2 rounded-full"
        @click="onBackArrowClick"
      >
        <arrow-left-icon size="1.5x" class="custom-class"></arrow-left-icon>
      </button>
      <div class="text-2xl font-semibold self-center">ข้อมูลร้านค้า</div>
    </div>
    <div class="w-full">
      <nav class="flex flex-col sm:flex-row justify-center">
        <button
          v-for="(tab, idx) in tabs"
          :key="idx"
          class="py-4 px-6 block hover:text-primary-1 focus:outline-none"
          :class="
            tabStatus === tab.status
              ? 'border-b-2 font-medium text-primary border-primary-1'
              : 'text-gray-600'
          "
          @click="onTabChange(tab.status)"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>
    <div class="w-full">
      <div class="w-full">
        <component :is="currentComponent" :shop-id="shopId"></component>
      </div>
    </div>
  </div>
</template>

<script>
import ShopDetail from '@/components/shop/ShopDetail'
import ShopProduct from '@/components/shop/ShopProduct'
export default {
  name: 'ShopDetail',
  layout: 'dashboard',
  asyncData({ params }) {
    const shopId = params.shopId
    return { shopId }
  },
  data() {
    return {
      shopId: null,
      tabStatus: 0,
      tabs: [
        { status: 0, label: 'รายละเอียดร้านค้า', component: ShopDetail },
        { status: 1, label: 'สินค้าภายในร้าน', component: ShopProduct },
      ],
    }
  },
  computed: {
    currentComponent() {
      const currentComponent = this.tabs.filter(
        (tab) => tab.status === this.tabStatus
      )[0].component
      return currentComponent
    },
  },
  methods: {
    onTabChange(status) {
      this.tabStatus = status
    },
    onBackArrowClick() {
      this.$router.push('/shop/ShopManage')
    },
  },
}
</script>

<style></style>
