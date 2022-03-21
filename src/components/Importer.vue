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

                    <div class="modal-body">
                        <div class="edit-rows overflow-auto border-2 border-gray-700 rounded-2xl overflow-x-hidden">

                            <TransitionGroup
                                name="list"
                                tag="ul"
                            >
                                <li
                                    v-for="(rowData, index) in newRows"
                                    :key="rowData.key"
                                >

                                    <AddRow
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

                                </li>

                            </TransitionGroup>

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
                    newRow.paymentType = 'Cartão'
                  }

                  newRow.description = description.join('-')

                  newRow.category = self.guessCategory(newRow.description)

                  break
                case 2:
                  newRow.value = column
                  break
                case 3:
                  newRow.total = column
                  break
              }
            })

            newRow.key = Math.random().toString()

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
        date: today,
        key: Math.random().toString()
      })
    },
    guessCategory (description) {
      let guess = 'Outros>Indefinido'

      if (description) {
        const categories = {
          'Transporte>Onibus': ['GUICHE VIRTUAL'],
          'Transporte>Uber': ['UBER'],
          'Casa>Spotify': ['SPOTIFY']
        }

        for (const category in categories) {
          categories[category].forEach((keyWord) => {
            if (description.includes(keyWord)) {
              guess = category
            }
          })
        }
      }

      console.log(guess)
      return guess
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
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
    overflow: hidden;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    overflow: hidden;
}

.modal-container {
    width: 1000px;
    margin: 25px auto;
    padding: 20px 30px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);

    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
    transition: height 1s ease;
    max-height: 55vh;
}

.edit-rows {
    height: 50vh;
}
</style>
