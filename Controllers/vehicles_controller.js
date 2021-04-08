const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVehicles = async function (req, res, next) {
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1', ["owner"]);
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
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_id=$2', ["owner", vID]);
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
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_owner_id=$2', ["owner", vOwnerID]);
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

const getVehiclesByOwnerQRID = async function (req, res, next) {
    const vOwnerQRID = req.params.user_qr;
    var vehicles = [];
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.user_qr_id=$2', ["owner", vOwnerQRID]);
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
    const responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id) WHERE u.user_type=$1 AND v.v_owner_id=(SELECT v_owner_id FROM vehicles WHERE v_id=$2 LIMIT 1)', ["owner", vOwnerSomeVID]);
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
        responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id ) WHERE u.user_type=$1 AND v.v_type_id=$2 AND u.acc_status_active=$3', ["owner", vTypeID, true]);
    } else {
        responseVehicles = await pool.query('SELECT v.*, NULL AS v_owner_id, u.user_name, u.phone_no, u.acc_status_active, vt.v_type_name FROM (vehicles AS v LEFT OUTER JOIN users AS u ON v.v_owner_id=u.user_id FULL OUTER JOIN vehicles_type AS vt ON v.v_type_id = vt.v_type_id ) WHERE u.user_type=$1 AND u.acc_status_active=$2', ["owner", true]);
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
    const vID = uuidv4();

    const response = await pool.query("INSERT INTO vehicles(v_id,v_no_letter, v_no_number, v_name,  v_type_id, v_description, v_profile_image_url, v_owner_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8)", [vID, vNoLetter, vNoNumber, vName, vTypeID, vDescription, vProfImageURL, userId]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                let promise = new Promise(async (resolve, reject) => {
                    for (const count in vlocationIDList) {
                        const responseLocation = await pool.query("INSERT INTO vehicles_working_locations(vw_id,v_id, location_id)VALUES($1,$2,$3)", [uuidv4(), vID, vlocationIDList[count]['data_id']]);

                        if (!res.status(200)) {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        } else {
                            if (responseLocation.rowCount == 0 || responseLocation.rowCount == null) {
                                reject({
                                    done: false,
                                    message: "Something went wrong with working locations, Please try again.",
                                });
                            }
                        }
                    }
                    for (const count in vGalleryImageURLList) {
                        const responseGallery = await pool.query("INSERT INTO vehicles_image_gallery(v_image_g_id,v_id, v_image_url)VALUES($1,$2,$3)", [uuidv4(), vID, vGalleryImageURLList[count]]);

                        if (!res.status(200)) {
                            reject({
                                done: false,
                                message: "A bad response, Please try again.",
                            });
                        } else {
                            if (responseGallery.rowCount == 0 || responseGallery.rowCount == null) {
                                reject({
                                    done: false,
                                    message: "Something went wrong with gallery, Please try again.",
                                });
                            }
                        }
                    }
                    resolve('Done');
                })

                promise.then((result) => {
                    res.json({
                        done: true,
                        message: "Data inserted successfully.",
                    });
                }).catch((error) => {
                    res.json(error);
                });

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
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL = req.body.v_profile_image_url;
    const vlocationIDList = req.body.v_location_list;
    const vGalleryImageURLList = req.body.v_gallery_image_url_list;
    const vGalleryImageURLListRemove = req.body.v_gallery_image_url_list_remove;

    const response = await pool.query("UPDATE vehicles SET v_no_letter=$1, v_no_number=$2, v_name=$3, v_type_id=$4, v_description=$5, v_profile_image_url=$6 WHERE v_id=$7 AND v_owner_id=$8",
        [vNoLetter, vNoNumber, vName, vTypeID, vDescription, vProfImageURL, vID, userId]);

    try {
        if (response.rowCount != 0 && response.rowCount != null) {
            if (res.status(200)) {
                let promise = new Promise(async (resolve, reject) => {
                    if (vlocationIDList.length != 0) {
                        const responseDeleteLocations = await pool.query("DELETE FROM vehicles_working_locations WHERE v_id=$1", [vID]);
                        if (responseDeleteLocations.rowCount != 0 && responseDeleteLocations.rowCount != null) {
                            if (res.status(200)) {
                                for (const count in vlocationIDList) {
                                    const responseLocation = await pool.query("INSERT INTO vehicles_working_locations(vw_id,v_id, location_id)VALUES($1,$2,$3)", [uuidv4(), vID, vlocationIDList[count]['data_id']]);

                                    if (!res.status(200)) {
                                        reject({
                                            done: false,
                                            message: "A bad response, Please try again.",
                                        });
                                    } else {
                                        if (responseLocation.rowCount == 0 || responseLocation.rowCount == null) {
                                            reject({
                                                done: false,
                                                message: "Something went wrong with working locations, Please try again.",
                                            });
                                        }
                                    }
                                }
                            } else {
                                reject({
                                    done: false,
                                    message: "A bad response, Please try again.",
                                });
                            }
                        } else {
                            reject({
                                done: false,
                                message: "Something went wrong with delete previous data, Please try again.",
                            });
                        }

                    }
                    if (vGalleryImageURLList.length != 0) {
                        for (const count in vGalleryImageURLListRemove) {
                            const responseGalleryUpdate = await pool.query("UPDATE vehicles_image_gallery SET v_image_url=$1 WHERE v_id=$2 AND v_image_url=$3", [vGalleryImageURLList[count], vID, vGalleryImageURLListRemove[count]]);

                            if (!res.status(200)) {
                                reject({
                                    done: false,
                                    message: "A bad response, Please try again.",
                                });
                            } else {
                                if (responseGalleryUpdate.rowCount == 0 || responseGalleryUpdate.rowCount == null) {
                                    reject({
                                        done: false,
                                        message: "Something went wrong with gallery, Please try again.",
                                    });
                                }
                            }
                        }
                    }
                    resolve('Done');
                })

                promise.then((result) => {
                    res.json({
                        done: true,
                        message: "Data updated successfully.",
                    });
                }).catch((error) => {
                    res.json(error);
                });
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
    const vID = req.params.v_id;

    const responseWLocationsDelete = await pool.query("DELETE FROM vehicles_working_locations WHERE v_id=$1",
        [vID]);
    const responseGalleryDelete = await pool.query("DELETE FROM vehicles_image_gallery WHERE v_id=$1",
        [vID]);
    const responseVehicleDelete = await pool.query("DELETE FROM vehicles WHERE v_id=$1 AND v_owner_id=$2",
        [vID, userId]);

    try {
        if (responseVehicleDelete.rowCount != 0 && responseVehicleDelete.rowCount != null) {
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
    getVehiclesByOwnerQRID,
    getVehiclesByTypeWithlocation,
    getVehiclesByOwnerSomeVehicleID,
    postVehicle,
    putVehicleDetails,
    putVehicleStatus,
    deleteVehicle
}