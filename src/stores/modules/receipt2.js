import { defineStore } from 'pinia'

export const useReceiptStore2 = defineStore('receipt2', {
  actions: {
    formatReceiptCA(detail, customer, items) {
        const lineWidth = 40; // กำหนดความกว้างของบรรทัด
  
        let receiptData = `
  ${this.padCenter('บริษัท วันทูเทรดดิ้ง จำกัด', lineWidth)}
  ${this.padCenter('58/3 หมู่ที่ 6 ถ.พระประโทน-บ้านแพ้ว', lineWidth)}
  ${this.padCenter('ต.ตลาดจินดา อ.สามพราน จ.นครปฐม 73110', lineWidth)}
  ${this.padCenter('โทร.(034) 981-555', lineWidth)}
  ${this.padCenter('เลขประจำตัวผู้เสียภาษี 0105563063410', lineWidth)}
  ${this.padCenter('ออกใบกำกับภาษีโดยสำนักงานใหญ่', lineWidth)}
  ${this.padCenter('(บิลเงินสด/ใบกำกับภาษี)', lineWidth)}
  ${this.padCenter('เอกสารออกเป็นชุด', lineWidth)}
  \nรหัสลูกค้า: ${customer.customercode}${this.padRight('', lineWidth - customer.customercode.length - 14)}เลขที่: ${detail.CUOR}\n
  ชื่อลูกค้า: ${customer.customername}${this.padRight('', lineWidth - customer.customername.length - 14)}วันที่: ${detail.OAORDT}\n
  ที่อยู่: ${this.breakText(customer.address1 + ' ' + customer.address2 + ' ' + customer.address3 + ' ' + customer.postcode, lineWidth)}\n
  เลขผู้เสียภาษี: ${customer.taxno}\n\n
  รายการสินค้า      จำนวน   ราคา   ส่วนลด   รวม\n
        `;
  
        items.forEach(item => {
          const total = (item.itemamount * item.OBORQA) - item.discount;
          receiptData += `${this.padRight(item.itemname, 20)} ${this.padLeft(item.OBORQA, 6)} ${this.padLeft(item.itemamount, 6)} ${this.padLeft(item.discount, 8)} ${this.padLeft(total.toFixed(2), 6)}\n`;
        });
  
        receiptData += `
  มูลค่าสินค้า       ${this.padLeft(detail.ex_vat.toFixed(2), 24)}
  ภาษีมูลค่าเพิ่ม 7% ${this.padLeft(detail.vat.toFixed(2), 24)}
  ส่วนลดท้ายบิล     ${this.padLeft('0.00', 24)}
  ส่วนลดร้านค้า      ${this.padLeft('0.00', 24)}
  มูลค่ารวม        ${this.padLeft(detail.total.toFixed(2), 24)}
        `;
  
        return receiptData;
      },
      padCenter(text, length) {
        if (!text) text = '';
        if (text.length >= length) return text;
        const padding = ' '.repeat((length - text.length) / 2);
        return padding + text + padding;
      },
      padRight(text, length) {
        if (!text) text = '';
        if (text.length >= length) return text;
        return text + ' '.repeat(length - text.length);
      },
      padLeft(text, length) {
        if (!text) text = '';
        text = text.toString();
        if (text.length >= length) return text;
        return ' '.repeat(length - text.length) + text;
      },
      breakText(text, maxLength) {
        if (!text) return '';
        const words = text.split(' ');
        let result = '';
        let line = '';
  
        words.forEach(word => {
          if ((line + word).length > maxLength) {
            result += line.trim() + '\n';
            line = word + ' ';
          } else {
            line += word + ' ';
          }
        });
  
        result += line.trim();
        return result;
      }
  }
});
