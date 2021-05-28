<template>
  <div class="flex flex-wrap space-y-4 mt-4">
    <div class="w-full flex flex-wrap justify-between align-middle">
      <div class="w-1/2 text-2xl font-semibold self-center">จัดการร้านค้า</div>
      <button
        class="bg-primary-1 text-white flex justify-center align-middle space-x-2 rounded-md p-2"
        @click="createShop"
      >
        <plus-icon size="1.5x" class="custom-class"></plus-icon>
        <div>เพิ่มร้านค้า</div>
      </button>
    </div>
    <div class="w-full overflow-x-scroll">
      <table class="w-full table-auto border-collapse">
        <thead>
          <tr class="">
            <th v-for="(col, idh) in tableColumn" :key="idh">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="shopList.length === 0">
            <td colspan="4" class="text-center">ไม่พบข้อมูล</td>
          </tr>
          <template v-for="(row, idb) in shopList">
            <tr :key="idb">
              <td>{{ row.name }}</td>
              <td>{{ row.phonenumber }}</td>
              <td>{{ row.address }}</td>
              <td>{{ row.detail }}</td>
              <td>
                <div
                  class="flex flex-wrap justify-center space-x-2 align-middle"
                >
                  <button
                    v-tippy="{
                      arrow: true,
                      arrowType: 'round',
                      placement: 'top',
                      content: 'รายละเอียด',
                    }"
                    class="rounded-full bg-yellow-500 hover:bg-yellow-800 text-white p-2"
                    @click="onViewDetail(row._id)"
                  >
                    <list-icon size="1.0x" class="custom-class"></list-icon>
                  </button>
                  <button
                    v-tippy="{
                      arrow: true,
                      arrowType: 'round',
                      placement: 'top',
                      content: 'แก้ไข',
                    }"
                    class="rounded-full bg-blue-500 hover:bg-blue-800 text-white p-2"
                    @click="editShop(row)"
                  >
                    <edit-icon size="1.0x" class="custom-class"></edit-icon>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <ModalShopManage
      :is-open="isOpen"
      :mode="manageMode"
      :shop-detail="formDetail"
      @onClose="isOpen = false"
      @reloadList="fetchAllShop"
    />
  </div>
</template>

<script>
import ModalShopManage from '@/components/shop/ModalShopManage'
export default {
  name: 'ShopManage',
  components: { ModalShopManage },
  layout: 'dashboard',
  data() {
    return {
      tableColumn: [
        { label: 'ชื่อร้าน', field: 'name' },
        { label: 'เบอร์โทร', field: 'phonenumber' },
        { label: 'ที่อยู่', field: 'address' },
        { label: 'รายละเอียด', field: 'detail' },
        { label: 'จัดการ', field: 'action' },
      ],
      shopList: [],
      manageMode: 'create',
      formDetail: {},
      isOpen: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchAllShop()
    })
  },
  methods: {
    async fetchAllShop() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$axios.get('/shop')
        if (res.status === 200) {
          this.shopList = [...res.data]
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
    createShop() {
      this.manageMode = 'create'
      this.isOpen = true
      this.$cash('#modal-shop-manage').modal('show')
    },
    editShop(detail) {
      this.formDetail = { ...detail }
      this.manageMode = 'edit'
      this.isOpen = true
      this.$cash('#modal-shop-manage').modal('show')
    },
    onViewDetail(shopId) {
      this.$router.push(`/shopDetail/${shopId}`)
    },
  },
}
</script>

<style lang="postcss">
table,
th,
td {
  @apply border border-gray-400;
}

tr {
  th {
    @apply whitespace-nowrap text-center bg-theme-7 p-3;
  }
  td {
    @apply p-3;
  }
}

tbody {
  tr:nth-child(even) {
    @apply bg-gray-300;
  }
}
</style>
