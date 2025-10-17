import * as SplashScreen from "expo-splash-screen";
import { SQLiteProvider } from "expo-sqlite";
import { seedQuestionsIfEmptyAsync } from "@/lib/db/seeds";
import { migrateAsync } from "./schema/migrations";

export function DBProvider({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider
      databaseName="memorizer.db"
      onInit={async (db) => {
        try {
          await db.execAsync(`
            PRAGMA foreign_keys=ON;
            PRAGMA journal_mode=WAL;
            PRAGMA synchronous=NORMAL;
          `);
          await migrateAsync(db);
          await seedQuestionsIfEmptyAsync(db);
        } finally {
          await SplashScreen.hideAsync();
        }
      }}
    >
      {children}
    </SQLiteProvider>
  );
}
