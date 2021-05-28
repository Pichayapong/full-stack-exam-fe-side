<template>
  <div class="flex flex-wrap space-y-4 mt-4">
    <div class="w-full flex flex-wrap justify-between align-middle">
      <div class="w-1/2 text-2xl font-semibold self-center">จัดการหมวดหมู่</div>
      <button
        class="bg-primary-1 text-white flex justify-center align-middle space-x-2 rounded-md p-2"
        @click="createCategory"
      >
        <plus-icon size="1.5x" class="custom-class"></plus-icon>
        <div>เพิ่มหมวดหมู่</div>
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
          <tr v-if="categoryList.length === 0">
            <td colspan="3" class="text-center">ไม่พบข้อมูล</td>
          </tr>
          <template v-for="(row, idb) in categoryList">
            <tr :key="idb">
              <td>{{ row.name }}</td>
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
                      content: 'แก้ไข',
                    }"
                    class="rounded-full bg-blue-500 hover:bg-blue-800 text-white p-2"
                    @click="editCategory(row)"
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
    <ModalCategoryManage
      :is-open="isModalOpen"
      :edit-detail="editDetail"
      :mode="modalMode"
      @onClose="isModalOpen = false"
      @reloadList="fetchAllCategory"
    />
  </div>
</template>

<script>
import ModalCategoryManage from '@/components/category/ModalCategoryManage'
export default {
  name: 'CategoryManage',
  components: { ModalCategoryManage },
  layout: 'dashboard',
  data() {
    return {
      tableColumn: [
        { label: 'ชื่อหมวดหมู่', field: 'name' },
        { label: 'รายละเอียด', field: 'detail' },
        { label: 'จัดการ', field: 'action' },
      ],
      categoryList: [],
      isModalOpen: false,
      editDetail: {},
      modalMode: 'create',
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.fetchAllCategory()
    })
  },
  methods: {
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
    createCategory() {
      this.modalMode = 'create'
      this.isModalOpen = true
      this.$cash('#modal-category-manage').modal('show')
    },
    editCategory(detail) {
      console.log('detail---', detail)
      this.editDetail = { ...detail }
      this.modalMode = 'edit'
      this.isModalOpen = true
      this.$cash('#modal-category-manage').modal('show')
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
