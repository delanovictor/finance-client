<template>
    <transition name="slide-fade">
        <div class="modal-mask">
            <div class="modal-wrapper">

                <div class="modal-container bg-gray-800  rounded-xl">
                    <div class="modal-close float-right ml-2">
                        <button
                            class="modal-default-button"
                            @click="$emit('close')"
                        >
                            <img
                                :src="require(`@/assets/close.svg`)"
                                class="text-gray-300"
                                style="width: 25px; height: 25px"
                            />
                        </button>
                    </div>

                    <div class="">
                        <div class="edit-rows overflow-auto border-2 border-gray-700 rounded-2xl">

                            <AddRow
                                v-for="(rowData, index) in newRows"
                                :key="index"
                                :index="index"
                                :class="[index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-900', 'text-gray-100']"
                                :dateEditable="rowData.manual"
                                v-model:date="rowData.date"
                                v-model:description="rowData.description"
                                v-model:value="rowData.value"
                                v-model:category="rowData.category"
                                v-model:paymentType="rowData.paymentType"
                                v-on:delete-row="deleteThisRow(index)"
                            />
                        </div>

                    </div>
                    <div class="flex justify-between  self-center mx-5  pt-4 cursor-pointer bottom-0">
                        <div class="">
                            <label
                                for="importer"
                                class=""
                                accept=".csv"
                            >
                                <div class="rounded-3xl px-10 py-3 bg-purple-900  text-gray-100 font-bold cursor-pointer">Importar</div>

                            </label>
                            <input
                                type="file"
                                name="importer"
                                id="importer"
                                class="hidden"
                                @change="importFile"
                            >
                        </div>

                        <div class="w-full text-center flex justify-center">
                            <div
                                @click="createRow()"
                                class="  text-gray-300 text-4xl rounded-full py-3 px-3 bg-gray-500 hover:bg-gray-700"
                            >
                                <img
                                    :src="require(`@/assets/plus.png`)"
                                    class="text-gray-300"
                                    style="width: 20px; height: 20px"
                                />
                            </div>
                        </div>

                        <button
                            @click="saveRows"
                            class="rounded-3xl px-10 py-3 bg-green-800 text-gray-100 font-bold"
                        >Salvar</button>

                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import AddRow from '@/components/AddRow.vue'
import { mapActions } from 'vuex'

export default {
  components: { AddRow },
  data () {
    return {
      imported: false,
      newRows: []
    }
  },
  methods: {
    importFile (e) {
      const self = this
      const reader = new FileReader()

      reader.readAsText(e.srcElement.files[0])

      reader.onload = function () {
        const rawData = reader.result.split('\n').slice(6)
        rawData.forEach((row) => {
          if (row !== '') {
            const newRow = {}

            const columns = row.split(';')

            columns.forEach((column, index) => {
              switch (index) {
                case 0:
                  newRow.date = column
                    .replaceAll('/', '-')
                    .split('-')
                    .reverse()
                    .join('-')
                  break
                case 1:
                  const description = column.split('-')
                  const paymentString = description.shift()

                  if (paymentString.indexOf('PIX') > -1) {
                    newRow.paymentType = 'Pix'
                  } else {
                    // if (paymentString.indexOf('CARTAO') > -1) {
                    newRow.paymentType = 'Cartão'
                    // } else {
                    // newRow.paymentType = 'Cartão'
                    // }
                  }

                  newRow.description = description.join('-')

                  console.log(newRow)

                  break
                case 2:
                  newRow.value = column
                  break
                case 3:
                  newRow.total = column
                  break
              }
            })

            newRow.category = 'Outros>Indefinido'

            newRow.key = Math.random().toString()

            console.log(newRow)
            self.newRows.push(newRow)
          }

          self.imported = true
        })
      }

      reader.onerror = function () {
        console.log(reader.error)
      }
    },
    createRow () {
      const date = new Date()

      const year = date.getFullYear()

      let day = date.getDate()
      let month = date.getMonth() + 1

      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day

      const today = year + '-' + month + '-' + day

      console.log(today)
      this.newRows.unshift({
        manual: true,
        value: '0.00',
        category: 'Outros>Indefinido',
        paymentType: 'Pix',
        description: '',
        date: today
      })
    },
    async saveRows () {
      await this.appendRows(this.newRows)
      this.$emit('close')
    },
    deleteThisRow (index) {
      this.newRows.splice(index, 1)
    },

    ...mapActions(['appendRows'])
  }
}
</script>
<style >
.edit-rows {
    min-height: 400px;
    max-height: 600px;
}
</style>
