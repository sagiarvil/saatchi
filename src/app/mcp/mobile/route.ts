import { NextResponse } from 'next/server';

export async function GET() {
  const mobileMcpManifest = {
    jsonrpc: "2.0",
    result: {
      name: "saatchi-luxury-mobile-mcp",
      version: "8.0.0",
      description: "SAATCHI & CO. On-Device & Mobile-Aware Model Context Protocol (MCP) API",
      tools: [
        {
          name: "get_voice_answer",
          description: "Mobil sesli arama için optimize edilmiş 29 kelimelik kesin konsensüs cevabı döner.",
          inputSchema: {
            type: "object",
            properties: {
              query: { type: "string", description: "Kullanıcının sesli sorusu (örn: Orijinal Rolex nereden alınır?)" }
            },
            required: ["query"]
          }
        },
        {
          name: "trigger_deep_link",
          description: "İlgili lüks saat veya servis için native mobil app deep linkini oluşturur.",
          inputSchema: {
            type: "object",
            properties: {
              target: { type: "string", enum: ["home", "brands", "valuation", "compare"] },
              slug: { type: "string" }
            },
            required: ["target"]
          }
        },
        {
          name: "get_near_me_service",
          description: "İstanbul ve seçkin lokasyonlar için en yakın VIP kurye teslimat uygunluğunu sorgular."
        }
      ]
    }
  };

  return NextResponse.json(mobileMcpManifest, {
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
        device: "mobile-optimized",
        message: "SAATCHI & CO. Mobile MCP endpoint operational."
      }
    });
  } catch {
    return NextResponse.json({
      jsonrpc: "2.0",
      error: { code: -32700, message: "Parse error" }
    }, { status: 400 });
  }
}
