import { Validator } from "jsonschema";

import execute from "../config/db.js";
import schema from "../config/schema.js";

const data = {
  product_id: 123,
  card_id: "vncvncvhjbsfdfgh34",
  device_id: "coffee",
};

export async function coffee(req, res) {
  try {
    const v = new Validator();
    const validate = v.validate(data, schema);
    let textsql;
    let result;

    if (validate.errors.length > 0) {
      throw new Error(validate.errors);
    } else {
      textsql = `
        INSERT INTO [coffee].[dbo].[coffee]
        ([product_id],[card_id],[device_id])
        VALUES (
        ${data.product_id}, '${data.card_id}', '${data.device_id}'
      )`;

      result = await execute(textsql);
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

export async function amountCounter(req, res, next) {
  try {
    let textsql;
    let result;

    textsql = `
      SELECT
        [card_id]
    FROM [coffee].[dbo].[coffee]
    `;

    result = await execute(textsql);

    const arr = result.map((item) => {
      const obj = {
        id: item.card_id,
      };
      return obj;
    });
    
    let amount = 0;

    if (amount != 0) {
      for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];

        textsql = `
        INSERT INTO [coffee].[dbo].[person]
          ([card_id],[amount],[dt])
        VALUES (
        '${obj.id}', ${amount}, convert(varchar(20),getdate(),120)
      )`;
        result = await execute(textsql);
      }
      res.status(200).json('доступно');
    } else {
      throw new Error("ноль");
    }
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
}

// {
//   "product_id": 123, id напитка
//   "card_id": "456ABCDEF", номер карты
//   " divece_id ": "dsfdsf" кофемашина
// }

// textsql = `
// merge into [coffee].[dbo].[person] as tgt
// using (values('${[obj.id]}',${[amount]},convert(varchar(20),getdate(),120)))
//     as src ([card_id], [amount], [dt])
//     on tgt.[dt] = src.[dt]
// when matched then
// update
//     set [card_id] = tgt.[card_id]
//     ,[amount] = tgt.[amount]

// when not matched then
// insert ([card_id], [amount], [dt])
//     values ([card_id], [amount], [dt]);
// `
