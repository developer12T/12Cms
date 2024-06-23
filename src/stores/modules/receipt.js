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
        const width = 57; 
        const leftPadding = Math.floor((width - text.length) / 1.5);
        return ' '.repeat(leftPadding) + text;
      };

      const header = `
${lineSeparator}
${centerText('ใบเสร็จรับเงิน')}
${lineSeparator}
เลขที่: ${data.orderNo}
วันที่: ${data.orderDate}
ลูกค้า: ${data.name}
ที่อยู่: ${data.address}
ผู้ขาย: ${data.saleMan}
${lineSeparator}
      `;

      const itemsHeader = sprintf(
        "%-25s %7s %7s %6s %8s",
        "สินค้า", "ราคา", "ส่วนลด", "จำนวน", "รวม"
      ) + `
${lineSeparator}
`;

      const formatItem = (name, price, discount, qty, total) => {
        return sprintf(
          "%-25.25s %7.2f %7.2f %6s %8.2f",
          name, price, discount, qty, total
        );
      };

      const items = data.list.map(item => formatItem(
        item.name,
        parseFloat(item.pricePerQty),
        parseFloat(item.itemDiscount),
        item.qtyText,
        parseFloat(item.summaryPrice)
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
formatReceiptData2(data) {
  const header = `
    Order No: ${data.orderNo}
    Order Date: ${data.orderDate}
    Name: ${data.name}
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
},
    formatReceiptData3(data) {
      const lineSeparator = '----------------------------------------';

      const centerText = (text) => {
        const width = 40; 
        const leftPadding = Math.floor((width - text.length) / 2);
        return ' '.repeat(leftPadding) + text;
      };

      const header = `
${lineSeparator}
${centerText('ใบเสร็จรับเงิน')}
${lineSeparator}
เลขที่: ${data.orderNo}
วันที่: ${data.orderDate}
ลูกค้า: ${data.name}
ที่อยู่: ${data.address}
ผู้ขาย: ${data.saleMan}
${lineSeparator}
      `;

      const itemsHeader = sprintf(
        "%-15s %7s %7s %6s %8s",
        "สินค้า", "ราคา", "ส่วนลด", "จำนวน", "รวม"
      ) + `
${lineSeparator}
`;

      const formatItem = (name, price, discount, qty, total) => {
        return sprintf(
          "%-15.15s %7.2f %7.2f %6s %8.2f",
          name, price, discount, qty, total
        );
      };

      const items = data.list.map(item => formatItem(
        item.name,
        parseFloat(item.pricePerQty),
        parseFloat(item.itemDiscount),
        item.qtyText,
        parseFloat(item.summaryPrice)
      )).join('\n');

      const footer = `
${lineSeparator}
รวมทั้งสิ้น: ${parseFloat(data.totalPrice).toFixed(2).padStart(40)}
ก่อนภาษี: ${parseFloat(data.totalExVat).toFixed(2).padStart(41)}
ส่วนลด: ${parseFloat(data.totalDiscount).toFixed(2).padStart(42)}
สถานะ: ${data.statusText.padStart(43)}
${lineSeparator}
${centerText('ขอบคุณที่ใช้บริการ')}
      `;

      return header + itemsHeader + items + footer;
    }
  }
});
