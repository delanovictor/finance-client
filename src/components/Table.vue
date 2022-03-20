<template>
    <div
        class=" p-3 overflow-auto shadow-2xl rounded-2xl  "
        id="table-container"
    >
        <Row
            v-for="(row, index) in getActiveRows"
            :class="[index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-900', 'text-gray-100']"
            :key="row._id"
            :rowData="row"
            :checkValue="row.checkValue"
        />
    </div>
</template>

<script>
import Row from '@/components/Row.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    Row
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
  method: {
    getClass: function (index) {
      if (index % 2 == 0) return 'bg-red-400'
      else return 'bg-green'
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>
#table-container {
    max-height: 85vh;
}

</style>
