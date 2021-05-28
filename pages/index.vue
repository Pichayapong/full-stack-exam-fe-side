<template>
  <div>
    <h1 class="title">cssPath: '@/assets/sass/app.scss'</h1>
    <div class="flex text-parimary flex-wrap">
      <div class="w-1/2">1121</div>
      <div class="w-1/2 text-red-300 text-3xl bg-gray-100">1121</div>
      <div class="w-full">
        <client-only>
          <vue-good-table
            :columns="columns"
            :rows="rows"
            :total-rows="totalRecords"
            :is-loading.sync="isLoading"
            mode="remote"
            :pagination-options="{
              enabled: true,
              perPageDropdown: [3, 7, 9],
            }"
            @on-page-change="onPageChange"
            @on-sort-change="onSortChange"
            @on-column-filter="onColumnFilter"
            @on-per-page-change="onPerPageChange"
          />
        </client-only>
      </div>
      <div>
        <button class="dropdown-toggle btn btn-primary" aria-expanded="false">
          Show Dropdown
        </button>
        <div class="dropdown-menu w-40">
          <div class="dropdown-menu__content box dark:bg-dark-1 p-2">
            <a
              href=""
              class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >New Dropdown</a
            >
            <a
              href=""
              class="block p-2 transition duration-300 ease-in-out bg-white dark:bg-dark-1 hover:bg-gray-200 dark:hover:bg-dark-2 rounded-md"
              >Delete Dropdown</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Wowowo',
  layout: 'dashboard',
  data() {
    return {
      isLoading: false,
      totalRecords: 0,
      serverParams: {
        columnFilters: {},
        sort: {
          field: '',
          type: '',
        },
        page: 1,
        perPage: 10,
      },
      columns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Age',
          field: 'age',
          type: 'number',
        },
        {
          label: 'Created On',
          field: 'createdAt',
          type: 'date',
          dateInputFormat: 'yyyy-MM-dd',
          dateOutputFormat: 'MMM do yy',
        },
        {
          label: 'Percent',
          field: 'score',
          type: 'percentage',
        },
      ],
      rows: [
        {
          id: 1,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
        {
          id: 2,
          name: 'Jane',
          age: 24,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
        {
          id: 3,
          name: 'Susan',
          age: 16,
          createdAt: '2011-10-30',
          score: 0.03343,
        },
        {
          id: 4,
          name: 'Chris',
          age: 55,
          createdAt: '2011-10-11',
          score: 0.03343,
        },
        {
          id: 5,
          name: 'Dan',
          age: 40,
          createdAt: '2011-10-21',
          score: 0.03343,
        },
        {
          id: 6,
          name: 'John',
          age: 20,
          createdAt: '2011-10-31',
          score: 0.03343,
        },
      ],
    }
  },
  methods: {
    updateParams(newProps) {
      this.serverParams = Object.assign({}, this.serverParams, newProps)
    },

    onPageChange(params) {
      this.updateParams({ page: params.currentPage })
      this.loadItems()
    },

    onPerPageChange(params) {
      this.updateParams({ perPage: params.currentPerPage })
      this.loadItems()
    },

    onSortChange(params) {
      this.updateParams({
        sort: [
          {
            type: params.sortType,
            field: this.columns[params.columnIndex].field,
          },
        ],
      })
      this.loadItems()
    },

    onColumnFilter(params) {
      this.updateParams(params)
      this.loadItems()
    },
    loadItems() {
      this.getFromServer(this.serverParams).then((response) => {
        this.rows.push(response)
        this.totalRecords = this.rows.length
      })
    },
    getFromServer(param) {
      return new Promise((resolve) => {
        console.log(param)
        setTimeout(() => {
          resolve({
            id: this.rows.length + 1,
            name: 'John' + this.rows.length + 1,
            age: 20 + this.rows.length + 1,
            createdAt: '2011-10-31',
            score: 0.03343 + this.rows.length + 1,
          })
        }, 1000)
      })
    },
  },
}
</script>
