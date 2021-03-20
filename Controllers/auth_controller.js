const {
    pool
} = require('../Config/db');
const jwt = require('jsonwebtoken');
var dateFormat = require("dateformat");
const axios = require('axios');
const {
    v4: uuidv4
} = require('uuid');
// const fetch = require('node-fetch');

const userMobileOTP = async function (req, res, next) {
    //set sent parameter data
    const reg = new RegExp('[^0]');
    const regResult = reg.exec(req.params.mobile_no);
    var phone_no = "";
    if (regResult.index == 0) {
        phone_no = "0" + req.params.mobile_no;
    } else {
        phone_no = regResult.input;
    }

    //genarate otp number
    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    //make message
    var message = `Hi, Your OTP code is ${otp} by apec lanka`;

    //format date time
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
    try {
        //update otp
        const updateResponse = await pool.query("UPDATE otp_s SET verified=$1 WHERE phone_no=$2", [true, phone_no]);

        if (res.status(200)) {
            //insert otp code and more details to database
            const response = await pool.query("INSERT INTO otp_s(phone_no, otp_code, date_time)VALUES($1,$2,$3)", [phone_no, otp, date]);

            if (res.status(200)) {
                //sent otp code to currect mobile number
                // Make a request for a user with a given ID
                axios.get(`http://textit.biz/sendmsg/index.php?id=${process.env.OTP_ID}&pw=${process.env.OTP_PASSWORD}&to=${phone_no}&text=${message}&from=Apec.lk Delivery`)
                    .then(function (response) {

                        res.json({
                            done: true,
                            message: "OTP Request has been accepted.",
                        });
                    })
                    .catch(function (error) {
                        res.json({
                            done: true,
                            message: "Can't send otp, Has some issue(s) with another, Try again.",
                        });
                    });
                

            } else {
                res.json({
                    done: false,
                    message: "Has some issue(s) with status, Try again.",
                })

            }
        }

    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

const otpVerification = async function (req, res, next) {
    //set sent parameter data
    const getOtp = req.body.otp;
    const reg = new RegExp('[^0]');
    const regResult = reg.exec(req.body.mobile_no);
    var getMobileNo = "";
    if (regResult.index == 0) {
        getMobileNo = "0" + req.body.mobile_no;
    } else {
        getMobileNo = regResult.input;
    }

    const response = await pool.query("SELECT * FROM otp_s WHERE otp_code=$1  AND phone_no=$2 AND NOT verified", [getOtp, getMobileNo]);
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                //update otp
                const updateResponse = await pool.query("UPDATE otp_s SET verified=$1 WHERE otp_code=$2 AND phone_no=$3", [true, getOtp, getMobileNo]);

                if (res.status(200)) {
                    //generate token for mobile number
                    const token = jwt.sign({
                        _mobile_no: getMobileNo,
                    }, process.env.TOKEN_SECRET, );

                    //format date time
                    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");
                    //store token in database
                    const tokenResponse = await pool.query("INSERT INTO mobile_no_token(token, created_date)VALUES($1, $2)", [token, date]);

                    if (res.status(200)) {
                        if (tokenResponse.rowCount != 0 && tokenResponse.rowCount != null) {
                            //set token to header
                            res.header("mobile-token", token);
                            //set responce to body
                            res.json({
                                done: true,
                                message: "Otp has been veryfied",
                                data: [],
                            });
                        } else {
                            res.json({
                                done: false,
                                message: "Otp not veryfied",
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
                } else {
                    res.json({
                        done: false,
                        message: "Has some issue(s) with status, Try again.",
                        data: []
                    })
                }

            } else {
                res.json({
                    done: false,
                    message: "The Otp Code is Wrong.",
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
        });
    }
}

const userAuth = async function (req, res, next) {
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;

    const response = await pool.query("SELECT user_name, phone_no,reg_date,user_type FROM users WHERE phone_no=$1", [token_data._mobile_no]);

    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                res.json({
                    done: true,
                    message: "Registered Account",
                    data: {
                        registered: true,
                    },
                })
            } else {
                res.json({
                    done: true,
                    message: "Non-Registered Account",
                    data: {
                        registered: false,
                    },
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

const userRegister = async function (req, res, next) {
    const userName = req.body.user_name;
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;
    //format date time
    var date = dateFormat(new Date(), "yyyy-mm-dd h:MM:ss");

    const response = await pool.query("INSERT INTO users(user_id, user_name, phone_no, reg_date)VALUES($1,$2,$3,$4)", [uuidv4(), userName, token_data._mobile_no, date]);
    try {
        if (res.status(200)) {
            const response = await pool.query("SELECT * FROM users WHERE phone_no=$1", [token_data._mobile_no]);
            //create and assign a token
            const token = jwt.sign({
                _id: response.rows[0],
            }, process.env.TOKEN_SECRET, );
            res.header("auth-token", token);
            if (res.status(200)) {
                res.json({
                    done: true,
                    message: "Your successfully Registered with Login.",
                    data: [{
                        "user_name": response.rows[0]['user_name'],
                        "phone_no": response.rows[0]['phone_no'],
                        "reg_date": response.rows[0]['reg_date'],
                        "user_type": response.rows[0]['user_type']
                    }]
                })
            } else {
                res.json({
                    done: false,
                    message: "Has some issue(s) with status, Try again.",
                })
            }

        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
            })
        }
    } catch (error) {
        res.json({
            done: false,
            message: "Has some issue(s) with another, Try again.",
        });
    }
}

const userLogin = async function (req, res, next) {
    //the value is get from the verified token requeast 
    const token_data = req.mobileToken;
    const response = await pool.query("SELECT * FROM users WHERE phone_no=$1", [token_data._mobile_no]);

    try {
        //create and assign a token
        const token = jwt.sign({
            _id: response.rows[0],
        }, process.env.TOKEN_SECRET, );
        res.header("auth-token", token);
        if (res.status(200)) {
            res.json({
                done: true,
                message: "Your successfully Login.",
                data:  [{
                    "user_name": response.rows[0]['user_name'],
                    "phone_no": response.rows[0]['phone_no'],
                    "reg_date": response.rows[0]['reg_date'],
                    "user_type": response.rows[0]['user_type']
                }]
            })
        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
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
    userMobileOTP,
    otpVerification,
    userAuth,
    userLogin,
    userRegister
}