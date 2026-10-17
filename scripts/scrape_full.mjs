import fs from 'fs';

async function run() {
  const pages = [
    { cat: "feminino", url: "https://atacadobrandcollection.com/brand-collection-feminino/?page=1" },
    { cat: "feminino", url: "https://atacadobrandcollection.com/brand-collection-feminino/?page=2" },
    { cat: "feminino", url: "https://atacadobrandcollection.com/brand-collection-feminino/?page=3" },
    { cat: "masculino", url: "https://atacadobrandcollection.com/brand-collection-masculino/?page=1" },
    { cat: "masculino", url: "https://atacadobrandcollection.com/brand-collection-masculino/?page=2" }
  ];

  const all = [];
  let id = 1;

  for (const p of pages) {
    try {
      const res = await fetch(p.url);
      const html = await res.text();
      const chunks = html.split("js-product-container");
      for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i];
        const titleMatch = chunk.match(/class="[^"]*item-name[^"]*"[^>]*>([^<]+)<\/a>/) || chunk.match(/title="([^"]+)"/);
        const imgMatch = chunk.match(/\/\/(acdn-us\.mitiendanube\.com\/stores\/[^\s"'\)]+)/);
        const priceMatch = chunk.match(/item-price[^>]*>[\s\n]*R\$\s*([\d.,]+)/);
        const oldPriceMatch = chunk.match(/item-price-compare[^>]*>[\s\n]*R\$\s*([\d.,]+)/);
        
        if (titleMatch && imgMatch) {
          const rawTitle = titleMatch[1].replace(/&#039;/g, "'").replace(/&amp;/g, "&").trim();
          let img = imgMatch[1].replace(/^\/\//, "https://");
          img = img.replace(/-\d+-\d+\.webp/, "-1024-1024.webp");
          
          const price = priceMatch ? parseFloat(priceMatch[1].replace(".", "").replace(",", ".")) : 69.77;
          const oldPrice = oldPriceMatch ? parseFloat(oldPriceMatch[1].replace(".", "").replace(",", ".")) : 89.00;
          
          const numMatch = rawTitle.match(/^(\d{2,4})\b/) || rawTitle.match(/\b(\d{3,4})\b/);
          const number = numMatch ? numMatch[1] : "";
          
          all.push({
            id: id++,
            name: rawTitle,
            number: number,
            category: p.cat,
            price: price,
            oldPrice: oldPrice,
            image: img
          });
        }
      }
      console.log(`Finished ${p.cat} ${p.url}, total so far: ${all.length}`);
    } catch(e) {
      console.error(p.url, e);
    }
  }

  const seen = new Set();
  const deduped = [];
  for (const item of all) {
    if (!seen.has(item.name)) {
      seen.add(item.name);
      deduped.push(item);
    }
  }
  console.log("Total unique products:", deduped.length);
  fs.writeFileSync("src/scraped_all.json", JSON.stringify(deduped, null, 2));
}

run();
