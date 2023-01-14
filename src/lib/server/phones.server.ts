import con from "$db/database";

export const getAll = async (limit: number) => {
  con.connect(function (err: any) {
    if (err) throw err;
    con.query(
      "SELECT * FROM customers",
      function (err: any, result: any, fields: any) {
        if (err) throw err;
        console.log(result);
      }
    );
  });
  return {
    a: "a",
    b: "b",
    limit,
  };
};
