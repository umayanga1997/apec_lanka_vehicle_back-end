const {pool}  = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getVTypes =async function (req, res, next) {
    const response = await pool.query('SELECT * FROM vehicles_type')
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

const getVTypeByID =async function (req, res, next) {
    const v_TypeID = req.params.vehicle_type_id;
    const response = await pool.query('SELECT * FROM vehicles_type WHERE v_type_id=$1', [v_TypeID]);
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

const postVType =async function (req, res, next) {
    const v_TypeName = req.body.v_type_name;
    const response = await pool.query("INSERT INTO vehicles_type(v_type_id,v_type_name) VALUES($1, $2)", [uuidv4(), v_TypeName]);

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

const putVType =async function (req, res, next) {
    const v_TypeName = req.body.v_type_name;
    const v_TypeID = req.body.v_type_id;

    const response = await pool.query("UPDATE vehicles_type SET v_type_name=$1 WHERE v_type_id=$2",
        [ v_TypeName, v_TypeID]);

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

const deleteVType =async function (req, res, next) {
    const v_TypeID = req.params.v_type_id;

    const response = await pool.query("DELETE FROM vehicles_type WHERE v_type_id=$1",
        [v_TypeID]);

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


module.exports = {
    getVTypes,
    getVTypeByID,
    postVType,
    putVType,
    deleteVType,
}