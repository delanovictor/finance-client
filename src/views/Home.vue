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

        </div>

        <div class=" text-gray-100  text-xl  text-center grid grid-cols-12 gap-1">
            <div class=" md:col-span-2 md:col-start-1 md:ml-4 md:mt-1">
                <div class="bg-gray-900 p-3 m-1 rounded-full grid grid-cols-12 gap-1 border-2 border-gray-800">
                    <div class=" md:col-span-8 md:col-start-2">
                        <Transition name="fade">
                            <span v-if="activeTotal">
                                R$ 20.000
                            </span>
                        </Transition>
                    </div>
                    <div
                        class="md:col-span-2 md:col-start-11 cursor-pointer"
                        @click="showTotal"
                    >
                        <img
                            class="text-gray-300"
                            :src="require(`@/assets/eye.png`)"
                            style="width: 25px; height: 25px"
                        />
                    </div>
                </div>

            </div>

            <Filter
                class=" md:col-span-10 md:col-start-4"
                v-model:category="filter.category"
                v-model:paymentType="filter.paymentType"
                v-model:description="filter.description"
            />

            <div @click="showFilterMenu">
                <!-- <img
                            @v-if="!activeFilter"
                            class="text-white"
                            :src="require(`@/assets/filter.svg`)"
                            style="width: 25px; height: 25px"
                        /> -->
            </div>
        </div>

        <div class=" mt-2 bg-gray-900 shadow-2xl">
            <Table :filter="filter" />
        </div>
        <Transition name="fade">
            <div
                class="cursor-pointer "
                @click="deleteSelected"
            >
                <div
                    id="show-modal"
                    v-if="this.getSelectedRows().length > 0"
                    class="fixed bg-red-700 hover:bg-red-800 transform transition duration-200 hover:scale-110  shadow-2xl  bottom-10 right-5 py-4 px-4 md:bottom-24 md:right-16 md:px-2 md:py-2 rounded-full cursor-pointer "
                >
                    <img
                        class="text-gray-300"
                        :src="require(`@/assets/trash.png`)"
                        style="width: 22px; height: 22px"
                    />
                </div>
            </div>

        </Transition>
        <div
            id="show-modal"
            @click="showImporter = true"
            class="fixed bg-indigo-700 hover:bg-indigo-800 transform transition duration-200 hover:scale-110  shadow-2xl  bottom-4 right-5 py-4 px-4 md:bottom-4 md:right-12 md:px-5 md:py-5 rounded-full cursor-pointer "
        >
            <img
                class="text-gray-300"
                :src="require(`@/assets/plus.png`)"
                style="width: 25px; height: 25px"
            />
        </div>

        <Transition name="fade">
            <Importer
                v-if="showImporter"
                @close="showImporter = false"
            />
        </Transition>

        <ShortcutHandler>
        </ShortcutHandler>

    </div>
</template>

<script>
import Table from '@/components/Table.vue'
import AddRow from '@/components/AddRow.vue'
import Importer from '@/components/Importer.vue'
import Filter from '@/components/Filter.vue'
import ShortcutHandler from '@/components/ShortcutHandler.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    Table,
    AddRow,
    Importer,
    Filter,
    ShortcutHandler
  },
  data () {
    return {
      showImporter: false,
      activeEdit: false,
      activeFilter: false,
      activeTotal: false,
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
      this.activeFilter = !this.activeFilter
    },
    showTotal () {
      this.activeTotal = !this.activeTotal
    },
    updateRow (rowData) {
      this.rows = rowData
    },

    importData () {},
    deleteSelected () {
      console.log('delete')
      this.removeRows(this.getSelectedRows())
    },
    ...mapActions(['fetchRows', 'getSelected', 'removeRows', 'editRows'])
  },
  computed: {
    ...mapGetters(['getSelectedRows'])
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

.fade-enter-from {
    opacity: 0;
}
.fade-enter-active {
    transition: all 0.3s ease;
}
.fade-leave-to {
    opacity: 0;
}
.fade-leave-active {
    transition: all 0.3s ease;
}
</style>
