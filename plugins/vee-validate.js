import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import {
  required,
  min,
  min_value as minValue,
  max,
  max_value as maxValue,
  digits,
  numeric,
  regex,
  confirmed,
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'กรุณากรอกข้อมูล',
})

extend('phonenumber', {
  validate(value) {
    const regex = /^((0[0-9][0-9])+\d{7})$/
    return regex.test(value)
  },
  message: 'กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง',
})

extend('password', {
  validate(value) {
    const regex = /^([a-zA-z0-9]+)$/
    return regex.test(value)
  },
  message: 'รหัสผ่านต้องเป็นตัวอักษร (A-z,a-z,0-9)',
})

extend('min', {
  ...min,
  message: 'กรุณากรอกอย่างน้อย {length} ตัวอักษร',
})

extend('min_value', {
  ...minValue,
  message: 'กรุณากรอกไม่ต่ำกว่า {min}',
})

extend('max', {
  ...max,
  message: 'กรุณากรอกไม่เกิน {length} ตัวอักษร',
})

extend('max_value', {
  ...maxValue,
  message: 'กรุณากรอกไม่เกิน {max}',
})

extend('digits', {
  ...digits,
  message: 'กรุณากรอกตัวเลขและ {length} ตัวอักษร ',
})

extend('numeric', {
  ...numeric,
  message: 'กรุณากรอกรูปแบบตัวเลข ',
})

extend('regex', {
  ...regex,
  message: 'กรุณากรอก {_field_} ให้ถูกต้อง',
})

extend('confirmed_password', {
  ...confirmed,
  message: 'กรุณาระบุรหัสผ่านให้ตรงกัน',
})

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
