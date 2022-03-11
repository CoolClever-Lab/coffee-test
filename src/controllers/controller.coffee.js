import { Validator } from "jsonschema";

import execute from "../config/db.js";
import schema from "../config/schema.js";

export async function coffee(req, res) {
  try {
    let textsql;
    let result;
    const { product_id, card_id, device_id } = req.body;
    const data = req.body;
    const v = new Validator();
    const validate = v.validate(data, schema);

    if (validate.errors.length > 0) {
      throw new Error(validate.errors);
    } else {
      textsql = `
      SELECT
        [card_id]
    FROM [coffee].[dbo].[coffee]
    `;
      result = await execute(textsql);

      const res = result.find((i) => i.card_id === card_id);
      if (res) {
        console.log('teste');
      } else {
        throw new Error("error");
      }
    }
    res.status(200).json({ result: "success" });
  } catch (err) {
    res.status(403).json({
      result: err.message,
      error_code: "not_registered",
      error_message: "Карта не зарегистрирована",
    });
  }
}

// export async function amountCounter(req, res) {
//   try {
//     let textsql;
//     let result;

//     textsql = `
//       SELECT
//         [card_id]
//     FROM [coffee].[dbo].[coffee]
//     `;

//     result = await execute(textsql);
//     console.log(result);

//     const arr = result.map((item) => {
//       const obj = {
//         id: item.card_id,
//       };
//       return obj;
//     });

//   } catch (err) {
//     res.status(403).json({ error: err.message });
//   }
// }

// {
//   "product_id": 123, id напитка
//   "card_id": "456ABCDEF", номер карты
//   " divece_id ": "dsfdsf" кофемашина
// }
