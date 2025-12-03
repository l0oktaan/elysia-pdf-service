// // src/index.ts
// import { Elysia } from 'elysia'
// import { swagger } from '@elysiajs/swagger'
// import { generateReportPdf, ReportData } from './pdf'

// const app = new Elysia()
//   .use(swagger())
//   .get('/', () => ({
//     message: 'Hello from Elysia PDF Service'
//   }))
//   .post('/api/pdf/report', async ({ body, set }) => {
//     // รับ JSON จาก client
//     const data = body as ReportData

//     console.log('Generate report PDF from JSON:', data)

//     try {
//       const pdfBuffer = await generateReportPdf(data)

//       // ตั้ง header ว่าเป็น PDF
//       set.headers['Content-Type'] = 'application/pdf'
//       set.headers['Content-Disposition'] = 'inline; filename="report.pdf"'

//       // ส่ง binary PDF กลับ
//       return new Response(pdfBuffer)
//     } catch (err) {
//       console.error('PDF error:', err)
//       set.status = 500
//       return { error: 'failed to generate pdf' }
//     }
//   })
//   .listen(3000)

// console.log('🟢 Elysia PDF Service is running on http://localhost:3000')
import { Elysia } from 'elysia'
import { swagger } from '@elysiajs/swagger'
import { staticPlugin } from '@elysiajs/static'
import { PDFService  } from './pdf'
import type { ReportData } from './types/report'
// import { PDFService } from './types/service';

const pdfService = new PDFService();

const app = new Elysia()
  .use(swagger())
  .use(staticPlugin({
    assets: 'design',   // โฟลเดอร์ที่เก็บไฟล์ html
    prefix: '/design',  // URL prefix
  }))

  

  .get('/', () => ({
    message: 'PDF Service'
  }))
  .post('/api/pdf/report', async ({ body }) => {
    const data = body as ReportData

    try {
      const pdfBuffer = await pdfService.createPdf(data)

      // ✅ ส่งกลับเป็น Response ของ PDF
      return new Response(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          // inline = เปิดใน browser, attachment = ให้ดาวน์โหลด
          'Content-Disposition': 'inline; filename="report.pdf"',
        },
      })
    } catch (err) {
      console.error('PDF error:', err)

      return new Response(
        JSON.stringify({ message: 'Failed to generate PDF' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      )
    }
  })
  .listen(3000)

console.log("Service running at http://localhost:3000")
