with open('src/app/api/vip-link/route.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("assertSameOriginMutation(request);", "assertSameOriginMutation(request);\n    await assertAdminSession(request);")
with open('src/app/api/vip-link/route.ts', 'w', encoding='utf-8') as f:
    f.write(content)

with open('src/app/api/admin/vip-links/route.ts', 'r', encoding='utf-8') as f:
    content2 = f.read()
if "assertAdminSession" not in content2:
    content2 = content2.replace("export async function GET(request: Request) {\n  try {\n", "export async function GET(request: Request) {\n  try {\n    await assertAdminSession(request);\n")
    with open('src/app/api/admin/vip-links/route.ts', 'w', encoding='utf-8') as f:
        f.write(content2)

