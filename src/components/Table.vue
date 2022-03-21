<template>
    <div
        class=" p-3 overflow-y-auto overflow-x-hidden  shadow-2xl rounded-2xl  "
        id="table-container"
    >
        <TransitionGroup
            name="list"
            tag="ul"
        >

            <li
                v-for="(row, index) in getActiveRows"
                :key="row._id"
            >
                <Row
                    :class="[index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-900', 'text-gray-100']"
                    :rowData="row"
                    :key="row._id"
                    :checkValue="row.checkValue"
                />
            </li>

        </TransitionGroup>

    </div>
</template>

<script>
import Row from '@/components/Row.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Row
  },
  data () {
    return {
      arrayTeste: ['aa', 'bb', 'cc']
    }
  },
  props: ['filter'],
  computed: {
    ...mapGetters({ rows: 'getRows' }),

    getActiveRows: function () {
      this.rows.forEach((row) => {
        row.check = true
      })

      return this.rows.filter((row) => {
        if (!this.filter) return true

        console.log(this.filter)
        console.log(row)

        for (const key in this.filter) {
          if (this.filter[key]) {
            if (
              row[key]
                .toString()
                .toLowerCase()
                .trim()
                .indexOf(this.filter[key].toLowerCase()) == -1
            ) {
              return false
            }
          }
        }

        return true
      })
    }
  },
  methods: {
    getClass: function (index) {
      if (index % 2 == 0) return 'bg-red-400'
      else return 'bg-green'
    },
    removeItem: function (index) {
      this.arrayTeste.splice(index, 1)
    }
  }
}
</script>

<style scoped>
#table-container {
    max-height: 85vh;
}
</style>
