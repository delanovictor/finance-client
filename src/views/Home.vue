<template>
    <div class="home bg-black h-screen text-sm overflow-hidden">

        <div class="flex justify-center  bg-indigo-900">

            <div class="cursor-pointer text-center ">
                <div @click="showEditMenu"><img
                        src="https://img.icons8.com/ios-glyphs/30/000000/edit--v1.png"
                        style="width: 25px; height: 25px"
                    /></div>
                <div
                    v-if="activeEdit"
                    class="m-1 p-2 bg-gray-200 "
                >
                    <select
                        name="category"
                        id="category"
                        class="w-full"
                        @change="(e)=> {editCategory = e.target.value}"
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
                    <div class="flex justify-end pt-4 cursor-pointer">
                        <button
                            @click="updateCategories"
                            class="rounded-3xl px-10 py-3 bg-green-800 text-gray-100 font-bold"
                        >Salvar</button>
                    </div>
                </div>
            </div>

            <div
                class="cursor-pointer "
                @click="deleteSelected"
            >
                <img
                    src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"
                    style="width: 25px; height: 25px"
                />
            </div>

        </div>

        <div class=" flex text-gray-100  text-xl  text-center justify-between">
            <div class="bg-indigo-700 w-1/5 ">R$ 20.000</div>

            <div class=" flex w-1/2 justify-between">
                <input
                    class="w-3/4 text-gray-100 p-1 rounded-md bg-gray-900 border-gray-600 border-2"
                    type="text"
                    @keyup="(e)=> {filter.description = e.target.value}"
                    placeholder="Procurar..."
                >

                <div class="cursor-pointer text-center">
                    <div @click="showFilterMenu">
                        <!-- <img
                            @v-if="!activeFilter"
                            class="text-white"
                            :src="require(`@/assets/filter.svg`)"
                            style="width: 25px; height: 25px"
                        /> -->
                    </div>
                    <div class="flex m-1 p-2  ">
                        <select
                            name="category"
                            id="category"
                            class="w-full bg-gray-700 p-2 rounded-lg text-sm"
                            @change="(e)=> {filter.category = e.target.value}"
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

                        <select
                            name="paymentTypes"
                            id="paymentTypes"
                            class="w-full bg-gray-700 p-2 rounded-lg text-sm"
                            @change="(e)=> {filter.paymentType = e.target.value}"
                        >
                            <option
                                v-for="type in paymentTypes"
                                :key="type"
                                :value="type"
                            >{{type}}
                            </option>

                        </select>

                        <div
                            class=" justify-end pt-4 cursor-pointer"
                            @click="resetFilter"
                        >
                            x </div>
                    </div>
                </div>
            </div>
        </div>

        <div class=" mt-10 bg-gray-900 shadow-2xl">
            <Table :filter="filter" />
        </div>

        <div
            id="show-modal"
            @click="showModal = true"
            class="fixed bg-indigo-700 hover:bg-indigo-800 transform transition duration-200 hover:scale-110  shadow-2xl bottom-5 right-12 px-5  py-5 rounded-full cursor-pointer "
        >
            <img
                class="text-gray-300"
                :src="require(`@/assets/plus.png`)"
                style="width: 25px; height: 25px"
            />
        </div>

        <transition name="modal">
            <Importer
                v-if="showModal"
                @close="showModal = false"
            />
        </transition>

    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import AddRow from '@/components/AddRow.vue'
import Importer from '@/components/Importer.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Table,
    AddRow,
    Importer
  },
  data () {
    return {
      activeMenu: false,
      showModal: false,
      activeEdit: false,
      activeFilter: false,
      editCategory: null,
      filter: {}
    }
  },
  methods: {
    async updateCategories () {
      await this.editRows({
        category: this.editCategory,
        checkValue: false
      })
      // this.editCategory = null
      this.activeEdit = null
    },
    showEditMenu () {
      this.activeEdit = !this.activeEdit
    },
    showFilterMenu () {
      console.log(this.filter)
      this.activeFilter = !this.activeFilter
    },
    resetFilter () {
      this.filter = {}
    },
    updateRow (rowData) {
      this.rows = rowData
    },
    showMenu () {
      this.activeMenu = !this.activeMenu
    },
    importData () {},
    deleteSelected () {
      console.log('delete')
      this.removeRows(this.getSelectedRows())
    },
    ...mapActions(['fetchRows', 'getSelected', 'removeRows', 'editRows'])
  },
  computed: {
    ...mapGetters(['getSelectedRows']),
    ...mapGetters({
      categories: 'getCategories',
      paymentTypes: 'getPaymentTypes'
    })
  },
  async mounted () {
    await this.fetchRows()
  }
}
</script>

<style >
#app {
    overflow: auto;
}

.modal-enter-from {
    opacity: 0;
}
.modal-enter-active {
    transition: all 0.3s ease;
}
.modal-leave-to {
    opacity: 0;
}
.modal-leave-active {
    transition: all 0.3s ease;
}
</style>
