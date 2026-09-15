const fs = require('fs');

const fallbacks = {
  rolex: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
  patek: "https://images.unsplash.com/photo-1548171915-e7af554752c0?q=80&w=800&auto=format&fit=crop",
  audemars: "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800&auto=format&fit=crop",
  richard: "https://images.unsplash.com/photo-1587836374828-cb4387860987?q=80&w=800&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800&auto=format&fit=crop"
};

console.log(fallbacks);
