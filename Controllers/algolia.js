const {
  pool
} = require('../Config/db');
const algoliasearch = require("algoliasearch");

async function pushItemsToAlgolia(city) {
  try {
    const client = algoliasearch(process.env.Al_Application_ID, process.env.Al_Admin_API_Key);
    const index = client.initIndex(`${city}_items`);

    const response = await pool.query("select  items.* , CAST(avg(CASE when ir.rate_value != 0 then  ir.rate_value else 0 end) as decimal(2,1)) as rate from items full outer join  item_rates ir on items.item_id = ir.item_id group by items.item_count").then((result) => {
      var newIndexes = [];

      for (const key in result.rows) {
        //add new object
        result.rows[key]["objectID"] =result.rows[key]["item_count"] +result.rows[key]["item_id"];
        //add new details to new array
        newIndexes.push(result.rows[key]);
      }
      index.saveObjects(newIndexes)
        .then(({
          // objectIDs
        }) => {
          // console.log(objectIDs);
        })
        .catch(err => {
          // console.log(err);
        });
    });
  } catch (error) {
    console.log("Somthing went wrong.");
  }
}
module.exports = {
  pushItemsToAlgolia
};