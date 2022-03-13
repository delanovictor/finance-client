<template>
    <div
        class="flex mt-2 mb-2 align-middle rounded-md h-20 justify-between pr-3"
        :id="rowData._id"
        @click.ctrl="handleCheck($event, true)"
    >
        <label
            :for="key"
            class="w-1/12 p-3  m-1   text-center self-center"
        >
            <input
                type="checkbox"
                name="select-row"
                :id="key"
                v-model="checkValue"
                @change="handleCheck"
            >
        </label>
        <div class="w-1/12 p-3   m-1  self-center text-center"> {{new Date(rowData.date).toLocaleDateString()}} </div>
        <div class="w-2/4 p-3  m-1 self-center "> {{rowData.description}} </div>
        <span
            class="w-2/12 p-3  m-1 self-center"
            :class="[rowData.value> 0 ? 'text-green-300' : 'text-red-300']"
        > {{rowData.value.toFixed(2).toString().replace('.', ',')}}
        </span>
        <div class="w-1/6 p-3 m-1 ">
            <select
                name="category"
                id="category"
                class="w-full bg-gray-700 p-2 rounded-lg"
                :value="rowData.category"
                @change="updateRow($event, 'category')"
            >
                <optgroup
                    v-for="option in categories"
                    :key="option.category"
                    :label="option.category"
                >
                    <option
                        v-for="subCategory in option.subCategory"
                        :key="subCategory"
                        :value="option.category + '>' + subCategory"
                    >{{subCategory}}
                    </option>

                </optgroup>

            </select>
        </div>
        <div class="w-1/6 p-3 m-1 ">
            <select
                name="paymentType"
                id="paymentType"
                class="w-full bg-gray-700 p-2 rounded-lg"
                :value="rowData.paymentType"
                @change="updateRow($event, 'paymentType')"
            >
                <option
                    v-for="type in paymentTypes"
                    :key="type"
                    :value="type"
                >{{type}}
                </option>

            </select>
        </div>
    </div>

</template> 
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      // checkValue: false
    }
  },
  props: ['rowData', 'key', 'checkValue'],
  methods: {
    ...mapActions(['toggleSelectedRow', 'editSingleRow']),
    handleCheck (e, rowClick) {
      this.toggleSelectedRow({
        _id: this.rowData._id
      })
    },
    updateRow (e, field) {
      const value = e.target.value

      this.editSingleRow({
        _id: this.rowData._id,
        field: field,
        value: value
      })
    },
    getClass () {
      return this.checkValue ? 'bg-purple-700' : ' '
    },
    getClassValue (value) {
      return value > 0 ? 'text-green-300' : 'text-red-300'
    }
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories',
      paymentTypes: 'getPaymentTypes'
    }),
    ...mapGetters(['getSelectedRows'])
  }
}
</script>
