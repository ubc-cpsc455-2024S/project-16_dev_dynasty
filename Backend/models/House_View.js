const House = require("./House");

const House_View = async (query) => {
  const house_join = [
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customerDetails",
      },
    },
    {
      $unwind: "$customerDetails",
    },
    {
      $lookup: {
        from: "bays",
        localField: "bay_id",
        foreignField: "bay_id",
        as: "bayDetails",
      },
    },
    {
      $unwind: {
        path: "$bayDetails",
        preserveNullAndEmptyArrays: true, // In case some houses do not have a bay_id
      },
    },
    {
      $addFields: {
        customer_id: "$customerDetails._id",
        customer_name: "$customerDetails.customer_name",
        customer_email: "$customerDetails.customer_email",
        bay_name: "$bayDetails.bay_name",
        bay_description: "$bayDetails.bay_description",
      },
    },
    {
      $project: {
        customerDetails: 0, // Exclude the original customerDetails field
        bayDetails: 0, // Exclude the original bayDetails field
      },
    },
  ];
  if (query !== undefined) {
    house_join.unshift({
      $match: {
        ...query,
      },
    });
  }
  return await House.aggregate(house_join);
};
module.exports = House_View;
