const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const app = express();
app.use(fileUpload());

app.post("/extract", async (req, res) => {
  try {
    if (!req.files || !req.files.file) {
      return res.status(400).json({ ok: false, error: "No file uploaded" });
    }

    const file = req.files.file;
    const ext = file.name.toLowerCase().split(".").pop();

    let text = "";

    if (ext === "pdf") {
      // Procesar PDF
      const pdfData = await pdfParse(file.data);
      text = pdfData.text;
    } else if (ext === "docx") {
      // Procesar DOCX
      const result = await mammoth.extractRawText({ buffer: file.data });
      text = result.value;
    } else {
      return res.status(400).json({ ok: false, error: "Formato no soportado" });
    }

    res.json({ ok: true, text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: "Error procesando archivo" });
  }
});

app.listen(4000, () => {
  console.log("PDF/DOCX server running on http://localhost:4000");
});