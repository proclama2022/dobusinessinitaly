#!/usr/bin/env node

const https = require('https');
const { spawn } = require('child_process');

class OpenRouterMCP {
  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY;
    if (!this.apiKey) {
      console.error('OPENROUTER_API_KEY environment variable is required');
      process.exit(1);
    }
  }

  async makeRequest(messages, model = 'anthropic/claude-3.5-sonnet') {
    return new Promise((resolve, reject) => {
      const data = JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096
      });

      const options = {
        hostname: 'openrouter.ai',
        port: 443,
        path: '/api/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Length': Buffer.byteLength(data)
        }
      };

      const req = https.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => {
          body += chunk;
        });
        res.on('end', () => {
          try {
            const response = JSON.parse(body);
            if (response.error) {
              reject(new Error(response.error.message));
            } else {
              resolve(response.choices[0].message.content);
            }
          } catch (e) {
            reject(e);
          }
        });
      });

      req.on('error', (e) => {
        reject(e);
      });

      req.write(data);
      req.end();
    });
  }

  async handleMessage(message) {
    try {
      const messages = [{ role: 'user', content: message }];
      const response = await this.makeRequest(messages);
      return response;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }
}

// MCP Protocol Implementation
const mcp = new OpenRouterMCP();

process.stdin.on('data', async (data) => {
  try {
    const message = data.toString().trim();
    if (message) {
      const response = await mcp.handleMessage(message);
      process.stdout.write(JSON.stringify({ response }) + '\n');
    }
  } catch (error) {
    process.stdout.write(JSON.stringify({ error: error.message }) + '\n');
  }
});

process.stdout.write('OpenRouter MCP Server ready\n');