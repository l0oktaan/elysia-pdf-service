// src/pdf.ts
import puppeteer from 'puppeteer'
import { renderReportHtml } from './templates/report'
import type { ReportData } from './types/report'
import { chrome } from 'chrome-paths'

/**
 * สร้าง PDF จากข้อมูล ReportData
 * @param data - ข้อมูลรายงานทั้งหมด (meta + items)
 * @returns Buffer ของไฟล์ PDF
 */
export async function createPdf(data: ReportData): Promise<Buffer> {
  // เปิด Browser (Chromium) แบบ headless
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: chrome,
    args: ['--no-sandbox']
  })

  const page = await browser.newPage()

  // เปิด HTML ที่เราสร้างจาก Template
  const html = renderReportHtml(data)

  // ใส่ HTML เข้าไปใน page
  await page.setContent(html, {
    waitUntil: 'networkidle0'
  })

  // ตัวเลือก PDF
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,     // ให้แสดงสีพื้นหลังทั้งหมด
    preferCSSPageSize: true,   // ใช้ @page จาก CSS ถ้ามี
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm'
    }
  })

  await browser.close()
  return pdf
}
