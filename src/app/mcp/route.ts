import { NextResponse } from 'next/server';

export async function GET() {
  const mcpManifest = {
    jsonrpc: "2.0",
    result: {
      name: "saatchi-luxury-mcp",
      version: "8.0.0",
      description: "SAATCHI Lüks Saatler Model Context Protocol (MCP) API",
      tools: [
        {
          name: "search_watches",
          description: "Rolex, Cartier, TAG Heuer, Rado lüks kol saatleri arasında arama yapar.",
          inputSchema: {
            type: "object",
            properties: {
              brand: { type: "string", description: "Saat markası (örn: Rolex, Cartier)" },
              query: { type: "string", description: "Model adı veya referans no" },
              maxPrice: { type: "number", description: "Maksimum TL bütçe" }
            }
          }
        },
        {
          name: "get_watch_valuation",
          description: "İkinci el lüks saat için anlık piyasa değerleme tahmini üretir.",
          inputSchema: {
            type: "object",
            properties: {
              brand: { type: "string" },
              model: { type: "string" },
              hasBoxAndPapers: { type: "boolean" },
              condition: { type: "string", enum: ["new", "mint", "good", "fair"] }
            },
            required: ["brand", "model"]
          }
        },
        {
          name: "get_llm_graph",
          description: "Lüks saat kataloğu için semantik markdown bilgi havuzunu çeker."
        }
      ]
    }
  };

  return NextResponse.json(mcpManifest, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const id = body.id || 1;

    if (body.method === 'tools/list') {
      return GET();
    }

    return NextResponse.json({
      jsonrpc: "2.0",
      id,
      result: {
        status: "ok",
        message: "SAATCHI MCP endpoint ready."
      }
    });
  } catch {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: { code: -32700, message: "Parse error" }
    }, { status: 400 });
  }
}
