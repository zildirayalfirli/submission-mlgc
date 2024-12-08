import sharp from 'sharp';

export async function validateImageDimensions(imageBuffer) {
    try {
        const metadata = await sharp(imageBuffer).metadata();
        console.log("Image dimensions:", metadata.width, "x", metadata.height);

        return metadata.width !== 3126 || metadata.height !== 4697;
    } catch (error) {
        console.error("Error checking image dimensions:", error.message);
        throw new Error("Gagal memvalidasi dimensi gambar.");
    }
}
