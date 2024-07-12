const Bay = require("./Bay");
const Bay_View = async (query) => {
  const bay_join = [
    {
      $match: {
        ...query,
      },
    },
    {
      $lookup: {
        from: "houses",
        localField: "bay_id",
        foreignField: "bay_id",
        as: "houseDetails",
      },
    },
    {
      $unwind: {
        path: "$houseDetails",
        preserveNullAndEmptyArrays: true, // In case some bays do not have associated houses
      },
    },
    {
      $lookup: {
        from: "customers",
        localField: "houseDetails.customer_id",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $unwind: {
        path: "$customerDetails",
        preserveNullAndEmptyArrays: true, // In case some houses do not have associated customers
      },
    },
    {
      $addFields: {
        house_id: "$houseDetails._id",
        house_npl: "$houseDetails.npl",
        house_online_date: "$houseDetails.online_date",
        house_created_on: "$houseDetails.created_on",
        house_model: "$houseDetails.house_model",
        house_square_ft: "$houseDetails.square_ft",
        house_status: "$houseDetails.status",
        house_records_id: "$houseDetails.house_records_id",
        house_customer_id: "$houseDetails.customer_id",
        customer_id: "$customerDetails._id",
        customer_name: "$customerDetails.customer_name",
        customer_email: "$customerDetails.customer_email",
      },
    },
    {
      $project: {
        houseDetails: 0, // Exclude the original houseDetails field
        customerDetails: 0, // Exclude the original customerDetails field
      },
    },
  ];
  if (query !== undefined) {
    bay_join.unshift({
      $match: {
        ...query,
      },
    });
  }
  return await Bay.aggregate(bay_join);
};
module.exports = Bay_View;
