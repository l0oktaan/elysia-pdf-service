// src/pdf.ts
import puppeteer from 'puppeteer'
import { renderReportHtml } from './templates/report'
import type { ReportData } from './types/report'
import { chrome } from 'chrome-paths'

import { AssetService } from './types/service';

export class PDFService {
  private assetService: AssetService;

  constructor() {
    this.assetService = new AssetService();
  }
  /**
 * สร้าง PDF จากข้อมูล ReportData
 * @param data - ข้อมูลรายงานทั้งหมด (meta + items)
 * @returns Buffer ของไฟล์ PDF
 */
async createPdf(data: ReportData): Promise<Buffer> {
  // เปิด Browser (Chromium) แบบ headless
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chrome,
    args: ['--no-sandbox']
  })

  try {
    const page = await browser.newPage()
  
     // เตรียม assets
      const fontBase64 = this.assetService.getFontBase64();
      const logoBase64 = this.assetService.getLogoBase64();

    // เปิด HTML ที่เราสร้างจาก Template
    const html = renderReportHtml(data,fontBase64, logoBase64)
  
    // ใส่ HTML เข้าไปใน page
    await page.setContent(html, {
      waitUntil: ['load', 'domcontentloaded', 'networkidle0']
    })
  
    // ตัวเลือก PDF
    // รอให้ฟอนต์โหลด
      await page.evaluate(async () => {
        await document.fonts.ready;
      });

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,     // ให้แสดงสีพื้นหลังทั้งหมด
      //preferCSSPageSize: true,   // ใช้ @page จาก CSS ถ้ามี
      margin: {
        top: '0mm',
        right: '0mm',
        bottom: '0mm',
        left: '0mm'
      }
    })
  
    return pdf
    
  } finally {
    await browser.close()
    
  }
}

}

