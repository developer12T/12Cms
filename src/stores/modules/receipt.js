import { defineStore } from 'pinia'

export const useReceiptStore = defineStore('receipt', {
  state: () => ({
    receiptData: null
  }),
  actions: {
    formatReceiptData(data) {
      const header = `
        Order No: ${data.orderNo}
        Order Date: ${data.orderDate}
        Name: ${data.name}
        Address: ${data.address}
        Salesman: ${data.saleMan}
      `;

      const items = data.list.map(item => `
        ${item.name}
        ${item.qtyText} x ${item.pricePerQty} = ${item.summaryPrice}
      `).join('\n');

      const footer = `
        Total Price: ${data.totalPrice}
        Total Ex VAT: ${data.totalExVat}
        Total Discount: ${data.totalDiscount}
        Status: ${data.statusText}
      `;

      return header + '\n' + items + '\n' + footer;
    }
  }
});
