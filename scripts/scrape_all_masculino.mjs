import fs from 'fs';

async function scrapeAllMasculino() {
  const allMascProducts = [];
  const seenNames = new Set();
  let idCounter = 1;

  for (let page = 1; page <= 3; page++) {
    const url = `https://atacadobrandcollection.com/brand-collection-masculino/?page=${page}`;
    console.log(`Fetching page ${page}: ${url}`);

    try {
      const res = await fetch(url);
      const html = await res.text();
      const chunks = html.split('js-product-container');

      for (let i = 1; i < chunks.length; i++) {
        const chunk = chunks[i];

        const nameMatch = chunk.match(/class="[^"]*item-name[^"]*"[^>]*>([^<]+)<\/a>/) || chunk.match(/title="([^"]+)"/);
        const imgMatch = chunk.match(/\/\/(acdn-us\.mitiendanube\.com\/stores\/[^\s"'\)]+)/);
        const priceMatch = chunk.match(/item-price[^>]*>[\s\n]*R\$\s*([\d.,]+)/);
        const oldPriceMatch = chunk.match(/item-price-compare[^>]*>[\s\n]*R\$\s*([\d.,]+)/);

        if (nameMatch) {
          const rawName = nameMatch[1].replace(/&#039;/g, "'").replace(/&amp;/g, '&').trim();

          if (rawName.toLowerCase() === 'nuvemshop' || !rawName) continue;
          if (seenNames.has(rawName)) continue;
          seenNames.add(rawName);

          let imgUrl = '';
          if (imgMatch) {
            imgUrl = 'https://' + imgMatch[1].replace(/^\/\//, '').replace(/-\d+-\d+\.webp/, '-1024-1024.webp');
          }

          let price = priceMatch ? parseFloat(priceMatch[1].replace('.', '').replace(',', '.')) : 69.90;
          if (Math.abs(price - 69.77) < 0.01) {
            price = 69.90;
          }

          let oldPrice = oldPriceMatch ? parseFloat(oldPriceMatch[1].replace('.', '').replace(',', '.')) : 89.00;

          const numMatch = rawName.match(/^(\d{2,4})\b/) || rawName.match(/\b(\d{3,4})\b/);
          const number = numMatch ? numMatch[1] : String(idCounter).padStart(3, '0');

          allMascProducts.push({
            id: idCounter++,
            number: number,
            name: rawName,
            category: 'masculino',
            price: price,
            oldPrice: oldPrice,
            image: imgUrl
          });
        }
      }
    } catch (e) {
      console.error(`Error on page ${page}`, e);
    }
  }

  console.log(`Total unique masculine products scraped: ${allMascProducts.length}`);
  fs.writeFileSync('src/scraped_masculino_full.json', JSON.stringify(allMascProducts, null, 2));
}

scrapeAllMasculino();
