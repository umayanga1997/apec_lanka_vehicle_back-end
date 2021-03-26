const {
    pool
} = require('../Config/db');

const getConfig = async function (req, res, next) {
    // const des = req.params.des;
    const response = await pool.query('SELECT * FROM transaction_config');
    try {
        if (res.status(200)) {
            if (response.rowCount != 0 && response.rowCount != null) {
                var dataList = [];
                for (var count in response.rows) {
                    dataList.push({
                        "net_payment": response.rows[count]['net_payment'],
                        "net_payment_after_discount": response.rows[count]['net_payment_after_discount'],
                        "t_config_description": response.rows[count]['t_config_description']
                    });
                }
                res.json({
                    done: true,
                    message: "Done",
                    data: dataList,
                })
            } else {
                res.json({
                    done: true,
                    message: "Transaction data not found.",
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

module.exports = {
    getConfig,
}