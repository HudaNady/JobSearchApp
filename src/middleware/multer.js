import multer from "multer";
import AppError from "../utils/Error.js";

const upload = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + "-" + uniqueSuffix);
        },
    });
    const fileFilter = (req, file, cb) => {
        if (file.mimetype == "application/pdf") {
            cb(null, true);
        } else {
            cb(new AppError("invalid file formal", 400));
        }
    };
    const upload = multer({ storage, fileFilter });
    return upload;
};
export default upload;
