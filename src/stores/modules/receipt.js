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
    },

    formatReceiptCA(data) {
      const paperWidth = 72;
      const centerText = (text, width = paperWidth) => {
        const leftPadding = Math.max(0, Math.floor((width - text.length) / 2));
        return ' '.repeat(leftPadding) + text;
      };

      const leftRightText = (left, right, width = paperWidth) => {
        if (left.length + right.length > width) {
          left = left.substring(0, width - right.length - 3) + '...'; 
        }
        const space = Math.max(0, width - left.length - right.length);
        return left + ' '.repeat(space) + right;
      };

  const header = `
${centerText('บริษัท วันทูเทรดดิ้ง จำกัด')}
${centerText('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว')}
${centerText('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110')}
${centerText('โทร.(034) 981-555')}
${centerText('เลขประจำตัวผู้เสียภาษี 0105563063410')}
${centerText('ออกใบกำกับภาษีโดยสำนักงานใหญ่')}
${centerText('(บิลเงินสด/ใบกำกับภาษี)')}
${centerText('เอกสารออกเป็นชุด')}
${leftRightText(`รหัสลูกค้า ${data.customer.customercode}`, `เลขที่ ${data.CUOR}`)}
${leftRightText(`ชื่อลูกค้า ${data.customer.customername}`, `วันที่ ${data.OAORDT}`, paperWidth)}
ที่อยู่ ${data.customer.address1}
${data.customer.address2} 
${data.customer.address3} ${data.customer.postcode} 
เลขที่ผู้เสียภาษี ${data.customer.taxno}

รายการสินค้า                   จำนวน      ราคา     ส่วนลด       รวม
`;

  // const formatItem = (name, qty, price, discount, total) => {
  //   return `${name.substring(0, 32).padEnd(32)} ${qty.toString().padStart(1).padEnd(8)} ${price.padStart(1).padEnd(8)} ${discount.padEnd(8)} ${total.padEnd(10)}`;
  // };
const formatItem = (name, qty, price, discount, total) => {
  return sprintf(
    "%-32s %8s %8s %8s %10s",
    name.padEnd(32),
    qty.padStart(-1).padEnd(8),
    price.padEnd(8),
    discount.padEnd(8),
    total.padEnd(10)
  );
};

  const items = data.items.map(item => formatItem(
    item.itemname,
    item.OBORQA,
    parseFloat(item.OBSAPR).toFixed(2),
    '0.00',
    parseFloat(item.itemamount).toFixed(2)
  )).join('\n');

  const totalText = thaiNumberToWords(data.total);
  const footer = `

${leftRightText('รวมมูลค่าสินค้า', `${parseFloat(data.ex_vat).toFixed(2)}`, '73')}
${leftRightText('ส่วนลด', '0.00', '70')}
${leftRightText('ภาษีมูลค่าเพิ่ม 7%', `${parseFloat(data.vat).toFixed(2)}`, '74')}
${leftRightText('ส่วนลดท้ายบิล', '0.00', paperWidth)}
${leftRightText('ส่วนลดร้านค้า', '0.00', paperWidth)}
${leftRightText('จำนวนเงินรวมสุทธิ', `${parseFloat(data.total).toFixed(2)}`, paperWidth)}

${leftRightText('  ', `(${totalText})`, paperWidth)}
${leftRightText('', '', paperWidth)}
${leftRightText(`ผู้รับเงิน ${data.OBSMCD}`, '.........................', paperWidth)}
${leftRightText('', 'ลายเซ็นลูกค้า', '63')}
  `;

      return header + items + footer;
    }

  }
})

const convert = (number) => {
  const values = ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า', 'หก', 'เจ็ด', 'แปด', 'เก้า'];
  const places = ['', 'สิบ', 'ร้อย', 'พัน', 'หมื่น', 'แสน', 'ล้าน'];
  const exceptions = { 'หนึ่งสิบ': 'สิบ', 'สองสิบ': 'ยี่สิบ', 'สิบหนึ่ง': 'สิบเอ็ด' };

  let output = '';

  number.toString().split('').reverse().forEach((value, place) => {
    if (place % 6 === 0 && place > 0) {
      output = places[6] + output;
    }

    if (value !== '0') {
      output = values[value] + places[place % 6] + output;
    }
  });

  for (const [search, replace] of Object.entries(exceptions)) {
    output = output.replace(search, replace);
  }

  return output;
};

const thaiNumberToWords = (amount) => {
  const [integer, fraction] = Math.abs(amount).toFixed(2).split('.');

  const baht = convert(integer);
  const satang = convert(fraction);
  let output = amount < 0 ? 'ลบ' : '';
  output += baht ? baht + 'บาท' : '';
  output += satang ? satang + 'สตางค์' : 'ถ้วน';

  return baht + satang === '' ? 'ศูนย์บาทถ้วน' : output;
};