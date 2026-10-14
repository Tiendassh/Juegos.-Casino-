const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const REPO_PATH = '/root/halloween-spins';
const OLLAMA_URL = 'http://localhost:11434/api/chat';
const MODEL = 'qwen2.5-coder:3b';

function parsearRespuesta(texto) {
  const acciones = [];
  const regexArchivo = /###ARCHIVO:\s*(.+?)\s*\n###CONTENIDO:\n([\s\S]*?)\n###FIN_ARCHIVO/g;
  let match;
  
  while ((match = regexArchivo.exec(texto)) !== null) {
    acciones.push({ tipo: 'archivo', ruta: match[1].trim(), contenido: match[2].trim() });
  }
  
  const regexCommit = /###COMMIT:\s*(.+?)(?:\n|$)/g;
  while ((match = regexCommit.exec(texto)) !== null) {
    acciones.push({ tipo: 'commit', mensaje: match[1].trim() });
  }
  
  let mensajeFinal = texto
    .replace(/###ARCHIVO:[\s\S]*?###FIN_ARCHIVO/g, '')
    .replace(/###COMMIT:.*?(?:\n|$)/g, '')
    .trim();
  
  return { acciones, mensajeFinal };
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    
    const systemPrompt = `Eres un agente de programación experto en Next.js, TypeScript, Prisma y PostgreSQL.
REGLAS: Fichas son simulacion (NO dinero real). Transacciones atomicas. Baja logica (isActive).
FORMATO OBLIGATORIO para crear/modificar archivos:
###ARCHIVO: ruta/del/archivo.ext
###CONTENIDO:
[codigo completo aqui, sin bloques de markdown]
###FIN_ARCHIVO

Para guardar en git usa:
###COMMIT: mensaje descriptivo

Ejemplo:
Voy a crear el esquema.
###ARCHIVO: prisma/schema.prisma
###CONTENIDO:
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql" url = env("DATABASE_URL") }
model User { id Int @id @default(autoincrement()) email String @unique role String balance Int @default(0) isActive Boolean @default(true) }
###FIN_ARCHIVO
###COMMIT: feat: schema inicial
Listo.`;

    let messages = [
      { role: "system", content: systemPrompt },
      ...history,
      { role: "user", content: message }
    ];

    const ollamaRes = await axios.post(OLLAMA_URL, {
      model: MODEL,
      messages: messages,
      stream: false,
      options: { temperature: 0.1 }
    });
    
    const respuestaModelo = ollamaRes.data.message.content;
    const { acciones, mensajeFinal } = parsearRespuesta(respuestaModelo);
    const resultados = [];
    
    for (const accion of acciones) {
      try {
        if (accion.tipo === 'archivo') {
          const rutaCompleta = path.join(REPO_PATH, accion.ruta);
          await fs.mkdir(path.dirname(rutaCompleta), { recursive: true });
          await fs.writeFile(rutaCompleta, accion.contenido, 'utf-8');
          resultados.push('Archivo creado: ' + accion.ruta);
        } else if (accion.tipo === 'commit') {
          await execAsync('git add .', { cwd: REPO_PATH });
          try {
            await execAsync('git commit -m "' + accion.mensaje + '"', { cwd: REPO_PATH });
            await execAsync('git push origin main', { cwd: REPO_PATH });
            resultados.push('Git push exitoso: ' + accion.mensaje);
          } catch (e) {
            resultados.push('Git: Sin cambios nuevos para commitear');
          }
        }
      } catch (error) {
        resultados.push('Error en ' + accion.tipo + ': ' + error.message);
      }
    }
    
    const respuestaFinal = (mensajeFinal || 'Procese tu solicitud.') + 
      (resultados.length > 0 ? '\n\n**Acciones ejecutadas:**\n' + resultados.map(function(r) { return '✅ ' + r; }).join('\n') : '');
    
    messages.push({ role: 'assistant', content: respuestaModelo });
    
    res.json({ 
      response: respuestaFinal, 
      history: messages.slice(-8),
      acciones_ejecutadas: resultados
    });
    
  } catch (error) {
    console.error('Error en /api/chat:', error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', function() {
  console.log('Agente Web corriendo en http://0.0.0.0:' + PORT);
});
