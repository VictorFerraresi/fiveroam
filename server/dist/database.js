import Pool from "pg";
export const db = await new Pool.Pool({
    connectionString: "postgresql://postgres:root@localhost:5432/fiveroam?schema=public",
}).connect();
