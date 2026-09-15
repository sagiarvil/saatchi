export function getLuxuryImageFallback(brand: string, modelName: string = ""): string {
  const b = brand?.toLowerCase() || "";
  const m = modelName?.toLowerCase() || "";

  if (b.includes("rolex")) {
    if (m.includes("submariner")) return "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m124060-0001.png";
    if (m.includes("daytona")) return "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126500ln-0001.png";
    if (m.includes("datejust")) return "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m126234-0015.png";
    return "https://images.rolex.com/catalogue/images/upright-bba-with-shadow/m124060-0001.png";
  }
  
  if (b.includes("patek") || b.includes("philippe")) {
    if (m.includes("nautilus")) return "https://static.patek.com/images/articles/face_white/350/5711_1A_010.jpg";
    if (m.includes("aquanaut")) return "https://static.patek.com/images/articles/face_white/350/5167A_001.jpg";
    return "https://static.patek.com/images/articles/face_white/350/5711_1A_010.jpg";
  }

  if (b.includes("audemars") || b.includes("piguet")) {
    return "https://www.audemarspiguet.com/content/dam/ap/com/products/watches/MTO/15500ST.OO.1220ST.01/impex/15500ST.OO.1220ST.01.png";
  }
  
  if (b.includes("richard") || b.includes("mille")) {
    return "https://media.richardmille.com/wp-content/uploads/2021/04/16155909/richard-mille-rm-72-01-lifestyle-in-house-chronograph-3037.png";
  }

  // Generic fallback
  return "https://contents.konyalisaat.com.tr/cdn-cgi/image/w=768,q=80,format=auto/products/AL-525NW4S36.jpg";
}
