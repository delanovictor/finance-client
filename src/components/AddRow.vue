<template>

    <div class="w-full ">
        <div class="flex py-1 justify-center 	">
            <div
                class="m-1 w-1/12 p-2 text-center  align-middle self-center  "
                @click="deleteRow()"
            >
                <img
                    :src="require(`@/assets/close.svg`)"
                    class="text-gray-300 cursor-pointer hover:bg-red-500 rounded-full p-1 "
                    style="width: 25px; height: 25px"
                />

            </div>
            <div class="mx-2 p-2  w-1/6 align-middle inline-block   text-center self-center">

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
            <div class=" m-3 self-center  w-1/6">
                <input
                    type="text"
                    name="value"
                    class=" border-b-2 border-gray-700 m-0  pb-4 w-full text-center bg-transparent"
                    id="value"
                    :value="value"
                    @input="$emit('update:value', $event.target.value)"
                />

            </div>
            <div class="m-3 w-1/2 py-1 px-0 h-full  ">
                <textarea
                    rows="2"
                    name="description"
                    id="description"
                    class=" w-full bg-transparent border-b-2 pd-1 box-border   border-gray-700"
                    :value="description"
                    @input="$emit('update:description', $event.target.value)"
                />
            </div>
            <div class="m-1 w-1/6 p-2   self-center">
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
            <div class="m-1 w-1/6 p-2  self-center">
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
