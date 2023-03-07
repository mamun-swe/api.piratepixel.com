const Tags = require("../../../Models/Tags");

// List of items
const Index = async (req, res, next) => {
  try {
    const results = await Tags.find({}, { title: 1 }).sort({ title: 1 }).exec();

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    if (error) next(error);
  }
};

module.exports = {
  Index,
};
