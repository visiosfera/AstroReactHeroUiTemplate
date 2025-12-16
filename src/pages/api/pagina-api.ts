import type { APIRoute } from "astro";
import dotenv from "dotenv";

export const GET: APIRoute = async () => {
  try {
    dotenv.config();
    console.log("ORACLE_DB_USER", process.env.ORACLE_DB_USER);

    return new Response(JSON.stringify({ mensagem: process.env.ORACLE_DB_USER }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (erro) {
    console.error(erro);
    return new Response(JSON.stringify({ erro: "Erro na consulta ao banco de dados" }), { status: 500 });
  }
};