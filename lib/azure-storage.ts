import { BlobServiceClient } from "@azure/storage-blob";

export async function uploadCVToBlob(
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<string> {
  const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "cvs";

  if (!connectionString) {
    console.warn("AZURE_STORAGE_CONNECTION_STRING no está configurada.");
    return "";
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);

    // Crea el contenedor si no existe
    await containerClient.createIfNotExists({ access: "container" });

    // Nombre único para evitar sobrescribir archivos
    const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const blobName = `${Date.now()}-${cleanFileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Subir el archivo
    await blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: mimeType || "application/octet-stream" },
    });

    return blockBlobClient.url;
  } catch (error) {
    console.error("Error al subir archivo a Azure Blob Storage:", error);
    return "";
  }
}