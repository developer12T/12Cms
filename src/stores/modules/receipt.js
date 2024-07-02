import { defineStore } from 'pinia';
import { sprintf } from 'sprintf-js';

export const useReceiptStore = defineStore('receipt', {
  state: () => ({
    receiptData: null
  }),
  actions: {
    formatReceiptData(data) {
      const lineSeparator = '---------------------------------------------------------------------';

      const centerText = (text) => {
        const width = 66;
        const leftPadding = Math.floor((width - text.length) / 2);
        return ' '.repeat(leftPadding) + text;
      };

      const header = `
${lineSeparator}
${centerText('ใบรับสินค้า')}
${lineSeparator}
เลขที่: ${data.orderNo}
วันที่: ${data.orderDate}
ลูกค้า: ${data.name}
ที่อยู่: ${data.address}
ผู้ขาย: ${data.saleMan}
${lineSeparator}
      `;

      const itemsHeader = sprintf(
        "%-25s %5s %10s %9s %9s",
        "สินค้า", "ราคา", "ส่วนลด", "จำนวน", "รวม"
      ) + `
${lineSeparator}
`;

      const formatItem = (name, price, discount, qty, total) => {
        return sprintf(
          "%-25s %10s %10s %10s %10s",
          name.padEnd(25),
          price.padEnd(10),
          discount.padEnd(10),
          qty.padEnd(10),
          total.padEnd(5)
        );
      };

      const items = data.list.map(item => formatItem(
        item.name,
        parseFloat(item.pricePerQty).toFixed(2),
        parseFloat(item.itemDiscount).toFixed(2),
        item.qtyText,
        parseFloat(item.summaryPrice).toFixed(2)
      )).join('\n');

      const footer = `
${lineSeparator}
รวมทั้งสิ้น: ${parseFloat(data.totalPrice).toFixed(2).padStart(57)}
ก่อนภาษี: ${parseFloat(data.totalExVat).toFixed(2).padStart(58)}
ส่วนลด: ${parseFloat(data.totalDiscount).toFixed(2).padStart(59)}
สถานะ: ${data.statusText.padStart(60)}
${lineSeparator}
${centerText('ขอบคุณที่ใช้บริการ')}
      `;

      return header + itemsHeader + items + footer;
    },
    formatReceiptDataCn(data) {
      const lineSeparator = '---------------------------------------------------------------------';

      const centerText = (text) => {
        const width = 66;
        const leftPadding = Math.floor((width - text.length) / 2);
        return ' '.repeat(leftPadding) + text;
      };

      const header = `
${lineSeparator}
${centerText('ใบคืนสินค้า')}
${lineSeparator}
เลขที่: ${data.orderNo}
วันที่: ${data.orderDate}
ลูกค้า: ${data.name}
ที่อยู่: ${data.address}
ผู้ขาย: ${data.saleMan}
${lineSeparator}
      `;

      const itemsHeader = sprintf(
        "%-25s %5s %10s %9s %9s",
        "สินค้า", "ราคา", "ส่วนลด", "จำนวน", "รวม"
      ) + `
${lineSeparator}
`;

      const formatItem = (name, price, discount, qty, total) => {
        return sprintf(
          "%-25s %10s %10s %10s %10s",
          name.padEnd(25),
          price.padEnd(10),
          discount.padEnd(10),
          qty.padEnd(10),
          total.padEnd(5)
        );
      };

      const items = data.list.map(item => formatItem(
        item.name,
        parseFloat(item.pricePerQty).toFixed(2),
        parseFloat(item.itemDiscount).toFixed(2),
        item.qtyText,
        parseFloat(item.summaryPrice).toFixed(2)
      )).join('\n');

      const footer = `
${lineSeparator}
รวมทั้งสิ้น: ${parseFloat(data.totalPrice).toFixed(2).padStart(57)}
ก่อนภาษี: ${parseFloat(data.totalExVat).toFixed(2).padStart(58)}
ส่วนลด: ${parseFloat(data.totalDiscount).toFixed(2).padStart(59)}
สถานะ: ${data.statusText.padStart(60)}
${lineSeparator}
${centerText('ขอบคุณที่ใช้บริการ')}
      `;

      return header + itemsHeader + items + footer;
    }
  }
})
