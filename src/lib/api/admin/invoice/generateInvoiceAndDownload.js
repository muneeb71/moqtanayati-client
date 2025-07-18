import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export async function generateInvoiceAndDownload(invoiceData) {
  const { userId, customerName, email, address, date, items } = invoiceData;

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]);
  const { width } = page.getSize();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const lineHeight = 20;
  let y = 780;
  const paddingLeft = 50;

  const drawText = (
    text,
    x,
    y,
    size = 12,
    color = rgb(0, 0, 0),
    isBold = false,
  ) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: isBold ? boldFont : font,
      color,
    });
  };

  const logoUrl = "/static/logo.png";

  // Load and draw logo
  if (logoUrl) {
    const logoBytes = await fetch(logoUrl).then((res) => res.arrayBuffer());
    const logoImage = await pdfDoc.embedPng(logoBytes);
    page.drawImage(logoImage, {
      x: paddingLeft,
      y: y - 30,
      width: 80,
      height: 40,
    });
  }

  // Draw "INVOICE" title
  drawText("INVOICE", width - 120, y, 24, rgb(0.2, 0.2, 0.6), true);
  y -= 60;

  // Invoice Metadata
  const invoiceNum = userId != null ? String(userId).slice(-5) : "XXXXX";

  drawText(
    `Invoice #: ${invoiceNum}`,
    paddingLeft,
    y,
    12,
    rgb(0, 0, 0.6),
    true,
  );
  drawText(`Date: ${date || new Date().toLocaleDateString()}`, width - 170, y);
  y -= lineHeight;

  drawText(`Customer: ${customerName || "N/A"}`, paddingLeft, y);
  if (email) {
    y -= lineHeight;
    drawText(`Email: ${email}`, paddingLeft, y);
  }
  if (address) {
    y -= lineHeight;
    drawText(`Address: ${address}`, paddingLeft, y);
  }

  y -= lineHeight * 2;

  // Table header
  drawText("Product", paddingLeft, y, 12, undefined, true);
  drawText("Qty", paddingLeft + 250, y, 12, undefined, true);
  drawText("Price", paddingLeft + 320, y, 12, undefined, true);
  drawText("Subtotal", paddingLeft + 400, y, 12, undefined, true);
  y -= 8;

  // Table divider
  page.drawLine({
    start: { x: paddingLeft, y },
    end: { x: width - paddingLeft, y },
    thickness: 1,
    color: rgb(0.8, 0.8, 0.8),
  });
  y -= lineHeight;

  // Items
  const total = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  items.forEach((item) => {
    drawText(item.name, paddingLeft, y);
    drawText(String(item.qty), paddingLeft + 250, y);
    drawText(`$${item.price}`, paddingLeft + 320, y);
    drawText(`$${item.qty * item.price}`, paddingLeft + 400, y);
    y -= lineHeight;
  });

  y -= lineHeight;

  // Total box
  page.drawRectangle({
    x: paddingLeft,
    y,
    width: width - 2 * paddingLeft,
    height: lineHeight + 10,
    color: rgb(0.95, 0.95, 1),
    borderColor: rgb(0.2, 0.2, 0.5),
    borderWidth: 1,
  });

  drawText(
    `Total: $${total}`,
    paddingLeft + 10,
    y + 7,
    14,
    rgb(0, 0.5, 0.2),
    true,
  );

  // Footer
  const footerY = 40;
  drawText(
    "Thank you for your business!",
    paddingLeft,
    footerY,
    10,
    rgb(0.5, 0.5, 0.5),
  );

  // Download
  const pdfBytes = await pdfDoc.save();
  const blob = new Blob([pdfBytes], { type: "application/pdf" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `invoice-${invoiceNum}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}
