<template>
  <div
    id="modal-category-manage"
    class="modal"
    tabindex="-1"
    aria-hidden="true"
    data-backdrop="static"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <div class="font-bold text-xl mr-auto">{{ getTitle }}</div>
          <a data-dismiss="modal" href="javascript:;" @click="resetForm">
            <XIcon class="w-8 h-8 text-gray-500" />
          </a>
        </div>
        <div class="modal-body">
          <client-only>
            <ValidationObserver ref="formCategoryManage">
              <div class="flex flex-col space-y-2">
                <div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`validation-category-name`"
                    rules="required"
                  >
                    <label for="input-category-name" class="form-label">
                      ชื่อหมวดหมู่
                    </label>
                    <input
                      id="input-product-name"
                      v-model="formData.name"
                      type="text"
                      class="form-control"
                      placeholder="ชื่อหมวดหมู่"
                      :class="errors.length > 0 ? `border-red-500` : ``"
                    />
                    <span class="text-red-500 text-center">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`validation-category-detail`"
                    rules="required"
                  >
                    <label for="input-category-detail" class="form-label">
                      รายละเอียด
                    </label>
                    <input
                      id="input-product-detail"
                      v-model="formData.detail"
                      type="text"
                      class="form-control"
                      placeholder="รายละเอียด"
                      :class="errors.length > 0 ? `border-red-500` : ``"
                    />
                    <span class="text-red-500 text-center">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
              </div>
            </ValidationObserver>
          </client-only>
        </div>
        <div class="modal-footer text-right">
          <button
            type="button"
            data-dismiss="modal"
            class="btn btn-outline-secondary w-20 mr-1"
            @click="resetForm"
          >
            ยกเลิก
          </button>
          <button type="button" class="btn btn-primary w-20" @click="onSubmit">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const initialForm = () => {
  return {
    detail: '',
    name: '',
  }
}
export default {
  name: 'ModalProductManage',
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'create',
      validator: (mode) => {
        return ['create', 'edit'].includes(mode)
      },
    },
    editDetail: {
      type: Object,
      default: () => {
        return {
          _id: null,
          detail: '',
          name: '',
        }
      },
    },
  },
  data() {
    return {
      formData: initialForm(),
    }
  },
  computed: {
    getTitle() {
      return this.mode === 'create'
        ? 'สร้างหมวดหมู่สินค้า'
        : 'แก้ไขหมวดหมู่สินค้า'
    },
    getCategoryList() {
      return this.categoryList
    },
  },
  watch: {
    isOpen(value) {
      if (value === true && this.mode === 'edit') {
        this.formData = { ...this.editDetail }
      }
    },
  },
  methods: {
    async onSubmit() {
      const form = this.$refs.formCategoryManage
      const valid = await form.validate()
      if (valid) {
        try {
          this.$nuxt.$loading.start()
          const params = {
            name: this.formData.name,
            detail: this.formData.detail,
          }
          const res =
            this.mode === 'create'
              ? await this.$axios.post('/category', params)
              : await this.$axios.put(`category/${this.editDetail._id}`, params)
          if (res.status === 201 || res.status === 200) {
            this.$swal.fire({
              showConfirmButton: false,
              icon: 'success',
              title: 'บันทึกสำเร็จ',
              timer: 3000,
            })
            this.resetForm()
            this.$emit('reloadList')
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
      }
    },
    resetForm() {
      this.$emit('onClose')
      this.$cash('#modal-category-manage').modal('hide')
      this.formData = initialForm()
      this.$refs?.formCategoryManage?.reset()
    },
  },
}
</script>

<style></style>
