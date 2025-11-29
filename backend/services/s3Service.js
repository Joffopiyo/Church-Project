const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Configure S3 Client
const s3Client = new S3Client({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

/**
 * Generate a signed URL for an S3 object
 * @param {string} key - The S3 object key
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 * @returns {Promise<string>} - The signed URL
 */
const generateSignedUrl = async (key, expiresIn = 3600) => {
    try {
        const command = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
        return signedUrl;
    } catch (error) {
        console.error('Error generating signed URL:', error);
        throw new Error('Failed to generate signed URL');
    }
};

module.exports = {
    s3Client,
    generateSignedUrl
};
