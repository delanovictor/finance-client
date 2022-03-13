import { createStore } from "vuex";
import TransactionService from "@/TransactionService.js";

// Create a new store instance.
const store = createStore({
  state: {
    rows: [],
    selectedRows: [],
    options: [
      {
        category: "Outros",
        subCategory: ["Indefinido"],
      },
      {
        category: "Transporte",
        subCategory: ["Uber", "Gasolina", "Onibus"],
      },
      {
        category: "Casa",
        subCategory: ["Mercado", "Internet", "Spotify"],
      },
      {
        category: "Lazer",
        subCategory: ["Livros", "Jogos", "Comida Diferente"],
      },
      {
        category: "Doação",
        subCategory: ["Animais"],
      },
      {
        category: "Emprestado",
        subCategory: ["Mãe", "Pai", "Letícia"],
      },
    ],
    paymentTypes: [
      'Pix',
      'Cartão',
      'Dinheiro'
    ]
  },
  mutations: {
    setRows(state, payload) {
      state.rows = payload;
    },
    setSelectedRows(state, payload) {
      state.selectedRows = payload;
    },
  },
  actions: {
    async fetchRows(state) {
      const rows = await TransactionService.getTransactions();
      state.commit("setRows", rows);
    },
    async appendRows({ getters, commit }, newRows) {
      const allRows = await TransactionService.addTransactions(newRows);

      commit("setRows", allRows);
    },
    async removeRows({ getters, commit }, removedRows) {
      if (removedRows) {
        if (removedRows.length > 0) {
          const allRows = await TransactionService.deleteTransactions(removedRows);

          commit("setRows", allRows);
          commit("setSelectedRows", []);
        }
      }
    },
    async toggleSelectedRow({ getters, commit }, data) {
      const tempRows = getters.getSelectedRows();

      if (tempRows.indexOf(data._id) === -1) {
        tempRows.push(data._id);
      } else {
        tempRows.splice(tempRows.indexOf(data._id), 1);
      }

      commit("setSelectedRows", tempRows);
    },
    async editRows({ getters, commit }, edit) {
      const selectedRows = getters.getSelectedRows();
      const allRows = getters.getRows;

      const editData = {
        transactionIDs: selectedRows,
        data: edit
      }

      const response = await TransactionService.editTransactions(editData)

      if (response.acknowledged) {
        for (const key in edit) {
          for (const row of allRows) {
            if (selectedRows.indexOf(row._id) > -1) {
              row[key] = edit[key];

            }
          }
        }
        commit("setRows", allRows);
      }

      console.log('clear')
      commit("setSelectedRows", []);
    },
    async editSingleRow({ getters, commit }, edit) {
      const allRows = getters.getRows;

      const editData = {
        transactionIDs: [edit._id],
        data: {
          [edit.field]: edit.value
        }
      }

      const response = await TransactionService.editTransactions(editData)

      if (response.acknowledged) {

        for (const row of allRows) {
          if (edit._id === row._id) {
            row[edit.field] = edit.value;
            break;
          }
        }
        commit("setRows", allRows);
      }

    }

  },
  modules: {},
  getters: {
    getRows: (state) => state.rows,
    getSelectedRows: (state) => (id) => {
      if (id) {
        if (state.selectedRows) {
          return state.selectedRows.indexOf(id) != -1
        } else {
          return false
        }
      }
      else {
        return state.selectedRows
      }
    },
    getCategories: (state) => state.options,
    getPaymentTypes: (state) => state.paymentTypes,

  },
});
export default store;
