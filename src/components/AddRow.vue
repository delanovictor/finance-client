<template>

    <div class="w-full ">
        <div class="grid md:grid-cols-12   grid-cols-12 md:gap-3 gap-2 py-1 text-xs">
            <div
                class="relative md:col-span-1  col-span-12  m-1 p-2 text-center  align-middle self-center  "
                @click="deleteRow()"
            >
                <img
                    :src="require(`@/assets/close.svg`)"
                    class="md:relative absolute text-gray-300 cursor-pointer hover:bg-red-500 rounded-full p-1 "
                    style="width: 25px; height: 25px"
                />

            </div>
            <div class="md:col-span-2   col-span-3   p-2  align-middle inline-block mx-2  text-center self-center">

                <input
                    type="date"
                    name="date"
                    id="date"
                    class="bg-gray-700 rounded-md p-1 "
                    :value="date"
                    @change="$emit('update:date', formatDate($event.target.value)), updateRows($event.target.value)"
                />

                <!-- <div
                    class="w-full"
                    v-if="!dateEditable"
                > {{new Date(formatDate(date)).toLocaleDateString()}}</div> -->

            </div>
            <div class="md:col-span-1 my-2  col-start-8 col-span-4  m-1 self-center border-b-2 border-gray-700 ">
                <input
                    type="text"
                    name="value"
                    class=" m-0 md:pb-4 w-full min-h-full text-center bg-transparent"
                    id="value"
                    :value="value"
                    :class="Number(value? value.replace(',','.') : 0.00) > 0 ? 'text-green-300' : 'text-red-300'"
                    @input="$emit('update:value', $event.target.value)"
                />

            </div>
            <div class=" md:col-span-4 my-2 md:col-start-5 col-start-1 col-span-12 mx-4 self-center border-gray-700 border-b-2 ">
                <textarea
                    rows="2"
                    name="description"
                    id="description"
                    class=" w-full min-h-full bg-transparent m-0 "
                    :value="description"
                    @input="$emit('update:description', $event.target.value)"
                />
            </div>
            <div class="md:col-span-2   col-span-6  m-1 p-2   self-center">
                <select
                    name="category"
                    id="category"
                    class="w-full bg-gray-700 p-2 rounded-lg"
                    :value="category"
                    @change="$emit('update:category', $event.target.value)"
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
            <div class="md:col-span-2   col-span-6 m-1 p-2  self-center">
                <select
                    name="paymentType"
                    id="paymentType"
                    class="w-full bg-gray-700 p-2 rounded-lg"
                    :value="paymentType"
                    @change="$emit('update:paymentType', $event.target.value)"
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
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: [
    'date',
    'description',
    'value',
    'category',
    'index',
    'paymentType',
    'dateEditable'
  ],
  methods: {
    handleSubmit () {
      const newRow = {
        date: this.date,
        value: this.value,
        description: this.description,
        inOrOut: this.inOrOut,
        category: this.category
      }

      let tempLocalStorage = localStorage.getItem('rows')

      if (tempLocalStorage) {
        tempLocalStorage = JSON.parse(tempLocalStorage)
      } else {
        tempLocalStorage = []
      }
      tempLocalStorage.push(newRow)

      localStorage.setItem('rows', JSON.stringify(tempLocalStorage))

      this.$emit('update-row', tempLocalStorage)
    },
    formatDate (date) {
      if (date) {
        let formatedDate = date.split('/')
        formatedDate = formatedDate.reverse()
        formatedDate = formatedDate.join('-')

        return formatedDate
      }
    },
    deleteRow () {
      console.log(this.index)
      this.$emit('delete-row', this.index)
    }
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories',
      paymentTypes: 'getPaymentTypes'
    })
  },
  mounted () {}
}
</script>
