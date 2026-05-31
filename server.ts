import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Set large JSON body limit to handle complete subjects and rich quiz questions payload
  app.use(express.json({ limit: "50mb" }));

  // File path for saving the global state
  const dataFilePath = path.join(process.cwd(), "src", "data", "savedData.json");

  // Helper to load current data from the stored database file
  function loadData() {
    try {
      if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath, "utf8");
        return JSON.parse(fileContent);
      }
    } catch (e) {
      console.error("Failed to read saved data:", e);
    }
    return null;
  }

  // Helper to save data to the stored database file securely
  function saveToDisk(data: any) {
    try {
      const dir = path.dirname(dataFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
    } catch (e) {
      console.error("Failed to save data:", e);
    }
  }

  // API endpoints to fetch states globally
  app.get("/api/data", (req, res) => {
    const saved = loadData();
    res.json({ data: saved });
  });

  // API endpoint to save administrative updates globally
  app.post("/api/save", (req, res) => {
    const { subjects, team, flashcards, adminConfig } = req.body;
    
    // Retrieve previous server state to merge update fields
    const current = loadData() || {};
    
    const merged = {
      subjects: subjects !== undefined ? subjects : current.subjects,
      team: team !== undefined ? team : current.team,
      flashcards: flashcards !== undefined ? flashcards : current.flashcards,
      adminConfig: adminConfig !== undefined ? adminConfig : current.adminConfig,
    };

    saveToDisk(merged);
    res.json({ status: "success", data: merged });
  });

  // Serve static files in production, use Vite middleware in dev
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running globally on http://0.0.0.0:${PORT}`);
  });
}

startServer();
