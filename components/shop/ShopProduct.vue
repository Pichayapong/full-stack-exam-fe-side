<template>
  <div class="w-full space-y-4">
    <div class="w-full flex flex-wrap justify-between align-middle">
      <div class="w-1/2 text-xl font-semibold self-center">รายการสินค้า</div>
      <button
        class="bg-primary-1 text-white flex justify-center align-middle space-x-2 rounded-md p-2"
        @click="addProduct"
      >
        <plus-icon size="1.5x" class="custom-class"></plus-icon>
        <div>เพิ่มสินค้า</div>
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
          <tr v-if="productList.length === 0">
            <td colspan="6" class="text-center">ไม่พบข้อมูล</td>
          </tr>
          <template v-for="(row, idb) in productList">
            <tr :key="idb">
              <td>{{ row.name }}</td>
              <td>{{ getCategory(row.category_id) }}</td>
              <td>{{ row.detail }}</td>
              <td>{{ formatCurrency(row.price) }}</td>
              <td>{{ formatUnit(row.unit) }}</td>
              <td>
                <div
                  class="flex flex-wrap justify-center space-x-2 align-middle"
                >
                  <button
                    v-tippy="{
                      arrow: true,
                      arrowType: 'round',
                      placement: 'top',
                      content: 'แก้ไข',
                    }"
                    class="rounded-full bg-blue-500 hover:bg-blue-800 text-white p-2"
                    @click="editProduct(row)"
                  >
                    <edit-icon size="1.0x" class="custom-class"></edit-icon>
                  </button>
                  <button
                    v-tippy="{
                      arrow: true,
                      arrowType: 'round',
                      placement: 'top',
                      content: 'ลบสินค้า',
                    }"
                    class="rounded-full bg-red-500 hover:bg-red-800 text-white p-2"
                    @click="deleteProduct(row._id)"
                  >
                    <trash-2-icon
                      size="1.0x"
                      class="custom-class"
                    ></trash-2-icon>
                  </button>
                </div>
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <ModalProductManage
      :is-open="isModalProductOpen"
      :mode="modalMode"
      :product-detail="modalProductDetail"
      :category-list="categoryList"
      :shop-id="currentShopId"
      @onClose="isModalProductOpen = false"
      @reloadList="fetchShopProduct"
    />
  </div>
</template>

<script>
import { helper as $h } from '@/utils/helper'
import ModalProductManage from '@/components/product/ModalProductManage'
export default {
  name: 'ShopProduct',
  components: { ModalProductManage },
  props: {
    shopId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      tableColumn: [
        { label: 'ชื่อสินค้า', field: 'name' },
        { label: 'หมวดหมู่', field: 'category' },
        { label: 'รายละเอียด', field: 'detail' },
        { label: 'ราคา', field: 'price' },
        { label: 'จำนวนคงเหลือ', field: 'unit' },
        { label: 'จัดการ', field: 'action' },
      ],
      productList: [],
      categoryList: [],
      isModalProductOpen: false,
      modalMode: 'create',
      modalProductDetail: {},
      currentShopId: '',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchShopProduct()
      this.fetchAllCategory()
    })
  },
  methods: {
    async fetchShopProduct() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$axios.get(`/product/shop/${this.shopId}`)
        if (res.status === 200) {
          this.productList = [...res.data]
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
    async fetchAllCategory() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$axios.get('/category')
        if (res.status === 200) {
          this.categoryList = [...res.data]
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
    getCategory(categoryId) {
      const category = this.categoryList.filter((e) => e._id === categoryId)
      return category.length > 0 ? category[0].name : ''
    },
    formatCurrency(currency) {
      const formatedCurrency = $h.formatCurrency(currency)
      return formatedCurrency
    },
    formatUnit(unit) {
      return unit.toLocaleString('en')
    },
    deleteProduct(productId) {
      this.$swal
        .fire({
          title: 'ยืนยันการลบ',
          icon: 'warning',
          showCloseButton: false,
          showConfirmButton: true,
          showCancelButton: true,
          reverseButtons: true,
          confirmButtonColor: '#2D427B',
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            try {
              const res = await this.$axios.delete(`/product/${productId}`)
              if (res.status === 204) {
                this.fetchShopProduct()
                this.$swal.fire({
                  showConfirmButton: false,
                  icon: 'success',
                  title: 'บันทึกสำเร็จ',
                  timer: 3000,
                })
              }
            } catch (error) {
              this.$swal.fire({
                confirmButtonColor: 'bg-primary-1',
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
              })
            }
          }
        })
    },
    addProduct() {
      this.isModalProductOpen = true
      this.currentShopId = this.shopId
      this.modalMode = 'create'
      this.$cash('#modal-product-manage').modal('show')
    },
    editProduct(detail) {
      this.modalProductDetail = { ...detail }
      this.currentShopId = this.shopId
      this.isModalProductOpen = true
      this.modalMode = 'edit'
      this.$cash('#modal-product-manage').modal('show')
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
