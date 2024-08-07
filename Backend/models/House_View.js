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
      $unwind: {
        path: "$customerDetails",
        preserveNullAndEmptyArrays: true,
      },
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
        customer_id: { $ifNull: ["$customerDetails._id", null] },
        customer_name: { $ifNull: ["$customerDetails.customer_name", null] },
        customer_email: { $ifNull: ["$customerDetails.customer_email", null] },
        bay_name: { $ifNull: ["$bayDetails.bay_name", null] },
        bay_description: { $ifNull: ["$bayDetails.bay_description", null] },
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
    house_join.push({
      $match: {
        ...query,
      },
    });
  }
  try {
    const result = await House.aggregate(house_join);

    return result;
  } catch (error) {
    console.error("Error in aggregation:", error);
    throw error; // Throw the error to handle it upstream
  }
};
module.exports = House_View;
