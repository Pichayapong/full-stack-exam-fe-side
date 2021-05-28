<template>
  <div class="w-full space-y-4">
    <div class="w-full text-2xl rounded-md bg-yellow-200 p-4">
      <div>
        <span class="text-gray-600">ชื่อร้าน :</span>
        <span>{{ shopDetail.name || '' }}</span>
      </div>
      <div>
        <span class="text-gray-600">เบอร์โทร :</span>
        <span>{{ shopDetail.phonenumber || '-' }}</span>
      </div>
      <div>
        <span class="text-gray-600">ที่อยู่ :</span>
        <span>{{ shopDetail.address || '-' }}</span>
      </div>
      <div>
        <span class="text-gray-600">รายละเอียดร้านค้า :</span>
        <span>{{ shopDetail.detail || '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopDetail',
  props: {
    shopId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shopDetail: {},
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchShopDetail()
    })
  },
  methods: {
    async fetchShopDetail() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$axios.get(`/shop/${this.shopId}`)
        if (res.status === 200) {
          this.shopDetail = { ...res.data }
        }
      } catch (error) {
        console.log('error', error)
        this.$swal.fire({
          confirmButtonColor: 'bg-primary-1',
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
        })
      } finally {
        this.$nuxt.$loading.finish()
      }
    },
  },
}
</script>

<style></style>
