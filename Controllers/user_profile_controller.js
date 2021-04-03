const {
    pool
} = require('../Config/db');
var dateFormat = require("dateformat");

const getUserProfileDetails = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const response = await pool.query("SELECT user_name, phone_no,reg_date,user_type, exp_date, update_date, number_of_vehicles FROM users WHERE user_id=$1", [userId]);
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

const getUserAccStatus = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const response = await pool.query("SELECT * FROM users WHERE user_id=$1", [userId]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                var getExpDate = new Date(response.rows[0]['exp_date']);
                var dateTimeNow = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                dateTimeNow = new Date(dateTimeNow);

                if (dateTimeNow < getExpDate) {
                    if (response.rows[0]['acc_status_active']) {
                        if (response.rows[0]['acc_type_trial']) {
                            res.json({
                                done: true,
                                isExpire: false,
                                accActive: true,
                                isTrial: true,
                                message: "Your account type is the trial, You can upgrade your account as master account.",
                                data: [{
                                    "user_name": response.rows[0]['user_name'],
                                    "phone_no": response.rows[0]['phone_no'],
                                    "reg_date": response.rows[0]['reg_date'],
                                    "exp_date": response.rows[0]['exp_date'],
                                    "update_date": response.rows[0]['update_date'],
                                    "number_of_vehicles": response.rows[0]['number_of_vehicles'],
                                    "user_type": response.rows[0]['user_type']
                                }],
                            })
                        } else {
                            res.json({
                                done: true,
                                isExpire: false,
                                accActive: true,
                                isTrial: false,
                                message: "Your account type is the master account.",
                                data: [{
                                    "user_name": response.rows[0]['user_name'],
                                    "phone_no": response.rows[0]['phone_no'],
                                    "reg_date": response.rows[0]['reg_date'],
                                    "exp_date": response.rows[0]['exp_date'],
                                    "update_date": response.rows[0]['update_date'],
                                    "number_of_vehicles": response.rows[0]['number_of_vehicles'],
                                    "user_type": response.rows[0]['user_type']
                                }],
                            })
                        }

                    } else {
                        if (response.rows[0]['acc_type_trial'] == null) {
                            res.json({
                                done: true,
                                isExpire: false,
                                accActive: false,
                                isTrial: null,
                                message: "Your account type is primary account, You can change your account type as trial or master.",
                                data: [

                                ],
                            })
                        } else {
                            if (response.rows[0]['acc_type_trial']) {
                                res.json({
                                    done: true,
                                    isExpire: false,
                                    accActive: false,
                                    isTrial: true,
                                    message: "Your trial account is deactivated, You can upgrade your account as master account.",
                                    data: [

                                    ],
                                })
                            } else {
                                //not active in this account, but payments are already done. we need to activate this account immediately.
                                res.json({
                                    done: true,
                                    isExpire: false,
                                    accActive: false,
                                    isTrial: false,
                                    message: "Your master account is deactivated, Please contact your apec lanka agent.",
                                    data: [

                                    ],
                                })
                            }
                        }
                    }
                } else {
                    res.json({
                        done: true,
                        isExpire: true,
                        accActive: false,
                        isTrial: false,
                        message: "Your account is expired, You can upgrade your account as master account.",
                        data: [],
                    })
                }
            } else {
                res.json({
                    done: false,
                    message: "User data not found.",
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

const getUsersProfileDetails = async function (req, res, next) {
    const response = await pool.query("SELECT * FROM users");
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
const getUserTransactions = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const response = await pool.query("SELECT pay_amount, date_time FROM payments_transactions WHERE user_id=$1", [userId]);
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
const putUserProfileDetails = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const user_name = req.body.user_name;
    const mobileNo = req.body.mobile_no;
    var response;
    if (mobileNo != null) {
        response = await pool.query("UPDATE users SET user_name=$1, phone_no=$2 WHERE user_id=$3", [user_name, mobileNo, userId]);
    } else {
        response = await pool.query("UPDATE users SET user_name=$1 WHERE user_id=$2", [user_name, userId]);
    }

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                var setReq = req;
                getUserProfileDetails(setReq, res, next);

            } else {
                res.json({
                    done: true,
                    message: "Account updated successfully.",
                    data: [],
                })
            }
        } else {
            res.json({
                done: false,
                message: "A bad response, Please try again.",
                data: [],
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
const deleteUserProfile = async function (req, res, next) {
    const userIdForDeletion = req.body.user_id;
    const userMobileNo = req.body.mobile_no;

    const response = await pool.query("DELETE FROM users WHERE user_id=$1 AND phone_no=$2", [userIdForDeletion, userMobileNo]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Account hab been deleted.",
                    data: [],
                })

            } else {
                res.json({
                    done: false,
                    message: "Data deleted unsuccessfully.",
                    data: [],
                })
            }
        } else {
            res.json({
                done: false,
                message: "A bad response, Please try again.",
                data: [],
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

module.exports = {
    getUserProfileDetails,
    getUsersProfileDetails,
    getUserTransactions,
    putUserProfileDetails,
    deleteUserProfile,
    getUserAccStatus
}