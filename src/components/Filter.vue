<template>
    <div class="w-full grid md:grid-cols-9   grid-cols-6  m-1 p-2   ">

        <div class="md:col-span-8  col-span-4">
            <input
                class="w-full text-gray-100 p-1 rounded-l-md bg-gray-900 border-gray-600 border-2"
                type="text"
                @input="$emit('update:description', $event.target.value)"
                placeholder="Procurar..."
            >
        </div>

        <div
            class="md:col-span-1  col-span-1 w-1/2 self-center py-2 px-1 cursor-pointer bg-gray-900 hover:bg-gray-800 border-gray-600  border-t-2 border-b-2 border-r-2 rounded-r-2xl   "
            @click="toggleFilter"
        >
            <img
                :src="require(`@/assets/list.png`)"
                style="width: 25px; height: 25px"
                class="self-center "
            />
        </div>

        <Transition name="filter">
            <div
                v-if="filterActive"
                class="md:col-span-8  col-span-4 grid md:grid-cols-9   grid-cols-6 bg-gray-800 pt-3 pb-3 pl-5 rounded-b-2xl border-gray-600  border-l-2 border-b-2 border-r-2"
            >
                <div class="md:col-span-3  col-span-4">
                    <select
                        name="category"
                        id="category"
                        class="w-full bg-gray-700 p-2 rounded-lg text-sm"
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

                <div class="md:col-span-3 md:col-start-5  col-span-4">
                    <select
                        name="paymentTypes"
                        id="paymentTypes"
                        class="w-full bg-gray-700 p-2 rounded-lg text-sm"
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

                <div
                    class="md:col-span-1 md:col-start-9  col-span-1 cursor-pointer self-center"
                    @click="resetFilter"
                > <img
                        :src="require(`@/assets/reset.png`)"
                        style="width: 25px; height: 25px"
                    /> </div>
            </div>
        </Transition>

    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['filter'],
  data () {
    return {
      filterActive: false
    }
  },
  methods: {
    resetFilter () {
      this.filter = {}
    },
    toggleFilter () {
      this.filterActive = !this.filterActive
    }
  },
  computed: {
    ...mapGetters({
      categories: 'getCategories',
      paymentTypes: 'getPaymentTypes'
    })
  }
}
</script>

<style scoped>
.filter-enter-active,
.filter-leave-active {
    transition: all 0.4s ease-in-out;
}
.filter-enter-from,
.filter-leave-to {
    opacity: 0;
    transform-origin: top center;
    transform: scaleY(0) translateY(-60px);
}
</style>