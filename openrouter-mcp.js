#!/usr/bin/env node

/**
 * MCP Server per OpenRouter
 * Permette di usare modelli OpenRouter con Codex CLI
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const { CallToolRequestSchema, ListToolsRequestSchema } = require('@modelcontextprotocol/sdk/types.js');

const server = new Server(
  {
    name: 'openrouter-mcp',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Configurazione OpenRouter
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Lista dei modelli disponibili
const AVAILABLE_MODELS = {
  'claude-3.5-sonnet': 'anthropic/claude-3.5-sonnet',
  'claude-3-haiku': 'anthropic/claude-3-haiku',
  'gpt-4o': 'openai/gpt-4o',
  'gpt-4o-mini': 'openai/gpt-4o-mini',
  'deepseek-chat': 'deepseek/deepseek-chat',
  'deepseek-coder': 'deepseek/deepseek-coder',
  'qwen-3-30b': 'qwen/qwen3-30b-a3b-instruct-2507',
  'gemini-pro': 'google/gemini-pro-1.5',
  'llama-3.1-405b': 'meta-llama/llama-3.1-405b-instruct',
  'llama-3.1-70b': 'meta-llama/llama-3.1-70b-instruct',
  'mistral-large': 'mistralai/mistral-large',
  'mixtral-8x7b': 'mistralai/mixtral-8x7b-instruct',
  'codestral-2508': 'mistralai/codestral-2508',
  'glm-4-32b': 'z-ai/glm-4-32b'
};

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'openrouter_chat',
        description: 'Chat con modelli AI via OpenRouter - Supporta Claude, GPT-4, Gemini, Llama e altri',
        inputSchema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Il messaggio da inviare al modello',
            },
            model: {
              type: 'string',
              description: 'Modello da usare (nome breve o ID completo)',
              default: 'claude-3.5-sonnet',
              enum: Object.keys(AVAILABLE_MODELS)
            },
            temperature: {
              type: 'number',
              description: 'Temperatura per la risposta (0.0-2.0)',
              default: 0.7,
              minimum: 0.0,
              maximum: 2.0
            },
            max_tokens: {
              type: 'number',
              description: 'Numero massimo di token',
              default: 4096,
              minimum: 1,
              maximum: 32000
            },
          },
          required: ['message'],
        },
      },
      {
        name: 'list_models',
        description: 'Elenca tutti i modelli disponibili su OpenRouter',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
    ],
  };
});

// Gestione delle chiamate ai tool
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'openrouter_chat') {
    try {
      const { message, model = 'claude-3.5-sonnet', temperature = 0.7, max_tokens = 4096 } = args;
      
      // Risolvi il modello (nome breve -> ID completo)
      const modelId = AVAILABLE_MODELS[model] || model;

      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://localhost:3000',
          'X-Title': 'MCP OpenRouter Client',
        },
        body: JSON.stringify({
          model: modelId,
          messages: [
            {
              role: 'user',
              content: message,
            },
          ],
          temperature: temperature,
          max_tokens: max_tokens,
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(`OpenRouter error: ${data.error?.message || 'Errore sconosciuto'}`);
      }

      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new Error('Nessuna risposta ricevuta dal modello');
      }

      return {
        content: [
          {
            type: 'text',
            text: `**Modello:** ${modelId}\n\n${content}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ **Errore:** ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  if (name === 'list_models') {
    try {
      const modelList = Object.entries(AVAILABLE_MODELS)
        .map(([shortName, fullId]) => `• **${shortName}**: ${fullId}`)
        .join('\n');
      
      return {
        content: [
          {
            type: 'text',
            text: `📋 **Modelli disponibili:**\n\n${modelList}\n\n💡 **Uso:** Puoi usare sia il nome breve (es. 'claude-3.5-sonnet') che l'ID completo.`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ **Errore nel listare i modelli:** ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Tool sconosciuto: ${name}`);
});

// Avvio del server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server OpenRouter avviato');
}

main().catch((error) => {
  console.error('Errore nell\'avvio del server MCP:', error);
  process.exit(1);
});