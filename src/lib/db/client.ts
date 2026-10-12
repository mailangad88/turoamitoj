// One tiny query interface over two Postgres drivers:
// - postgres.js against DATABASE_URL (Neon, Supabase or any hosted Postgres) in production
// - PGlite (Postgres compiled to WebAssembly) on disk for local development and in memory for tests
// Without either, the site falls back to the fleet in src/data/cars.ts and the admin asks for a database.

export type Db = {
  kind: "postgres" | "pglite";
  query<T = Record<string, unknown>>(text: string, params?: unknown[]): Promise<T[]>;
};

let dbPromise: Promise<Db | null> | null = null;

export function databaseUrl() {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL || "";
}

async function connect(): Promise<Db | null> {
  const url = databaseUrl();
  if (url) {
    const { default: postgres } = await import("postgres");
    // prepare:false keeps it compatible with transaction poolers such as Neon's and Supabase's.
    const sql = postgres(url, { max: 3, prepare: false, idle_timeout: 20, onnotice: () => {} });
    return {
      kind: "postgres",
      query: async <T,>(text: string, params: unknown[] = []) =>
        (await sql.unsafe(text, params as never[])) as unknown as T[],
    };
  }
  const local = process.env.LOCAL_DB; // "memory" or a directory; on by default in development
  if (local || process.env.NODE_ENV === "development") {
    const { PGlite } = await import("@electric-sql/pglite");
    const pg = local === "memory" ? new PGlite() : new PGlite(local || ".data/pglite");
    return {
      kind: "pglite",
      query: async <T,>(text: string, params: unknown[] = []) => (await pg.query<T>(text, params)).rows,
    };
  }
  return null;
}

export async function getDb(): Promise<Db | null> {
  if (!dbPromise) {
    dbPromise = connect().then(async (db) => {
      if (db) {
        const { ensureSchema } = await import("./schema");
        await ensureSchema(db);
      }
      return db;
    });
    dbPromise.catch(() => {
      dbPromise = null;
    });
  }
  return dbPromise;
}

/** For tests: drop the cached connection so the next getDb() starts fresh. */
export function resetDbForTests() {
  dbPromise = null;
}
