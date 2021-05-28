<template>
  <h1>sub-menu 2 test get / post</h1>
</template>

<script>
export default {
  name: 'SubTest',
  layout: 'dashboard',
  mounted() {
    this.fetchGet()
    // this.fetchPost()
  },
  methods: {
    async fetchGet() {
      console.log('123')
      try {
        const param = {
          page: 1,
          itemPerPage: 10,
          searchText: '',
        }
        const result = await this.$axios.get('/auth-admin/admins', {
          params: param,
        })
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    },
    // fetchPost() {
    //   try {
    //     const result = await this.$axios.get('/auth-admin/admin')
    //     console.log(result)
    //   } catch (error) {}
    // },
  },
}
</script>

<style></style>
