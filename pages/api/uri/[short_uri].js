import connectDB from "../../../middleware/mongodb";
import Uri from "../../../models/uri";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { short_uri } = req.query;
      const result = await Uri.findOne({ short_uri });

      res.status(200).send(result || {});
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else {
    res.status(422).send("req_method_not_supported");
  }
}

export default connectDB(handler);
