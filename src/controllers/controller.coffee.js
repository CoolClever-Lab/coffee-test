import { Validator } from "jsonschema";

import execute from "../config/db.js";
import schema from "../config/schema.js";
// import {LogError, LogCommon} from '../common.js'

export async function coffee(req, res) {
  try {
    let textsql;
    let result;
    const { product_id, card_id, device_id } = req.body;

    console.log(req.body);

    const data = req.body;
    const v = new Validator();
    const validate = v.validate(data, schema);
    // 9625558
    result = await execute(textsql);
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
      } else {
        throw new Error("номер карты не совпадает с картой в базе");
      }
    }
    const results = "success";
    const message = "заберите Ваш напиток";

    textsql = `
      INSERT INTO [coffee].[dbo].[logs]
      ([request_text]
      ,[status]
      ,[answer_text]
      ,[dt])
    VALUES
      ('${JSON.stringify(req.body)}'
      ,${res.statusCode}
      ,'${results}'
      ,GETDATE())`;
    result = await execute(textsql);

    res.status(200).send({ result: results, message: message });
  } catch (err) {
    let textsql = `
    insert into [coffee].[dbo].[errors]
    ([err],[dt])
    values ('${JSON.stringify(err.message)}', GETDATE())`;

    await execute(textsql);

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
