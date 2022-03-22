<template>

    <div class="grid md:grid-cols-12   grid-cols-6 gap-1     pr-3 text-xs ">
        <div
            class="md:flex   hidden align-middle rounded-md h-20   col-span-1 "
            :id="rowData._id"
            @click.ctrl="handleCheck($event, true)"
        >
            <div class="p-3  m-1 self-center ">
                <Transition
                    name="check"
                    tag="div"
                >
                    <label
                        class="border-gray-600 rounded-md border-2 cursor-pointer px-2 checkbox relative transition-colors duration-100 ease-in-out"
                        :class="checkValue? 'bg-green-700 border-green-700':''"
                        :for="key"
                    >

                        <span
                            v-if="checkValue"
                            class="absolute left-0"
                        >
                            <img
                                :src="require(`@/assets/check.png`)"
                                style="width: 28px; height: 20px"
                            />

                        </span>

                        <input
                            type="checkbox"
                            class="hidden"
                            name="select-row"
                            :id="key"
                            v-model="checkValue"
                            @change="handleCheck"
                        >

                    </label>

                </Transition>
            </div>
        </div>
        <div class="md:col-span-1  md:block  col-span-1  p-3   m-1  self-center text-center"> {{new Date(rowData.date).toLocaleDateString()}} </div>
        <div class="md:col-span-3  md:col-start-4 col-start-3  col-span-4 p-3  m-1 self-center  "> {{rowData.description}} </div>
        <div
            class="md:col-span-1 md:col-start-8  m-1 self-center col-span-3 col-start-5 text-base"
            :class="[rowData.value> 0 ? 'text-green-300' : 'text-red-300']"
        > {{rowData.value.toFixed(2).toString().replace('.', ',')}}
        </div>
        <div class="md:col-span-2 px-3 py-5 m-1 col-span-3">
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
        <div class="md:col-span-2 px-3 py-5 m-1 col-span-3">
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

<style scoped>
/* .check-enter-active,
.check-leave-active {
    transition: all 0.5s ease;
}
.check-enter-from {
    opacity: 0;
    transform: translateX(-1000px);
}

.check-leave-to {
    opacity: 0;
    transform: translateX(1000px);
} */
</style>