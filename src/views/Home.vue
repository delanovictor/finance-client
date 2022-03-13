<template>
    <div class="home bg-black h-screen text-sm">

        <div class="flex justify-center  bg-indigo-900">
            <div class="cursor-pointer">
                <button
                    id="show-modal"
                    @click="showModal = true"
                ><img
                        src="https://img.icons8.com/ios-glyphs/30/000000/import.png"
                        style="width: 25px; height: 25px"
                    /></button>
                <!-- use the modal component, pass in the prop -->

                <transition name="modal">
                    <Importer
                        v-if="showModal"
                        @close="showModal = false"
                    />
                </transition>
            </div>

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

            <div class="cursor-pointer text-center ">
                <div @click="showFilterMenu"><img
                        src="https://img.icons8.com/ios-glyphs/30/000000/filter.png"
                        style="width: 25px; height: 25px"
                    /></div>
                <div
                    v-if="activeFilter"
                    class="m-1 p-2 bg-gray-200 "
                >
                    <select
                        name="category"
                        id="category"
                        class="w-full"
                        @change="(e)=> {filterCategory = e.target.value}"
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
                            @click="resetFilter"
                            class="rounded-3xl px-10 py-3 bg-red-800 text-gray-100 font-bold"
                        >Resetar</button>
                    </div>
                </div>
            </div>

            <div
                class="cursor-pointer  "
                @click="showMenu"
            >
                <img
                    src="https://img.icons8.com/fluency-systems-regular/48/000000/add--v1.png"
                    style="width: 25px; height: 25px"
                />
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

        <div class="mx-2 mt-10">
            <Table :filterCategory="filterCategory" />
        </div>

        <AddRow
            v-if="activeMenu"
            @update-row="updateRow"
        />
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
      filterCategory: null
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
      console.log(this.filterCategory)
      this.activeFilter = !this.activeFilter
    },
    resetFilter () {
      this.filterCategory = null
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
    ...mapGetters({ categories: 'getCategories' })
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
