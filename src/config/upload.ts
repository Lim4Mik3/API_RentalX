import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (request, file, callback) => {
          const hash = crypto.randomBytes(16).toString();
          const filenameHash = `${hash}-${file.originalname}`;
          return callback(null, filenameHash);
        },
      }),
    };
  },
};
