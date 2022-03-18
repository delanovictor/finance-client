<template>
    <transition name="slide-fade">
        <div class="modal-mask">
            <div class="modal-wrapper">

                <div class="modal-container bg-gray-800  ">
                    <div class="modal-close float-right ml-2">
                        <button
                            class="modal-default-button"
                            @click="$emit('close')"
                        >
                            X
                        </button>
                    </div>

                    <div
                        v-if="!imported"
                        class="flex justify-center"
                    >
                        <label
                            for="importer"
                            class="px-60 py-36 border-dashed border-red-600 border-2 cursor-pointer"
                            accept=".csv"
                        >
                            Importar
                        </label>
                        <input
                            type="file"
                            name="importer"
                            id="importer"
                            class="hidden"
                            @change="importFile"
                        >
                    </div>

                    <div
                        v-if="imported"
                        class=" "
                    >
                        <div class="edit-rows overflow-auto">
                            <AddRow
                                v-for="(rowData, index) in newRows"
                                :key="index"
                                :index="index"
                                :date="rowData.date"
                                :class="[index % 2 == 0 ? 'bg-gray-800' : 'bg-gray-900', 'text-gray-100']"
                                v-model:description="rowData.description"
                                v-model:value="rowData.value"
                                v-model:category="rowData.category"
                                v-model:paymentType="rowData.paymentType"
                                v-on:delete-row="deleteThisRow(index)"
                            />
                        </div>

                        <div class="flex justify-end pt-4 cursor-pointer">
                            <button
                                @click="saveRows"
                                class="rounded-3xl px-10 py-3 bg-green-800 text-gray-100 font-bold"
                            >Salvar</button>
                        </div>
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
