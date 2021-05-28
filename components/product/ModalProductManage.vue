<template>
  <div
    id="modal-product-manage"
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
            <ValidationObserver ref="formProductManage">
              <div class="flex flex-col space-y-2">
                <div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`validation-product-name`"
                    rules="required"
                  >
                    <label for="input-product-name" class="form-label">
                      ชื่อสินค้า
                    </label>
                    <input
                      id="input-product-name"
                      v-model="formData.name"
                      type="text"
                      class="form-control"
                      placeholder="ชื่อสินค้า"
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
                    :name="`validation-product-category`"
                    rules="required"
                  >
                    <label for="input-product-category" class="form-label">
                      หมวดหมู่
                    </label>
                    <v-select
                      v-model="formData.category_id"
                      :options="getCategoryList"
                      :clearable="false"
                      :reduce="(option) => option._id"
                      label="name"
                      placeholder="หมวดหมู่"
                      class="whitespace-nowrap w-full h-full"
                      :class="errors.length > 0 ? `v-select-error` : ``"
                    />
                    <span class="text-red-500 text-center">
                      {{ errors[0] }}
                    </span>
                  </ValidationProvider>
                </div>
                <div>
                  <ValidationProvider
                    v-slot="{ errors }"
                    :name="`validation-product-detail`"
                    rules="required"
                  >
                    <label for="input-product-detail" class="form-label">
                      รายละเอียดสินค้า
                    </label>
                    <input
                      id="input-product-detail"
                      v-model="formData.detail"
                      type="text"
                      class="form-control"
                      placeholder="รายละเอียดสินค้า"
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
                    :name="`validation-product-price`"
                    rules="required|numeric"
                  >
                    <label for="input-product-price" class="form-label">
                      ราคา
                    </label>
                    <input
                      id="input-product-price"
                      v-model="formData.price"
                      type="number"
                      class="form-control"
                      placeholder="ราคา"
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
                    :name="`validation-product-unit`"
                    rules="required|numeric"
                  >
                    <label for="input-product-unit" class="form-label">
                      จำนวนคงเหลือ
                    </label>
                    <input
                      id="input-product-unit"
                      v-model="formData.unit"
                      type="number"
                      class="form-control"
                      placeholder="จำนวนคงเหลือ"
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
    category_id: null,
    detail: '',
    name: '',
    price: null,
    shop_id: null,
    unit: null,
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
    productDetail: {
      type: Object,
      default: () => {
        return {
          _id: null,
          category_id: null,
          detail: '',
          name: '',
          price: null,
          shop_id: null,
          unit: null,
        }
      },
    },
    categoryList: {
      type: Array,
      default: () => [],
      required: true,
    },
    shopId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: initialForm(),
    }
  },
  computed: {
    getTitle() {
      return this.mode === 'create' ? 'เพิ่มสินค้า' : 'แก้ไขสินค้า'
    },
    getCategoryList() {
      return this.categoryList
    },
  },
  watch: {
    isOpen(value) {
      if (value === true && this.mode === 'edit') {
        this.formData = { ...this.productDetail }
      }
    },
  },
  methods: {
    async onSubmit() {
      const form = this.$refs.formProductManage
      const valid = await form.validate()
      if (valid) {
        try {
          this.$nuxt.$loading.start()
          const params = {
            shop_id: this.shopId,
            name: this.formData.name,
            category_id: this.formData.category_id,
            price: Number(this.formData.price),
            detail: this.formData.detail,
            unit: Number(this.formData.unit),
          }
          const res =
            this.mode === 'create'
              ? await this.$axios.post('/product', params)
              : await this.$axios.put(
                  `product/${this.productDetail._id}`,
                  params
                )
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
      this.$cash('#modal-product-manage').modal('hide')
      this.formData = initialForm()
      this.$refs?.formProductManage?.reset()
    },
  },
}
</script>

<style lang="postcss">
.vs__selected-options {
  ::placeholder {
    color: #a0aec0;
  }
}
.vs__dropdown-toggle {
  height: 38px;
  padding-left: 4px;
  padding-right: 4px;
  @apply border border-gray-300;
  --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.v-select-error {
  .vs__dropdown-toggle {
    height: 38px;
    padding-left: 4px;
    padding-right: 4px;
    @apply border border-red-500;
    --tw-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
}
</style>
