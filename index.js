const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const app = express();
const port = 3000;

// Substitua pelos detalhes do seu projeto Supabase
const supabaseUrl = "https://jzjlzhwqqjrwdkxjxdsr.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp6amx6aHdxcWpyd2RreGp4ZHNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3NTk4ODEsImV4cCI6MjAzMjMzNTg4MX0.kTcNvNV9OkslFS1OB4UP-_Ip8NyN94RuAVvwcSE7I9s";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());

// Rota para consultar todos os produtos
app.get("/produtos", async (req, res) => {
  const { data, error } = await supabase.from("produtos").select("*");

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Rota para consultar um produto individualmente pelo ID
app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("produtos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data);
});

// Rota para cadastrar um produto
app.post("/produtos", async (req, res) => {
  const { nome, preco } = req.body;
  const { data, error } = await supabase
    .from("produtos")
    .insert([{ nome, preco }]);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
});

// Rota para alterar um produto
app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco } = req.body;
  const { data, error } = await supabase
    .from("produtos")
    .update({ nome, preco })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.json(data[0]);
});

// Rota para deletar um produto
app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase.from("produtos").delete().eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(204).end();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
