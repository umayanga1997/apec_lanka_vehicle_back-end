const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVImageGalleryByVID = async function (req, res, next) {
    const response = await pool.query('SELECT * FROM vehicles_image_gallery WHERE v_id=$1', [req.params.v_id])
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Done",
                    data: response.rows,
                })
            } else {
                res.json({
                    done: true,
                    message: "Data not found.",
                    data: [],
                })
            }

        } else {
            res.json({
                done: false,
                message: "A bad response, Please try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
            data: [],
        });
    }
}

const postVImageGallery = async function (req, res, next) {
    const vID = req.params.v_id;
    const vImageURLList = req.body.v_image_url_list;

    try {
        let promise = new Promise(async(resolve, reject) => {
            for (var count in vImageURLList) {
                const response = await pool.query("INSERT INTO vehicles_image_gallery(v_image_g_id, v_id, v_image_url) VALUES($1, $2, $3)", [uuidv4(),  vID, vImageURLList[count]]);
                if (res.status(200)) {
                    if (response.rowCount == 0 || response.rowCount == null) {
                        reject({
                            done: true,
                            message: "Data Inserted unsuccessfully",
                        });
                    }
                } else {
                    reject({
                        done: false,
                        message: "A bad response, Please try again.",
                    })
                }
            }
            resolve("done");
        });

        promise.then((result) => {
            res.json({
                done: true,
                message: "Data Inserted successfully",
            })
        }).catch((error) => {
            res.json(error);
        });

    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
        });
    }
}

const putVImageGalleryByImageIDWithVID = async function (req, res, next) {
    const vID = req.params.v_id;
    const vImageGID = req.params.image_g_id;
    const vImageURL = req.body.v_image_url;
       
    const response = await pool.query("UPDATE vehicles_image_gallery SET v_image_url=$1 WHERE v_id=$2, v_image_g_id=$3", [vImageURL, vID, vImageGID]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Data Updated successfully",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: true,
                message: "Data Updated unsuccessfully",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
        });
    }
    

}

const deleteVImageGalleryByImageIDWithVID = async function (req, res, next) {
    const vID = req.params.v_id;
    const vImageGID = req.params.image_g_id;

    const response = await pool.query("DELETE FROM vehicles_image_gallery WHERE v_id=$1 AND v_image_g_id=$2",
        [vID, vImageGID]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Data Deleted successfully",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: true,
                message: "Data Deleted unsuccessfully",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
        });
    }
}
const deleteVImageGalleryByVID = async function (req, res, next) {
    const vID = req.params.v_id;

    const response = await pool.query("DELETE FROM vehicles_image_gallery WHERE v_id=$1",
        [vID]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Data Deleted successfully",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: true,
                message: "Data Deleted unsuccessfully",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
        });
    }
}

module.exports = {
    getVImageGalleryByVID,
    postVImageGallery,
    putVImageGalleryByImageIDWithVID,
    deleteVImageGalleryByImageIDWithVID,
    deleteVImageGalleryByVID,
}