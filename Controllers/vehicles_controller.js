const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVehicles = async function (req, res, next) {
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1', ["owner"]);
    try {
        if (res.status(200)) {
            if (responseVehicles.rowCount != 0 && responseVehicles.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (var count in responseVehicles.rows) {
                        var gallery = [];
                        const vID = responseVehicles.rows[count]['v_id'];
                        const responseGallery = await pool.query("SELECT * FROM vehicles_image_gallery WHERE v_id=$1", [vID]);
                        if (res.status(200)) {
                            if (responseGallery.rowCount != 0 && responseGallery.rowCount != null) {
                                for (var countGallery in responseGallery.rows) {
                                    gallery.push(responseGallery.rows[countGallery]);
                                }

                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
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

const getVehicleByID = async function (req, res, next) {
    const vID = req.params.v_id;
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND v.v_id=$2', ["owner", vID]);
    try {
        if (res.status(200)) {
            if (responseVehicles.rowCount != 0 && responseVehicles.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (var count in responseVehicles.rows) {
                        var gallery = [];
                        const vID = responseVehicles.rows[count]['v_id'];
                        const responseGallery = await pool.query("SELECT * FROM vehicles_image_gallery WHERE v_id=$1", [vID]);
                        if (res.status(200)) {
                            if (responseGallery.rowCount != 0 && responseGallery.rowCount != null) {
                                for (var countGallery in responseGallery.rows) {
                                    gallery.push(responseGallery.rows[countGallery]);
                                }

                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles = responseVehicles.rows;
                            }

                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
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
const getVehiclesByOwnerID = async function (req, res, next) {
    const vOwnerID = req.params.v_owner_id;
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND v.v_owner_id=$2', ["owner", vOwnerID]);
    try {
        if (res.status(200)) {
            if (responseVehicles.rowCount != 0 && responseVehicles.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (var count in responseVehicles.rows) {
                        var gallery = [];
                        const vID = responseVehicles.rows[count]['v_id'];
                        const responseGallery = await pool.query("SELECT * FROM vehicles_image_gallery WHERE v_id=$1", [vID]);
                        if (res.status(200)) {
                            if (responseGallery.rowCount != 0 && responseGallery.rowCount != null) {
                                for (var countGallery in responseGallery.rows) {
                                    gallery.push(responseGallery.rows[countGallery]);
                                }
                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
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

const getVehiclesByTypeWithlocation = async function (req, res, next) {
    const vTypeID = req.params.v_type_id;
    const vlocationID = req.params.v_location_id;
    var vehicles = [];
    var responseVehicles;
    if ((vTypeID != "all" && vTypeID != null) && (vlocationID != "all" && vlocationID != null)) {
        responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND v.v_location_id=$2 AND v.v_type_id=$3 AND u.acc_status_active=$4', ["owner", vlocationID, vTypeID, true]);
    } else {
        if(vTypeID != "all" && vTypeID != null){
            responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND v.v_type_id=$2 AND u.acc_status_active=$3', ["owner", vTypeID, true]);
        }else if(vlocationID != "all" && vlocationID != null){
            responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND v.v_location_id=$2 AND u.acc_status_active=$3', ["owner", vlocationID, true]);
        }else{
            responseVehicles = await pool.query('SELECT v.*,l.location_name, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id FULL OUTER JOIN locations as l ON v.v_location_id = l.location_id) WHERE u.user_type=$1 AND u.acc_status_active=$2', ["owner", true]);
        }
    }
    try {
        if (res.status(200)) {
            if (responseVehicles.rowCount != 0 && responseVehicles.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    for (var count in responseVehicles.rows) {
                        var gallery = [];
                        const vID = responseVehicles.rows[count]['v_id'];
                        const responseGallery = await pool.query("SELECT * FROM vehicles_image_gallery WHERE v_id=$1", [vID]);
                        if (res.status(200)) {
                            if (responseGallery.rowCount != 0 && responseGallery.rowCount != null) {
                                for (var countGallery in responseGallery.rows) {
                                    gallery.push(responseGallery.rows[countGallery]);
                                }

                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);

                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "Has some issue(s) with status, Try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Fetched Successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
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
const postVehicle = async function (req, res, next) {
    const vNoLetter = req.body.v_no_letter;
    const vNoNumber = req.body.v_no_number;
    const vName = req.body.v_name;
    const vlocationID = req.body.v_location_id;
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL = req.body.v_profile_image_url;
    const userId = req.userVerify._id.user_id;

    const response = await pool.query("INSERT INTO vehicles(v_id,v_no_letter, v_no_no, v_name, v_location_id, v_type_id, v_description, v_profile_image_url, v_owner_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [uuidv4(), vNoLetter, vNoNumber, vName, vlocationID, vTypeID, vDescription, vProfImageURL, userId]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Data Inserted successfully",
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
                message: "Data Inserted unsuccessfully",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Something went wrong, Please try again.",
        });
    }
}

const putVehicleDetails = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.params.v_id;
    const vNoLetter = req.body.v_no_letter;
    const vNoNumber = req.body.v_no_number;
    const vName = req.body.v_name;
    const vlocationID = req.body.v_location_id;
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL = req.body.v_profile_image_url;
    const vStatus = req.body.v_status;

    const response = await pool.query("UPDATE vehicles SET v_no_letter=$1, v_no_no=$2, v_name=$3, v_location_id=$4, v_type_id=$5, v_description=$6, v_profile_image_url=$7, v_status=$8 WHERE v_id=$9 AND v_owner_id=$10",
        [vNoLetter, vNoNumber, vName, vlocationID, vTypeID, vDescription, vProfImageURL, vStatus, vID, userId]);

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

const putVehicleStatus = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.params.v_id;
    const vStatus = req.body.v_status;

    const response = await pool.query("UPDATE vehicles SET v_status=$1 WHERE v_id=$2 AND v_owner_id=$3",
        [vStatus, vID, userId]);

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

const deleteVehicle = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.body.v_id;

    const response = await pool.query("DELETE FROM vehicles WHERE v_id=$1 AND v_owner_id=$2",
        [vID, userId]);

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
    getVehicles,
    getVehicleByID,
    getVehiclesByOwnerID,
    getVehiclesByTypeWithlocation,
    postVehicle,
    putVehicleDetails,
    putVehicleStatus,
    deleteVehicle
}