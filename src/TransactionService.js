import axios from "axios";

const url = "http://localhost:5000/api/transactions/";

class TransactionService {
  static async getTransactions() {
    try {
      const response = await axios.get(url);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  static async addTransactions(newTransactions) {
    const response = await axios.post(url, {
      newTransactions,
    });

    return response.data;
  }

  static async editTransactions(transactionsToEdit) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      data: { transactionsToEdit },
      url: url + "edit",
    };

    const response = await axios(options);

    return response.data;
  }

  static async deleteTransactions(transactionsToDelete) {
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      data: { transactionsToDelete },
      url: url + "delete",
    };

    const response = await axios(options);
    return response.data;
  }
}

export default TransactionService;
