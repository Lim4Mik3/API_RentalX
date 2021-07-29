import { hash } from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuidv4();
  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", driver_license, created_at)
    values('${id}', 'admin', 'admin@admin.com', '${password}', true, 'XXXXX', 'now()')
    `
  );

  await connection.close();
}

create().then(() => {
  console.log("Admin user created success");
});
