declare module "pdf-parse/lib/pdf-parse.js" {
  interface PDFParseResult {
    text: string;
    info?: any;
    metadata?: any;
    version?: string;
  }

  const pdfParse: (buffer: Buffer) => Promise<PDFParseResult>;
  export default pdfParse;
}