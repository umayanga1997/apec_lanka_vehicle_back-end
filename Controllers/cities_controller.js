const {
    pool
} = require('../Config/db');
const {
    v4: uuidv4
} = require('uuid');

const getCities = async function (req, res, next) {
    const response = await pool.query('SELECT * FROM cities')
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

const getCityByID =async function (req, res, next) {
    const cityID = req.params.city_id;
    const response = await pool.query('SELECT * FROM cities WHERE city_id=$1', [cityID]);
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

const postCity = async function (req, res, next) {
    const cityName = req.body.city_name;
    const response = await pool.query("INSERT INTO cities(city_id,city_name) VALUES($1, $2)", [uuidv4(), cityName]);

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

const putCity =async function (req, res, next) {
    const cityName = req.body.city_name;
    const cityID = req.body.city_id;

    const response = await pool.query("UPDATE cities SET city_name=$1 WHERE city_id=$2",
        [cityName, cityID]);

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

const deleteCity =async function (req, res, next) {

    const cityID = req.params.city_id;

    const response = await pool.query("DELETE FROM cities WHERE city_id=$1",
        [cityID]);

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
    getCities,
    getCityByID,
    postCity,
    putCity,
    deleteCity,
}