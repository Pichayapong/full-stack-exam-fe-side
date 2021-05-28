<template>
  <div
    id="modal-shop-manage"
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
            <ValidationObserver ref="formShopManage">
              <div class="flex flex-col space-y-2">
                <div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`validation-shop-name`"
                    rules="required"
                  >
                    <label for="input-shop-name" class="form-label">
                      ชื่อร้าน
                    </label>
                    <input
                      id="input-shop-name"
                      v-model="formData.name"
                      type="text"
                      class="form-control"
                      placeholder="ชื่อร้าน"
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
                    :name="`validation-shop-phonenumber`"
                    rules="required|phonenumber"
                  >
                    <label for="input-shop-phonenumber" class="form-label">
                      เบอร์โทร
                    </label>
                    <input
                      id="input-shop-phonenumber"
                      v-model="formData.phonenumber"
                      type="text"
                      class="form-control"
                      placeholder="เบอร์โทร"
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
                    :name="`validation-shop-address`"
                    rules="required"
                  >
                    <label for="input-shop-address" class="form-label">
                      ที่อยู่
                    </label>
                    <input
                      id="input-shop-address"
                      v-model="formData.address"
                      type="text"
                      class="form-control"
                      placeholder="ที่อยู่"
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
                    :name="`validation-shop-detail`"
                    rules="required"
                  >
                    <label for="input-shop-detail" class="form-label">
                      รายละเอียด
                    </label>
                    <input
                      id="input-shop-detail"
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
    name: '',
    detail: '',
    phonenumber: '',
    address: '',
  }
}
export default {
  name: 'ModalShopManage',
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
    shopDetail: {
      type: Object,
      default: () => {
        return {
          _id: null,
          name: '',
          detail: '',
          phonenumber: '',
          address: '',
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
      return this.mode === 'create' ? 'เพิ่มร้านค้า' : 'แก้ไขร้านค้า'
    },
  },
  watch: {
    isOpen(value) {
      if (value === true && this.mode === 'edit') {
        this.formData = { ...this.shopDetail }
      }
    },
  },
  methods: {
    async onSubmit() {
      const form = this.$refs.formShopManage
      const valid = await form.validate()
      if (valid) {
        try {
          this.$nuxt.$loading.start()
          const params = {
            name: this.formData.name,
            detail: this.formData.detail,
            phonenumber: this.formData.phonenumber,
            address: this.formData.address,
          }
          const res =
            this.mode === 'create'
              ? await this.$axios.post('/shop', params)
              : await this.$axios.put(`/shop/${this.shopDetail._id}`, params)
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
      this.$cash('#modal-shop-manage').modal('hide')
      this.formData = initialForm()
      this.$refs?.formShopManage?.reset()
    },
  },
}
</script>

<style></style>
