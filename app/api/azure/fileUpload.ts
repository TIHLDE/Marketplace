import blobServiceClient, { containerName } from "@/app/azure/client";
import { v4 } from "uuid";


const uploadFile = async (file: File) => {
    const blobName = `${v4()}-${file.name}`;
    const blobClient = blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobName);

    const imgData = await file.arrayBuffer();
    const buffer = Buffer.from(imgData);
    await blobClient.upload(buffer, buffer.length);
    return blobClient.url;
};


export default uploadFile;