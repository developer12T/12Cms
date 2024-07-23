import { defineStore } from 'pinia';
import { sprintf } from 'sprintf-js';

export const useReceiptStore = defineStore('receipt', {
  state: () => ({
    receiptData: null,
    vowelAndToneMark: ['่', '้', '๊', '๋', 'ั', '็', 'ิ', 'ี', 'ุ', 'ู', 'ึ', 'ื', '์', '.']
  }),
  actions: {
    getNoOfUpperLowerChar(string) {
      let counter = 0;
      for (let char of string) {
        if (this.vowelAndToneMark.includes(char)) {
          counter++;
        }
      }
      return counter;
    },
    // leftRightText(frontText, backText, width) {
    //   const frontTextSpaces = Math.floor((width / 2) + this.getNoOfUpperLowerChar(frontText));
    //   const backTextSpaces = Math.floor((width / 2) + this.getNoOfUpperLowerChar(backText));
    //   return `${frontText.padEnd(frontTextSpaces)}${backText.padStart(backTextSpaces)}`;
    // },
    leftRightText2(left, right, width) {
      const leftLength = left.length + this.getNoOfUpperLowerChar(left);
      const rightLength = right.length + this.getNoOfUpperLowerChar(right);
      const space = Math.max(0, width - leftLength - rightLength);
      return left + ' '.repeat(space) + right;
    },
    leftRightText(left, right, width) {
      const space = Math.max(0, width - left.length - right.length);
      return left + ' '.repeat(space) + right;
    },
    // centerText(text, width) {
    //   const textLength = text.length + this.getNoOfUpperLowerChar(text);
    //   const leftPadding = Math.max(0, Math.floor((width - textLength) / 2));
    //   return ' '.repeat(leftPadding) + text;
    // },
    // centerText(text, width) {
    //   const textLength = text.length + this.getNoOfUpperLowerChar(text);
    //   const leftPadding = Math.max(0, Math.floor((width - textLength) / 2));
    //   const rightPadding = width - leftPadding - textLength;
    //   return ' '.repeat(leftPadding) + text + ' '.repeat(rightPadding);
    // },
    centerText(text, width) {
      const leftPadding = Math.max(0, Math.floor((width - text.length) / 2));
      return ' '.repeat(leftPadding) + text;
    },
    leftText(text, width) {
      return text.padEnd(width);
    },
    rightText(text, width) {
      return text.padStart(width);
    },
    padThaiText(text, length) {
      let extraSpaces = this.getNoOfUpperLowerChar(text);
      return text.padEnd(length + extraSpaces);
    },

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

      const header = `
${this.centerText('บริษัท วันทูเทรดดิ้ง จำกัด', paperWidth)}
${this.centerText('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว', paperWidth)}
${this.centerText('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110', paperWidth)}
${this.centerText('โทร.(034) 981-555', paperWidth)}
${this.centerText('เลขประจำตัวผู้เสียภาษี 0105563063410', paperWidth)}
${this.centerText('ออกใบกำกับภาษีโดยสำนักงานใหญ่', paperWidth)}
${this.centerText('(บิลเงินสด/ใบกำกับภาษี)', paperWidth)}
${this.centerText('เอกสารออกเป็นชุด', paperWidth)}
${this.leftRightText(`รหัสลูกค้า ${data.customer.customercode}`, `เลขที่ ${data.CUOR}`, paperWidth)}
${this.leftRightText(`ชื่อลูกค้า ${this.padThaiText(data.customer.customername, 42)}`, `วันที่ ${data.OAORDT}`, paperWidth)}
ที่อยู่ ${data.customer.address1}
${data.customer.address2} 
${data.customer.address3} ${data.customer.postcode} 
เลขที่ผู้เสียภาษี ${data.customer.taxno}

รายการสินค้า                         จำนวน    ราคา     ส่วนลด       รวม
`;

      const formatItem = (no, name, qty, price, discount, total) => {
        const itemQty = this.padThaiText(qty, 7);
        const itemPrice = this.padThaiText(this.rightText(price, 6), 6);
        const itemDiscount = discount.padStart(6);
        const itemTotal = total.padStart(11);

        return `${no} ${this.padThaiText(name, 31)} ${itemQty} ${itemPrice} ${itemDiscount} ${itemTotal}`;
      };

      const items = data.items.map((item,index) => formatItem(
        // item.itemNo.toString(),
        index+1,
        item.itemname.replace(' ','').substring(0,36),
        item.qtytext,
        item.OBSAPR,
        item.disamount,
        item.itemamount
      )).join('\n');
      const totalText = thaiNumberToWords(data.totaltext);
      const footer = `

${this.leftRightText('รวมมูลค่าสินค้า', `${data.ex_vat}`, '73')}
${this.leftRightText('ส่วนลด', '0.00', '70')}
${this.leftRightText('ภาษีมูลค่าเพิ่ม 7%', `${data.vat}`, '74')}
${this.leftRightText('ส่วนลดท้ายบิล', '0.00', paperWidth)}
${this.leftRightText('ส่วนลดร้านค้า', `${data.totaldis}`, paperWidth)}
${this.leftRightText('จำนวนเงินรวมสุทธิ', `${data.total}`, paperWidth)}
${this.rightText(`(${totalText})`, paperWidth)}
${this.leftRightText('', '', '70')}
${this.leftRightText(`ผู้รับเงิน ${data.OBSMCD}`, '.........................', '70')}
${this.leftRightText('', 'ลายเซ็นลูกค้า', '63')}



      `;

      return header + items + footer;
    },

    formatReceiptCopyCA(data) {
      const paperWidth = 72;

      const header = `
${this.centerText('บริษัท วันทูเทรดดิ้ง จำกัด', paperWidth)}
${this.centerText('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว', paperWidth)}
${this.centerText('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110', paperWidth)}
${this.centerText('โทร.(034) 981-555', paperWidth)}
${this.centerText('เลขประจำตัวผู้เสียภาษี 0105563063410', paperWidth)}
${this.centerText('ออกใบกำกับภาษีโดยสำนักงานใหญ่', paperWidth)}
${this.centerText('(สำเนาบิลเงินสด/ใบกำกับภาษี)', paperWidth)}
${this.centerText('เอกสารออกเป็นชุด', paperWidth)}
${this.leftRightText(`รหัสลูกค้า ${data.customer.customercode}`, `เลขที่ ${data.CUOR}`, paperWidth)}
${this.leftRightText(`ชื่อลูกค้า ${this.padThaiText(data.customer.customername, 42)}`, `วันที่ ${data.OAORDT}`, paperWidth)}
ที่อยู่ ${data.customer.address1}
${data.customer.address2} 
${data.customer.address3} ${data.customer.postcode} 
เลขที่ผู้เสียภาษี ${data.customer.taxno}

รายการสินค้า                         จำนวน    ราคา     ส่วนลด       รวม
`;

      const formatItem = (no, name, qty, price, discount, total) => {
        const itemQty = this.padThaiText(qty, 7);
        const itemPrice = this.padThaiText(this.rightText(price, 6), 6);
        const itemDiscount = discount.padStart(6);
        const itemTotal = total.padStart(11);

        return `${no} ${this.padThaiText(name, 31)} ${itemQty} ${itemPrice} ${itemDiscount} ${itemTotal}`;
      };

      const items = data.items.map((item, index) => formatItem(
        // item.itemNo.toString(),
        index+1,
        item.itemname.replace(' ','').substring(0,36),
        item.qtytext,
        item.OBSAPR,
        item.disamount,
        item.itemamount
      )).join('\n');
      const totalText = thaiNumberToWords(data.totaltext);
      const footer = `

${this.leftRightText('รวมมูลค่าสินค้า', `${data.ex_vat}`, '73')}
${this.leftRightText('ส่วนลด', '0.00', '70')}
${this.leftRightText('ภาษีมูลค่าเพิ่ม 7%', `${data.vat}`, '74')}
${this.leftRightText('ส่วนลดท้ายบิล', '0.00', paperWidth)}
${this.leftRightText('ส่วนลดร้านค้า', `${data.totaldis}`, paperWidth)}
${this.leftRightText('จำนวนเงินรวมสุทธิ', `${data.total}`, paperWidth)}
${this.rightText(`(${totalText})`, paperWidth)}
${this.leftRightText('', '', '70')}
${this.leftRightText(`ผู้รับเงิน ${data.OBSMCD}`, '.........................', '70')}
${this.leftRightText('', 'ลายเซ็นลูกค้า', '63')}



      `;

      return header + items + footer;
    },

    formatReceiptCopyCAtest(data) {
      const paperWidth = 72;

      const header = `
${this.centerText('บริษัท วันทูเทรดดิ้ง จำกัด', paperWidth)}
${this.centerText('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว', paperWidth)}
${this.centerText('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110', paperWidth)}
${this.centerText('โทร.(034) 981-555', paperWidth)}
${this.centerText('เลขประจำตัวผู้เสียภาษี 0105563063410', paperWidth)}
${this.centerText('ออกใบกำกับภาษีโดยสำนักงานใหญ่', paperWidth)}
${this.centerText('(สำเนาบิลเงินสด/ใบกำกับภาษี)', paperWidth)}
${this.centerText('เอกสารออกเป็นชุด', paperWidth)}
${this.leftRightText(`รหัสลูกค้า ${data.customer.customercode}`, `เลขที่ ${data.CUOR}`, paperWidth)}
${this.leftRightText(`ชื่อลูกค้า ${this.padThaiText(data.customer.customername,37)}`, `วันที่ ${data.OAORDT}`, paperWidth)}
ที่อยู่ ${data.customer.address1}
${data.customer.address2} 
${data.customer.address3} ${data.customer.postcode} 
เลขที่ผู้เสียภาษี ${data.customer.taxno}

รายการสินค้า                         จำนวน   ราคา      ส่วนลด       รวม
`;

      const formatItem = (no, name, qty, price, discount, total) => {
        const itemQty = qty.padStart(1);
        const itemPrice = price.padStart(8);
        const itemDiscount = discount.padStart(8);
        const itemTotal = total.padStart(11);

        return `${no} ${this.padThaiText(name, 35)} ${itemQty} ${itemPrice} ${itemDiscount} ${itemTotal}`;
      };

      const items = data.items.map((item) => formatItem(
        item.itemNo.toString(),
        item.itemname.replace(' ',''),
        item.OBORQA.toString(),
        parseFloat(item.OBSAPR).toFixed(2),
        parseFloat(item.disamount).toFixed(2),
        parseFloat(item.itemamount).toFixed(2)
      )).join('\n');
      const totalText = thaiNumberToWords(data.totaltext);
      const footer = `

${this.leftRightText('รวมมูลค่าสินค้า', `${parseFloat(data.ex_vat).toFixed(2)}`, '73')}
${this.leftRightText('ส่วนลด', '0.00', '70')}
${this.leftRightText('ภาษีมูลค่าเพิ่ม 7%', `${parseFloat(data.vat).toFixed(2)}`, '74')}
${this.leftRightText('ส่วนลดท้ายบิล', '0.00', paperWidth)}
${this.leftRightText('ส่วนลดร้านค้า', `${parseFloat(data.totaldis).toFixed(2)}`, paperWidth)}
${this.leftRightText('จำนวนเงินรวมสุทธิ', `${parseFloat(data.total).toFixed(2)}`, paperWidth)}
${this.leftText(`(${totalText})`, paperWidth)}
${this.leftRightText('', '', '70')}
${this.leftRightText(`ผู้รับเงิน ${data.OBSMCD}`, '.........................', '70')}
${this.leftRightText('', 'ลายเซ็นลูกค้า', '63')}
      `;

      return header + items + footer;
    },

    formatReceiptCAtest(data) {
      const paperWidth = 72;

      const header = `
${this.centerText('บริษัท วันทูเทรดดิ้ง จำกัด', paperWidth)}
${this.centerText('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว', paperWidth)}
${this.centerText('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110', paperWidth)}
${this.centerText('โทร.(034) 981-555', paperWidth)}
${this.centerText('เลขประจำตัวผู้เสียภาษี 0105563063410', paperWidth)}
${this.centerText('ออกใบกำกับภาษีโดยสำนักงานใหญ่', paperWidth)}
${this.centerText('(บิลเงินสด/ใบกำกับภาษี)', paperWidth)}
${this.centerText('เอกสารออกเป็นชุด', paperWidth)}
${this.leftRightText(`รหัสลูกค้า ${data.customer.customercode}`, `เลขที่ ${data.CUOR}`, paperWidth)}
${this.leftRightText(`ชื่อลูกค้า ${data.customer.customername}`, `วันที่ ${data.OAORDT}`, paperWidth)}
ที่อยู่ ${data.customer.address1}
${data.customer.address2} 
${data.customer.address3} ${data.customer.postcode} 
เลขที่ผู้เสียภาษี ${data.customer.taxno}

รายการสินค้า                     จำนวน     ราคา      ส่วนลด     รวม
`;

      const splitName = (name) => {
        const index = name.lastIndexOf(' x');
        if (index !== -1) {
          return [name.substring(0, index), name.substring(index)];
        }
        return [name, ''];
      };

      const formatItem = (name, qty, price, discount, total) => {
        const [itemName1, itemName2] = splitName(name);
        const itemQty = qty.padStart(8);
        const itemPrice = price.padStart(10);
        const itemDiscount = discount.padStart(10);
        const itemTotal = total.padStart(12);

        const line1 = `${this.padThaiText(itemName1, 25)} ${itemQty} ${itemPrice} ${itemDiscount} ${itemTotal}`;
        const line2 = itemName2 ? `${this.padThaiText(itemName2, 25)}` : '';

        return line2 ? `${line1}\n${line2}` : line1;
      };

      const items = data.items.map((item, index) => formatItem(
        item.itemname,
        item.OBORQA.toString(),
        parseFloat(item.OBSAPR).toFixed(2),
        '0.00',
        parseFloat(item.itemamount).toFixed(2)
      )).join('\n');

      const totalText = thaiNumberToWords(data.totaltext);
      const footer = `
${this.leftRightText('รวมมูลค่าสินค้า', `${parseFloat(data.ex_vat).toFixed(2)}`, paperWidth)}
${this.leftRightText('ส่วนลด', '0.00', paperWidth)}
${this.leftRightText('ภาษีมูลค่าเพิ่ม 7%', `${parseFloat(data.vat).toFixed(2)}`, paperWidth)}
${this.leftRightText('ส่วนลดท้ายบิล', '0.00', paperWidth)}
${this.leftRightText('ส่วนลดร้านค้า', '0.00', paperWidth)}
${this.leftRightText('จำนวนเงินรวมสุทธิ', `${parseFloat(data.total).toFixed(2)}`, paperWidth)}

${this.leftRightText('  ', `(${totalText})`, paperWidth)}
${this.leftRightText('', '', paperWidth)}
${this.leftRightText(`ผู้รับเงิน ${data.OBSMCD}`, '.........................', paperWidth)}
${this.leftRightText('', 'ลายเซ็นลูกค้า', '63')}
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