<template>
  <div class="flex flex-wrap space-y-4 mt-4">
    <div class="w-full text-2xl font-semibold self-center">สินค้าทั้งหมด</div>
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
            <td colspan="4" class="text-center">ไม่พบข้อมูล</td>
          </tr>
          <template v-for="(row, idb) in productList">
            <tr :key="idb">
              <td>{{ row.name }}</td>
              <td>{{ getCategory(row.category_id) }}</td>
              <td>{{ row.detail }}</td>
              <td>{{ formatCurrency(row.price) }}</td>
              <td>{{ formatUnit(row.unit) }}</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { helper as $h } from '@/utils/helper'
export default {
  name: 'ProductManage',
  layout: 'dashboard',
  data() {
    return {
      tableColumn: [
        { label: 'ชื่อสินค้า', field: 'name' },
        { label: 'หมวดหมู่', field: 'category' },
        { label: 'รายละเอียด', field: 'detail' },
        { label: 'ราคา', field: 'price' },
        { label: 'จำนวนคงเหลือ', field: 'unit' },
      ],
      productList: [],
      categoryList: [],
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchAllProduct()
      this.fetchAllCategory()
    })
  },
  methods: {
    async fetchAllProduct() {
      try {
        this.$nuxt.$loading.start()
        const res = await this.$axios.get(`/product`)
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
    formatCurrency(currency) {
      const formatedCurrency = $h.formatCurrency(currency)
      return formatedCurrency
    },
    formatUnit(unit) {
      return unit.toLocaleString('en')
    },
    getCategory(categoryId) {
      const category = this.categoryList.filter((e) => e._id === categoryId)
      return category.length > 0 ? category[0].name : ''
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
