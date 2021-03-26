const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getlocations = async function (req, res, next) {
    const response = await pool.query('SELECT * FROM locations')
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

const getlocationByID =async function (req, res, next) {
    const locationID = req.params.location_id;
    const response = await pool.query('SELECT * FROM locations WHERE location_id=$1', [locationID]);
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

const postlocation = async function (req, res, next) {
    const locationName = req.body.location_name;
    const response = await pool.query("INSERT INTO locations(location_id,location_name) VALUES($1, $2)", [uuidv4(), locationName]);

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
                done: true,
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

const putlocation =async function (req, res, next) {
    const locationName = req.body.location_name;
    const locationID = req.body.location_id;

    const response = await pool.query("UPDATE locations SET location_name=$1 WHERE location_id=$2",
        [locationName, locationID]);

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

const deletelocation =async function (req, res, next) {

    const locationID = req.params.location_id;

    const response = await pool.query("DELETE FROM locations WHERE location_id=$1",
        [locationID]);

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
    getlocations,
    getlocationByID,
    postlocation,
    putlocation,
    deletelocation,
}