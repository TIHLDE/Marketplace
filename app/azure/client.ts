import { BlobServiceClient } from '@azure/storage-blob'; 


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error('AZURE_STORAGE_CONNECTION_STRING must be set');
}

const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

export const containerName = 'marketplace';

// export const pngContainerName = `${baseContainerName}-png`;
// export const jpegContainerName = `${baseContainerName}-jpeg`;
// export const svgContainerName = `${baseContainerName}-svg`;
// export const gifContainerName = `${baseContainerName}-gif`;


export default blobServiceClient;
