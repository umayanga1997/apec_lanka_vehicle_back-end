const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVehicles = async function (req, res, next) {
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1', ["owner"]);
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
                                // vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                // vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    //Get locations from working location
                    for (var count in responseVehicles.rows) {
                        var location_name = "";
                        const vID = responseVehicles.rows[count]['v_id'];
                        var
                            responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1)", [vID]);

                        if (res.status(200)) {
                            if (responseLocations.rowCount != 0 && responseLocations.rowCount != null) {

                                responseVehicles.rows[count]["location_name"] = responseLocations.rows[0]['location_name'];
                                vehicles.push(responseVehicles.rows[count]);

                            } else {

                                responseVehicles.rows[count]["location_name"] = location_name;
                                vehicles.push(responseVehicles.rows[count]);


                            }
                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Data retrieval successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_id=$2', ["owner", vID]);
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
                                // vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                // vehicles = responseVehicles.rows;
                            }

                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    //Get locations from working location
                    for (var count in responseVehicles.rows) {
                        var location_name = "";
                        const vID = responseVehicles.rows[count]['v_id'];
                        var
                            responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1)", [vID]);

                        if (res.status(200)) {
                            if (responseLocations.rowCount != 0 && responseLocations.rowCount != null) {

                                responseVehicles.rows[count]["location_name"] = responseLocations.rows[0]['location_name'];
                                vehicles.push(responseVehicles.rows[count]);

                            } else {

                                responseVehicles.rows[count]["location_name"] = location_name;
                                vehicles.push(responseVehicles.rows[count]);


                            }
                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Data retrieval successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
    const vOwnerID = req.userVerify._id.user_id;
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_owner_id=$2', ["owner", vOwnerID]);
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
                                // vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                // vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    //Get locations from working location
                    for (var count in responseVehicles.rows) {
                        var location_name = "";
                        const vID = responseVehicles.rows[count]['v_id'];
                        var responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1)", [vID]);

                        if (res.status(200)) {
                            if (responseLocations.rowCount != 0 && responseLocations.rowCount != null) {
                                responseVehicles.rows[count]["location_name"] = responseLocations.rows[0]['location_name'];
                                vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["location_name"] = location_name;
                                vehicles.push(responseVehicles.rows[count]);
                            }
                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Data retrieval successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
const getVehiclesByOwnerSomeVehicleID = async function (req, res, next) {
    const vOwnerSomeVID = req.params.o_v_id;
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_owner_id=(SELECT v_owner_id FROM vehicles WHERE v_id=$2 LIMIT 1)', ["owner", vOwnerSomeVID]);
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
                                // vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                // vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    //Get locations from working location
                    for (var count in responseVehicles.rows) {
                        var location_name = "";
                        const vID = responseVehicles.rows[count]['v_id'];
                        var responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1)", [vID]);

                        if (res.status(200)) {
                            if (responseLocations.rowCount != 0 && responseLocations.rowCount != null) {
                                responseVehicles.rows[count]["location_name"] = responseLocations.rows[0]['location_name'];
                                vehicles.push(responseVehicles.rows[count]);
                            } else {
                                responseVehicles.rows[count]["location_name"] = location_name;
                                vehicles.push(responseVehicles.rows[count]);
                            }
                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Data retrieval successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
    const vLocationID = req.params.v_location_id;
    var vehicles = [];
    var responseVehicles;

    if (vTypeID != "All" && vTypeID != null) {
        responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id ) WHERE u.user_type=$1 AND v.v_type_id=$2 AND u.acc_status_active=$3', ["owner", vTypeID, true]);
    } else {
        responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v FULL OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id ) WHERE u.user_type=$1 AND u.acc_status_active=$2', ["owner", true]);
    }

    try {
        if (res.status(200)) {
            if (responseVehicles.rowCount != 0 && responseVehicles.rowCount != null) {
                let promise = new Promise(async (resolve, reject) => {
                    //Get images from curent gallery
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
                                // vehicles.push(responseVehicles.rows[count]);

                            } else {
                                responseVehicles.rows[count]["gallery"] = gallery;
                                // vehicles.push(responseVehicles.rows[count]);
                            }

                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    //Get locations from working location
                    for (var count in responseVehicles.rows) {
                        var location_name = "";
                        const vID = responseVehicles.rows[count]['v_id'];
                        var responseLocations;
                        if (vLocationID != "All" && vLocationID != null) {
                            responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1 AND wl.location_id=$2)", [vID, vLocationID]);
                        } else {
                            responseLocations = await pool.query("SELECT STRING_AGG(location_name, ', ') As location_name FROM locations WHERE location_id in (SELECT wl.location_id FROM vehicles_working_locations as wl WHERE wl.v_id=$1)", [vID]);
                        }
                        if (res.status(200)) {
                            if (responseLocations.rowCount != 0 && responseLocations.rowCount != null) {
                                if (responseLocations.rows[0]['location_name'] != "" && responseLocations.rows[0]['location_name'] != null) {
                                    responseVehicles.rows[count]["location_name"] = responseLocations.rows[0]['location_name'];
                                    vehicles.push(responseVehicles.rows[count]);
                                } else {
                                    if (vLocationID == "All") {
                                        responseVehicles.rows[count]["location_name"] = location_name;
                                        vehicles.push(responseVehicles.rows[count]);
                                    }
                                }
                            } else {
                                if (vLocationID == "All") {
                                    responseVehicles.rows[count]["location_name"] = location_name;
                                    vehicles.push(responseVehicles.rows[count]);
                                }

                            }
                        } else {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        }
                    }
                    // vehicles.push(responseVehicles.rows);
                    resolve("Done");
                })
                promise.then((result) => {
                    res.send({
                        done: true,
                        message: "Data retrieval successfully.",
                        data: vehicles,
                    });
                }).catch((error) => {
                    res.json(error);
                });
            } else {
                res.json({
                    done: false,
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
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL = req.body.v_profile_image_url;
    const userId = req.userVerify._id.user_id;
    const vlocationIDList = req.body.v_location_list;
    const vGalleryImageURLList = req.body.v_gallery_image_url_list;

    const response = await pool.query("INSERT INTO vehicles(v_id,v_no_letter, v_no_number, v_name,  v_type_id, v_description, v_profile_image_url, v_owner_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [uuidv4(), vNoLetter, vNoNumber, vName, vTypeID, vDescription, vProfImageURL, userId]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Data inserted successfully.",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: false,
                message: "Data inserted unsuccessfully.",
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
                    message: "Data updated successfully.",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: false,
                message: "Data updated unsuccessfully.",
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
                    message: "Data updated successfully.",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: false,
                message: "Data updated unsuccessfully.",
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
                    message: "Data deleted successfully.",
                })
            } else {
                res.json({
                    done: false,
                    message: "A bad response, Please try again.",
                })
            }
        } else {
            res.json({
                done: false,
                message: "Data deleted unsuccessfully.",
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
    getVehiclesByOwnerSomeVehicleID,
    postVehicle,
    putVehicleDetails,
    putVehicleStatus,
    deleteVehicle
}