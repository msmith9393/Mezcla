import aws from 'aws-sdk';
import uniqid from 'uniqid';

const S3_BUCKET = process.env.BUCKET;

aws.config.update({
    region: 'us-west-1',
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey
});

export default function handler(req, res) {
    return new Promise(resolve => {
        if (req.method === 'POST') {
            const s3 = new aws.S3();
            const fileName = uniqid() + req.body.fileName;
            const fileType = req.body.fileType;

            const s3Params = {
                Bucket: S3_BUCKET,
                Key: fileName,
                Expires: 500,
                ContentType: fileType,
                ACL: 'public-read',
            };

            s3.getSignedUrl('putObject', s3Params, (error, data) => {
                if (error) {
                    res.statusCode = 400;
                    res.json({
                        success: false,
                        error,
                    });
                    return resolve();
                }

                const returnData = {
                    signedRequest: data,
                    url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
                };

                res.statusCode = 200;
                res.json({
                    success: true,
                    data: { returnData },
                });

                return resolve();
            });
        }
    });
}
