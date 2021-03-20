const {pool} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVehicles =async function (req, res, next) {
    const response = await pool.query('SELECT * FROM vehicles')
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
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}

const getVehicleByID =async function (req, res, next) {
    const vID = req.params.v_id;
    const response = await pool.query('SELECT * FROM vehicles WHERE v_id=$1', [vID]);
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
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}
const getVehicleByTypeWithCity =async function (req, res, next) {
    const vTypeID = req.params.v_type_id;
    const vCityID = req.params.v_city_id;

    const response = await pool.query('SELECT * FROM vehicles WHERE v_city_id=$1 AND v_type_id=$2', [vCityID, vTypeID]);
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
                message: "Has some issue(s) with status, Try again.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
            data: [],
        });
    }
}
const postVehicle =async function (req, res, next) {
    const vNoLetter = req.body.v_no_letter;
    const vNoNumber = req.body.v_no_number;
    const vName =req.body.v_name;
    const vCityID = req.body.v_city_id;
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL =  req.body.v_profile_image_url;
    const userId = req.userVerify._id.user_id;

    const response = await pool.query("INSERT INTO vehicles(v_id,v_no_letter, v_no_no, v_name, v_city_id, v_type_id, v_description, v_profile_image_url, v_owner_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)", [uuidv4(), vNoLetter, vNoNumber,vName,vCityID,vTypeID,vDescription,vProfImageURL,userId]);

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
                    message: "Has some issue(s) with status, Try again.",
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
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

const putVehicleDetails =async  function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.body.v_id;
    const vNoLetter = req.body.v_no_letter;
    const vNoNumber = req.body.v_no_number;
    const vName =req.body.v_name;
    const vCityID = req.body.v_city_id;
    const vTypeID = req.body.v_type_id;
    const vDescription = req.body.v_description;
    const vProfImageURL =  req.body.v_profile_image_url;
    const vStatus = req.body.v_status;

    const response = await pool.query("UPDATE vehicles SET v_no_letter=$1, v_no_no=$2, v_name=$3, v_city_id=$4, v_type_id=$5, v_description=$6, v_profile_image_url=$7, v_status=$8 WHERE v_id=$9 AND v_owner_id=$10",
        [vNoLetter, vNoNumber,vName,vCityID,vTypeID,vDescription,vProfImageURL,vStatus, vID , userId]);

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
                    message: "Has some issue(s) with status, Try again.",
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
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

const putVehicleStatus =async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.body.v_id;
    const vStatus = req.body.v_status;

    const response = await pool.query("UPDATE vehicles SET v_status=$1 WHERE v_id=$2 AND v_owner_id=$3",
        [vStatus, vID , userId]);

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
                    message: "Has some issue(s) with status, Try again.",
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
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

const deleteVehicle =async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const vID = req.body.v_id;

    const response = await pool.query("DELETE FROM vehicles WHERE v_id=$1 AND v_owner_id=$2",
        [vID,userId]);

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
                    message: "Has some issue(s) with status, Try again.",
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
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

module.exports ={
    getVehicles,
    getVehicleByID,
    getVehicleByTypeWithCity,
    postVehicle,
    putVehicleDetails,
    putVehicleStatus,
    deleteVehicle
}