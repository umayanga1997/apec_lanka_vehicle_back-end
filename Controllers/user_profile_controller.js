const {
    pool
} = require('../Config/db');

const getUserProfileDetails = async function (req, res, next) {
    const userId = req.userVerify._id.user_id;
    const response = await pool.query("SELECT user_name, phone_no,reg_date,user_type FROM users WHERE user_id=$1", [userId]);
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

const getUsersProfileDetails =async function (req,res, next) {
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

const putUserProfileDetails =async function (req,res, next) {
    const userId = req.userVerify._id.user_id;
    const user_name = req.body.user_name;
    const mobileNo = req.body.mobile_no;
    var response = res;
    if(mobileNo !=null){
        response = await pool.query("UPDATE users SET user_name=$1, phone_no=$2 WHERE user_id=$3", [user_name,mobileNo, userId]);
    }else{
        response = await pool.query("UPDATE users SET user_name=$1 WHERE user_id=$2", [user_name, userId]);
    }
    
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                    var setReq = req;
                getUserProfileDetails(setReq, res, next);
               
            } else {
                res.json({
                    done: false,
                    message: "Data not found to update.",
                    data: [],
                })
            }
        } else {
            res.json({
                done: false,
                message: "Has some issue(s) with status, Try again.",
                data: [],
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

module.exports={
    getUserProfileDetails,
    getUsersProfileDetails,
    putUserProfileDetails
}