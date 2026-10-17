import fs from 'fs';

const femData = JSON.parse(fs.readFileSync('src/scraped_feminino_full.json', 'utf8'));
const mascData = JSON.parse(fs.readFileSync('src/scraped_masculino_full.json', 'utf8'));

// Combine: Feminine first (111), then Masculine (42)
const combined = [...femData, ...mascData];

function getInspiration(name, category) {
  const n = name.toLowerCase();

  // Feminine Inspirations
  if (n.includes('scandal')) return { inspiration: 'Scandal', brand: 'Jean Paul Gaultier', family: 'Chipre Floral Doce' };
  if (n.includes('jadore') || n.includes("j'adore")) return { inspiration: "J'adore", brand: 'Christian Dior', family: 'Floral Frutado Nobre' };
  if (n.includes('valaya')) return { inspiration: 'Valaya', brand: 'Parfums de Marly', family: 'Floral Aldeídico' };
  if (n.includes('erba pura')) return { inspiration: 'Erba Pura', brand: 'Xerjoff', family: 'Âmbar Frutado Compartilhável' };
  if (n.includes('paradoxe')) return { inspiration: 'Paradoxe', brand: 'Prada', family: 'Floral Âmbar' };
  if (n.includes('chance')) return { inspiration: 'Chance Eau Fraîche', brand: 'Chanel', family: 'Chipre Floral Cítrico' };
  if (n.includes('la vie est belle') || n.includes('vie est belle')) return { inspiration: 'La Vie Est Belle', brand: 'Lancôme', family: 'Floral Frutado Gourmand' };
  if (n.includes('delina')) return { inspiration: 'Delina Exclusif', brand: 'Parfums de Marly', family: 'Floral Rosa Turca' };
  if (n.includes('good girl midnight')) return { inspiration: 'Good Girl Midnight', brand: 'Carolina Herrera', family: 'Âmbar Floral Oriental' };
  if (n.includes('good girl glam')) return { inspiration: 'Very Good Girl Glam', brand: 'Carolina Herrera', family: 'Floral Frutado Gourmand' };
  if (n.includes('good girl')) return { inspiration: 'Good Girl', brand: 'Carolina Herrera', family: 'Oriental Floral Doce' };
  if (n.includes('212 vip rose') || n.includes('vip rose') || n.includes('vip rosé')) return { inspiration: '212 VIP Rosé', brand: 'Carolina Herrera', family: 'Floral Frutado' };
  if (n.includes('212 vip wild')) return { inspiration: '212 VIP Wild Party', brand: 'Carolina Herrera', family: 'Floral Frutado Exótico' };
  if (n.includes('212 vip') && category === 'feminino') return { inspiration: '212 VIP Gold', brand: 'Carolina Herrera', family: 'Oriental Baunilha' };
  if (n.includes('212 sexy')) return { inspiration: '212 Sexy', brand: 'Carolina Herrera', family: 'Floral Oriental' };
  if (n.includes('212') && category === 'feminino') return { inspiration: '212 NYC Tradicional', brand: 'Carolina Herrera', family: 'Floral Fresco' };
  if (n.includes('interditch') || n.includes("l'interdit") || n.includes('interdit')) return { inspiration: "L'Interdit Rouge", brand: 'Givenchy', family: 'Floral Ambarino Especiado' };
  if (n.includes('ch feminino') || n.includes('ch tradicional')) return { inspiration: 'CH Tradicional', brand: 'Carolina Herrera', family: 'Floral Oriental' };
  if (n.includes('fame')) return { inspiration: 'Fame', brand: 'Paco Rabanne', family: 'Floral Amadeirado Frutado' };
  if (n.includes('idole') || n.includes('idôle')) return { inspiration: 'Idôle', brand: 'Lancôme', family: 'Chipre Floral Limpo' };
  if (n.includes('dylan turquoise')) return { inspiration: 'Dylan Turquoise', brand: 'Versace', family: 'Floral Frutado Cítrico' };
  if (n.includes('dylan') && category === 'feminino') return { inspiration: 'Dylan Blue / Purple', brand: 'Versace', family: 'Floral Frutado Sofisticado' };
  if (n.includes('olympea') || n.includes('olimp')) return { inspiration: 'Olympéa', brand: 'Paco Rabanne', family: 'Âmbar Floral Salgado' };
  if (n.includes('libre')) return { inspiration: 'Libre Eau de Parfum', brand: 'Yves Saint Laurent', family: 'Floral Fougère Lavanda' };
  if (n.includes('coco') || n.includes('mademoiselle')) return { inspiration: 'Coco Mademoiselle', brand: 'Chanel', family: 'Âmbar Floral Sofisticado' };
  if (n.includes('gabriela') || n.includes('gabrielle')) return { inspiration: 'Gabrielle', brand: 'Chanel', family: 'Floral Solar Branco' };
  if (n.includes('my way')) return { inspiration: 'My Way', brand: 'Giorgio Armani', family: 'Floral Branco Tuberosa' };
  if (n.includes('lady million')) return { inspiration: 'Lady Million', brand: 'Paco Rabanne', family: 'Floral Frutado Dourado' };
  if (n.includes('eufhoria') || n.includes('euphoria')) return { inspiration: 'Euphoria', brand: 'Calvin Klein', family: 'Floral Oriental Exótico' };
  if (n.includes('fantasy')) return { inspiration: 'Fantasy', brand: 'Britney Spears', family: 'Floral Frutado Gourmand Doce' };
  if (n.includes('black opium')) return { inspiration: 'Black Opium', brand: 'Yves Saint Laurent', family: 'Oriental Baunilha Café' };
  if (n.includes('miss dior')) return { inspiration: 'Miss Dior', brand: 'Christian Dior', family: 'Chipre Floral Rosa' };
  if (n.includes('poison girl')) return { inspiration: 'Poison Girl', brand: 'Christian Dior', family: 'Âmbar Baunilha Doce' };
  if (n.includes('hypnotic poison')) return { inspiration: 'Hypnotic Poison', brand: 'Christian Dior', family: 'Âmbar Baunilha Amêndoa' };
  if (n.includes('pure poison')) return { inspiration: 'Pure Poison', brand: 'Christian Dior', family: 'Floral Branco Almiscarado' };
  if (n.includes('baccarat rouge')) return { inspiration: 'Baccarat Rouge 540', brand: 'Maison Francis Kurkdjian', family: 'Âmbar Amadeirado Luxo' };
  if (n.includes('gucci bloom')) return { inspiration: 'Gucci Bloom', brand: 'Gucci', family: 'Floral Tuberosa Intensa' };
  if (n.includes('devotion')) return { inspiration: 'Devotion', brand: 'Dolce & Gabbana', family: 'Gourmand Cítrico Baunilha' };
  if (n.includes('light blue')) return { inspiration: 'Light Blue', brand: 'Dolce & Gabbana', family: 'Floral Frutado Cítrico Fresco' };
  if (n.includes('the only one')) return { inspiration: 'The Only One', brand: 'Dolce & Gabbana', family: 'Oriental Floral Café Violeta' };
  if (n.includes('tressor') || n.includes('trésor')) return { inspiration: 'Trésor La Nuit', brand: 'Lancôme', family: 'Oriental Floral Frutado' };
  if (n.includes('chloe') || n.includes('chloé')) return { inspiration: 'Chloé Eau de Parfum', brand: 'Chloé', family: 'Floral Rosa Magnólia' };
  if (n.includes('angel nova')) return { inspiration: 'Angel Nova', brand: 'Mugler', family: 'Floral Frutado Framboesa Rosa' };
  if (n.includes('angel demon') || n.includes('ange ou démon')) return { inspiration: 'Ange ou Démon', brand: 'Givenchy', family: 'Oriental Floral Nobre' };
  if (n.includes('angel') && category === 'feminino') return { inspiration: 'Angel Tradicional', brand: 'Mugler', family: 'Oriental Gourmand Patchouli' };
  if (n.includes('allien') || n.includes('alien')) return { inspiration: 'Alien', brand: 'Mugler', family: 'Âmbar Amadeirado Jasmim Sambac' };
  if (n.includes('narciso')) return { inspiration: 'Narciso Rodriguez for Her', brand: 'Narciso Rodriguez', family: 'Almíscar Floral Amadeirado' };
  if (n.includes('si ') || n.includes('sì ') || n.includes('si passione')) return { inspiration: 'Sì Passione', brand: 'Giorgio Armani', family: 'Floral Frutado Pêra e Cassis' };
  if (n.includes('armani code') && category === 'feminino') return { inspiration: 'Armani Code Femme', brand: 'Giorgio Armani', family: 'Floral Laranja Mel Gengibre' };
  if (n.includes('flower bomb') || n.includes('flowerbomb')) return { inspiration: 'Flowerbomb', brand: 'Viktor & Rolf', family: 'Floral Oriental Intenso' };
  if (n.includes('elly saab') || n.includes('elie saab')) return { inspiration: 'Elie Saab Le Parfum', brand: 'Elie Saab', family: 'Floral Flor de Laranjeira Mel' };
  if (n.includes('jimmy choo')) return { inspiration: 'Jimmy Choo', brand: 'Jimmy Choo', family: 'Chipre Frutado Pêra Caramelo' };
  if (n.includes('toy boy') && category === 'feminino') return { inspiration: 'Toy 2 Bubble Gum', brand: 'Moschino', family: 'Floral Frutado Doce' };
  if (n.includes('mon guerlain') || (n.includes('guerlan') && category === 'feminino')) return { inspiration: 'Mon Guerlain', brand: 'Guerlain', family: 'Âmbar Baunilha Lavanda' };
  if (n.includes('lira')) return { inspiration: 'Casamorati Lira', brand: 'Xerjoff', family: 'Âmbar Floral Caramelo Cítrico' };
  if (n.includes('cristal noir') || n.includes('crystal noir')) return { inspiration: 'Crystal Noir', brand: 'Versace', family: 'Âmbar Floral Coco Especiarias' };
  if (n.includes('issey') && category === 'feminino') return { inspiration: "L'Eau d'Issey", brand: 'Issey Miyake', family: 'Floral Aquático Lótus Melão' };
  if (n.includes('tiffany')) return { inspiration: 'Tiffany & Co.', brand: 'Tiffany', family: 'Floral Nobre Íris Mandarina' };
  if (n.includes('wanted girl')) return { inspiration: 'Wanted Girl', brand: 'Azzaro', family: 'Floral Oriental Doce de Leite' };
  if (n.includes('black xs') && category === 'feminino') return { inspiration: 'Black XS For Her', brand: 'Paco Rabanne', family: 'Âmbar Amadeirado Cranberry' };
  if (n.includes('divine')) return { inspiration: 'Gaultier Divine', brand: 'Jean Paul Gaultier', family: 'Floral Salgado Merengue Lírio' };
  if (n.includes('la belle')) return { inspiration: 'La Belle', brand: 'Jean Paul Gaultier', family: 'Âmbar Baunilha Pêra' };
  if (n.includes('cherry smoke') || n.includes('rose prick')) return { inspiration: 'Private Blend', brand: 'Tom Ford', family: 'Oriental Especiado Luxo' };

  // Masculine Inspirations
  if (n.includes('creed') || n.includes('aventus')) return { inspiration: 'Aventus', brand: 'Creed', family: 'Chipre Frutado Abacaxi' };
  if (n.includes('one million lucky') || n.includes('1 million lucky')) return { inspiration: '1 Million Lucky', brand: 'Paco Rabanne', family: 'Amadeirado Gourmand Avelã' };
  if (n.includes('one million') || n.includes('1 million')) return { inspiration: '1 Million Tradicional', brand: 'Paco Rabanne', family: 'Especiado Amadeirado Couro' };
  if (n.includes('sauvage elixir')) return { inspiration: 'Sauvage Elixir', brand: 'Christian Dior', family: 'Aromático Especiado Nobre' };
  if (n.includes('sauvage')) return { inspiration: 'Sauvage Eau de Toilette', brand: 'Christian Dior', family: 'Aromático Fougère Especiado' };
  if (n.includes('myself') || n.includes('myslf')) return { inspiration: 'MYSLF', brand: 'Yves Saint Laurent', family: 'Floral Amadeirado Moderno' };
  if (n.includes('allure sport')) return { inspiration: 'Allure Homme Sport', brand: 'Chanel', family: 'Amadeirado Especiado Cítrico' };
  if (n.includes('bleu')) return { inspiration: 'Bleu de Chanel', brand: 'Chanel', family: 'Amadeirado Aromático Sofisticado' };
  if (n.includes('212 vip black')) return { inspiration: '212 VIP Black', brand: 'Carolina Herrera', family: 'Aromático Fougère Absinto' };
  if (n.includes('212 vip') && category === 'masculino') return { inspiration: '212 VIP Men Gold', brand: 'Carolina Herrera', family: 'Oriental Amadeirado Gin Vodca' };
  if (n.includes('212 skateboard') || n.includes('heroes')) return { inspiration: '212 Heroes', brand: 'Carolina Herrera', family: 'Aromático Frutado Pêra Cannabis' };
  if (n.includes('212 men')) return { inspiration: '212 NYC Men Tradicional', brand: 'Carolina Herrera', family: 'Amadeirado Floral Almiscarado' };
  if (n.includes('bad boy')) return { inspiration: 'Bad Boy', brand: 'Carolina Herrera', family: 'Oriental Especiado Cacau Pimenta' };
  if (n.includes('phantom')) return { inspiration: 'Phantom', brand: 'Paco Rabanne', family: 'Aromático Lavanda Limão Baunilha' };
  if (n.includes('ferrari black')) return { inspiration: 'Ferrari Black', brand: 'Ferrari', family: 'Aromático Fougère Maçã Ameixa' };
  if (n.includes('aqua d') || n.includes('acqua di gio')) return { inspiration: 'Acqua Di Giò', brand: 'Giorgio Armani', family: 'Aquático Cítrico Aromático' };
  if (n.includes('invictus platinum')) return { inspiration: 'Invictus Platinum', brand: 'Paco Rabanne', family: 'Amadeirado Aromático Absinto Toranja' };
  if (n.includes('invictus')) return { inspiration: 'Invictus Tradicional', brand: 'Paco Rabanne', family: 'Aquático Amadeirado Folha de Louro' };
  if (n.includes('pure xs')) return { inspiration: 'Pure XS', brand: 'Paco Rabanne', family: 'Aromático Especiado Mirra Licor' };
  if (n.includes('le male elixir')) return { inspiration: 'Le Male Elixir', brand: 'Jean Paul Gaultier', family: 'Oriental Fougère Mel Fava Tonka' };
  if (n.includes('le male parfum')) return { inspiration: 'Le Male Le Parfum', brand: 'Jean Paul Gaultier', family: 'Oriental Ambarino Cardamomo Íris' };
  if (n.includes('le male') || (n.includes('jean paul') && category === 'masculino')) return { inspiration: 'Le Male Tradicional', brand: 'Jean Paul Gaultier', family: 'Oriental Fougère Menta Lavanda' };
  if (n.includes('diesel brave')) return { inspiration: 'Only The Brave', brand: 'Diesel', family: 'Oriental Amadeirado Couro Âmbar' };
  if (n.includes('polo blue')) return { inspiration: 'Polo Blue', brand: 'Ralph Lauren', family: 'Aromático Fougère Melão Camurça' };
  if (n.includes('armani code parfum')) return { inspiration: 'Armani Code Parfum', brand: 'Giorgio Armani', family: 'Amadeirado Aromático Íris Cedro' };
  if (n.includes('armani code') && category === 'masculino') return { inspiration: 'Armani Code', brand: 'Giorgio Armani', family: 'Oriental Especiado Couro Tabaco' };
  if (n.includes('most wanted')) return { inspiration: 'The Most Wanted', brand: 'Azzaro', family: 'Ambarino Especiado Amadeirado Toffee' };
  if (n.includes('wanted by night')) return { inspiration: 'Wanted By Night', brand: 'Azzaro', family: 'Amadeirado Especiado Canela Cedro' };
  if (n.includes('wanted') && category === 'masculino') return { inspiration: 'Azzaro Wanted', brand: 'Azzaro', family: 'Amadeirado Especiado Limão Gengibre' };
  if (n.includes('issey') && category === 'masculino') return { inspiration: "L'Eau d'Issey Pour Homme", brand: 'Issey Miyake', family: 'Amadeirado Aquático Yuzu Noz-Moscada' };
  if (n.includes('boss orange') || n.includes('boss')) return { inspiration: 'Boss Orange Man', brand: 'Hugo Boss', family: 'Amadeirado Especiado Maçã Baunilha' };
  if (n.includes('toy boy') && category === 'masculino') return { inspiration: 'Toy Boy', brand: 'Moschino', family: 'Amadeirado Especiado Rosa Pimenta Rosa' };
  if (n.includes('layton')) return { inspiration: 'Layton', brand: 'Parfums de Marly', family: 'Oriental Floral Baunilha Cardamomo' };
  if (n.includes('keather') || n.includes('leather') || (n.includes('tom ford') && category === 'masculino')) return { inspiration: 'Ombré Leather', brand: 'Tom Ford', family: 'Couro Floral Cardamomo Jasmim' };
  if (n.includes('animale')) return { inspiration: 'Animale For Men', brand: 'Animale', family: 'Aromático Fougère Lavanda Noz-Moscada' };
  if (n.includes('silver scent')) return { inspiration: 'Silver Scent', brand: 'Jacques Bogart', family: 'Oriental Fougère Flor de Laranjeira' };
  if (n.includes('lord') || n.includes('penhaligon')) return { inspiration: 'The Tragedy of Lord George', brand: "Penhaligon's", family: 'Oriental Amadeirado Rum Fava Tonka' };
  if (n.includes('mefisto')) return { inspiration: 'Casamorati Mefisto', brand: 'Xerjoff', family: 'Cítrico Aromático Bergamota Íris' };
  if (n.includes('kenzo')) return { inspiration: "L'Eau par Kenzo Pour Homme", brand: 'Kenzo', family: 'Aquático Cítrico Yuzu Hortelã' };
  if (n.includes('jaguar')) return { inspiration: 'Jaguar Classic Black', brand: 'Jaguar', family: 'Oriental Fougère Maçã Chá Preto' };
  if (n.includes('blue heart')) return { inspiration: 'Blue Heart', brand: 'Thameen', family: 'Âmbar Baunilha Fava Tonka' };

  // Fallback
  const cleanTitle = name.replace(/brand collection/gi, '').replace(/\b\d{2,4}\b/g, '').replace(/feminino/gi, '').replace(/masculino/gi, '').replace(/-\s*25ml/gi, '').replace(/[-–]/g, ' ').trim();
  return {
    inspiration: cleanTitle || (category === 'masculino' ? 'Fragrância Masculina Importada' : 'Fragrância Feminina Importada'),
    brand: 'Inspiração Internacional',
    family: category === 'masculino' ? 'Amadeirado Aromático Sofisticado' : 'Floral Amadeirado Sofisticado'
  };
}

const notesMap = {
  // Feminine
  'Chipre Floral Doce': { top: 'Laranja Sanguínea, Mandarina', heart: 'Mel, Gardênia, Jasmim, Flor de Laranjeira', base: 'Patchouli, Cera de Abelha, Caramelo' },
  'Floral Frutado Nobre': { top: 'Pêra, Melão, Magnólia, Pêssego', heart: 'Jasmim, Lírio-do-Vale, Tuberosa, Frésia', base: 'Almíscar, Baunilha, Cedro, Amora' },
  'Floral Aldeídico': { top: 'Aldeídos, Bergamota Branca, Tangerina', heart: 'Flor de Laranjeira, Pétalas de Petalia', base: 'Almíscar, Ambroxan, Vetiver' },
  'Âmbar Frutado Compartilhável': { top: 'Laranja da Sicília, Bergamota da Calábria', heart: 'Cesta de Frutas Mediterrâneas', base: 'Almíscar Branco, Baunilha de Madagascar' },
  'Floral Âmbar': { top: 'Pêra, Tangerina, Bergamota', heart: 'Flor de Laranjeira, Néroli, Jasmim Sambac', base: 'Baunilha Bourbon, Âmbar, Almíscar Branco' },
  'Floral Frutado Gourmand': { top: 'Groselha Preta, Pêra Fresca', heart: 'Íris Nobre, Jasmim, Flor de Laranjeira', base: 'Pralinê Doce, Baunilha, Patchouli, Fava Tonka' },
  'Floral Frutado': { top: 'Champagne Rosé, Pimenta Rosa', heart: 'Flor de Pêssego, Rosa', base: 'Notas Amadeiradas, Almíscar Branco, Âmbar' },
  'Oriental Baunilha': { top: 'Maracujá, Rum Tropical', heart: 'Gardênia, Almíscar Suave', base: 'Fava Tonka, Baunilha' },
  'Floral Rosa Turca': { top: 'Lichia, Ruibarbo, Bergamota, Noz-Moscada', heart: 'Rosa Turca, Peônia, Almíscar, Petalia', base: 'Cashmeran, Cedro, Incenso, Vetiver' },
  'Floral Fougère Lavanda': { top: 'Lavanda Francesa, Mandarina, Groselha', heart: 'Flor de Laranjeira Marroquina, Jasmim Sambac', base: 'Baunilha de Madagascar, Cedro, Âmbar Cinzento' },
  'Âmbar Floral Sofisticado': { top: 'Laranja, Mandarina, Bergamota, Flor de Laranjeira', heart: 'Rosa Turca, Jasmim, Mimosa, Ylang-Ylang', base: 'Patchouli, Almíscar Branco, Baunilha, Vetiver' },
  'Floral Branco Tuberosa': { top: 'Flor de Laranjeira, Bergamota', heart: 'Tuberosa da Índia, Jasmim Indiano', base: 'Baunilha de Madagascar, Almíscar Branco, Cedro da Virgínia' },

  // Masculine
  'Chipre Frutado Abacaxi': { top: 'Abacaxi, Bergamota, Groselha Preta, Maçã', heart: 'Bétula, Patchouli, Jasmim Marroquino, Rosa', base: 'Almíscar, Musgo de Carvalho, Âmbar Cinzento, Baunilha' },
  'Aromático Especiado Nobre': { top: 'Canela, Noz-moscada, Cardamomo, Toranja', heart: 'Lavanda Francesa de Grasse', base: 'Alcaçuz, Sândalo, Âmbar, Patchouli, Vetiver do Haiti' },
  'Aromático Fougère Especiado': { top: 'Bergamota da Calábria, Pimenta Sichuan', heart: 'Lavanda, Pimenta Rosa, Vetiver, Patchouli', base: 'Ambroxan, Cedro, Ládano' },
  'Floral Amadeirado Moderno': { top: 'Bergamota da Calábria, Flor de Laranjeira da Tunísia', heart: 'Flor de Laranjeira', base: 'Patchouli da Indonésia, Ambrofix' },
  'Amadeirado Especiado Cítrico': { top: 'Mandarina, Hortelã, Cipreste, Sálvia', heart: 'Pimenta Preta, Cedro, Sândalo', base: 'Fava Tonka, Almíscar Branco, Pimenta Rosa' },
  'Amadeirado Aromático Sofisticado': { top: 'Toranja, Limão Siciliano, Hortelã, Pimenta Rosa', heart: 'Gengibre, Noz-Moscada, Jasmim, Iso E Super', base: 'Incenso, Vetiver, Cedro, Sândalo, Patchouli' },
  'Aromático Fougère Absinto': { top: 'Absinto, Anis, Erva-Doce', heart: 'Lavanda', base: 'Casca de Baunilha Negra, Almíscar' },
  'Oriental Amadeirado Gin Vodca': { top: 'Maracujá, Gengibre, Pimenta Preta, Limão Caviar', heart: 'Vodca, Gin, Hortelã, Especiarias', base: 'Âmbar, Couro, Notas Amadeiradas' },
  'Aromático Frutado Pêra Cannabis': { top: 'Pêra, Gengibre', heart: 'Cannabis, Gerânio', base: 'Couro, Almíscar' },
  'Amadeirado Floral Almiscarado': { top: 'Notas Verdes, Toranja, Especiarias, Bergamota, Lavanda', heart: 'Gengibre, Violeta, Gardênia, Sálvia', base: 'Almíscar, Sândalo, Incenso, Vetiver, Madeira Guaiac' },
  'Oriental Especiado Cacau Pimenta': { top: 'Pimenta Branca, Pimenta Preta, Bergamota', heart: 'Sálvia, Cedro', base: 'Fava Tonka, Cacau, Madeira de Âmbar' },
  'Aromático Lavanda Limão Baunilha': { top: 'Lavanda, Raspas de Limão, Limão de Amalfi', heart: 'Lavanda, Maçã, Fumaça, Notas Terrosas, Patchouli', base: 'Baunilha, Lavanda, Vetiver' },
  'Aromático Fougère Maçã Ameixa': { top: 'Maçã Vermelha, Ameixa, Lima, Bergamota', heart: 'Canela, Jasmim, Cardamomo, Rosa', base: 'Baunilha, Âmbar, Cedro, Almíscar' },
  'Aquático Cítrico Aromático': { top: 'Lima, Limão, Bergamota, Jasmim, Laranja, Mandarina, Néroli', heart: 'Notas Oceânicas, Jasmim, Calone, Pêssego, Frésia, Jacinto, Alecrim', base: 'Almíscar Branco, Cedro, Musgo de Carvalho, Patchouli, Âmbar' },
  'Aquático Amadeirado Folha de Louro': { top: 'Notas Marinhas, Toranja, Mandarina', heart: 'Folha de Louro, Jasmim', base: 'Âmbar Cinzento, Madeira Guaiac, Musgo de Carvalho, Patchouli' },
  'Amadeirado Aromático Absinto Toranja': { top: 'Absinto, Toranja', heart: 'Lavanda, Cipreste', base: 'Patchouli, Cipreste' },
  'Aromático Especiado Mirra Licor': { top: 'Gengibre, Tomilho, Toranja, Bergamota, Acorde Verde', heart: 'Baunilha, Licor, Canela, Couro, Maçã', base: 'Mirra, Açúcar, Cedro, Notas Amadeiradas, Cashmeran, Patchouli' },
  'Oriental Fougère Mel Fava Tonka': { top: 'Lavanda, Hortelã', heart: 'Baunilha, Benjoim', base: 'Mel, Fava Tonka, Tabaco' },
  'Oriental Ambarino Cardamomo Íris': { top: 'Cardamomo', heart: 'Lavanda, Íris', base: 'Baunilha, Notas Orientais, Notas Amadeiradas' },
  'Oriental Fougère Menta Lavanda': { top: 'Lavanda, Hortelã, Cardamomo, Bergamota, Artemísia', heart: 'Canela, Flor de Laranjeira, Alcaravia', base: 'Baunilha, Fava Tonka, Âmbar, Sândalo, Cedro' },
  'Oriental Amadeirado Couro Âmbar': { top: 'Limão Amalfi, Mandarina', heart: 'Violeta, Cedro da Virgínia, Coentro', base: 'Âmbar, Couro, Benjoim, Ládano Francês, Styrax' },
  'Aromático Fougère Melão Camurça': { top: 'Pepino, Melão, Mandarina', heart: 'Manjericão, Sálvia, Gerânio', base: 'Camurça, Notas Amadeiradas, Almíscar' },
  'Amadeirado Aromático Íris Cedro': { top: 'Bergamota, Folha de Bergamota', heart: 'Íris, Raiz de Íris, Sálvia Esclaréia, Aldeídos', base: 'Fava Tonka, Cedro' },
  'Oriental Especiado Couro Tabaco': { top: 'Limão, Bergamota', heart: 'Anis Estrelado, Flor de Oliveira, Madeira Guaiac', base: 'Couro, Tabaco, Fava Tonka' },
  'Ambarino Especiado Amadeirado Toffee': { top: 'Cardamomo', heart: 'Toffee Caramelo', base: 'Madeira de Âmbar Bourbon' },
  'Amadeirado Especiado Canela Cedro': { top: 'Canela, Mandarina, Lavanda, Limão', heart: 'Notas Frutadas, Incenso, Cedro Vermelho, Cominho', base: 'Tabaco, Baunilha, Couro, Cedro, Benjoim, Iso E Super, Cipreste, Patchouli' },
  'Amadeirado Especiado Limão Gengibre': { top: 'Limão, Gengibre, Lavanda, Hortelã', heart: 'Cardamomo da Guatemala, Junípero, Maçã, Gerânio', base: 'Vetiver do Haiti, Fava Tonka, Madeira de Âmbar' },
  'Amadeirado Aquático Yuzu Noz-Moscada': { top: 'Yuzu, Limão, Bergamota, Lúcia-lima, Mandarina', heart: 'Lótus Azul, Noz-moscada, Lírio-do-vale, Açafrão', base: 'Vetiver do Taiti, Almíscar, Cedro, Sândalo, Âmbar' },
  'Amadeirado Especiado Maçã Baunilha': { top: 'Maçã Vermelha, Coentro', heart: 'Incenso, Pimenta Sichuan', base: 'Baunilha, Notas Amadeiradas' },
  'Amadeirado Especiado Rosa Pimenta Rosa': { top: 'Pimenta Rosa, Pêra, Noz-moscada, Elemi, Bergamota', heart: 'Rosa, Magnólia, Cravo-da-índia, Linho', base: 'Cashmeran, Vetiver do Haiti, Sândalo, Âmbar' },
  'Oriental Floral Baunilha Cardamomo': { top: 'Maçã, Lavanda, Bergamota, Mandarina', heart: 'Gerânio, Violeta, Jasmim', base: 'Baunilha, Cardamomo, Sândalo, Pimenta, Patchouli' },
  'Couro Floral Cardamomo Jasmim': { top: 'Cardamomo', heart: 'Couro, Jasmim Sambac', base: 'Âmbar, Musgo, Patchouli' },
  'Aromático Fougère Lavanda Noz-Moscada': { top: 'Lavanda, Frésia, Néroli', heart: 'Zimbro, Noz-moscada, Gerânio', base: 'Couro, Musgo de Carvalho, Vetiver' },
  'Oriental Fougère Flor de Laranjeira': { top: 'Flor de Laranjeira, Limão', heart: 'Lavanda, Cardamomo, Noz-moscada, Alecrim', base: 'Lichia, Fava Tonka, Madeira de Teca, Vetiver' },
  'Oriental Amadeirado Rum Fava Tonka': { top: 'Brandy, Rum Licoroso', heart: 'Notas Amadeiradas Nobres, Sabão de Barbear', base: 'Fava Tonka, Âmbar' },
  'Cítrico Aromático Bergamota Íris': { top: 'Toranja, Bergamota da Calábria, Limão de Amalfi', heart: 'Lavanda, Íris, Rosa', base: 'Almíscar, Cedro da Virgínia, Sândalo, Âmbar' },
  'Aquático Cítrico Yuzu Hortelã': { top: 'Yuzu, Lima, Pimenta Verde', heart: 'Folha de Lótus, Notas Aquáticas, Hortelã', base: 'Almíscar Branco, Cedro' },
  'Oriental Fougère Maçã Chá Preto': { top: 'Maçã Verde, Laranja Amarga, Mandarina', heart: 'Chá Preto, Água do Mar, Gerânio, Noz-moscada', base: 'Almíscar Branco, Cedro da Virgínia, Fava Tonka, Sândalo' },
  'Âmbar Baunilha Fava Tonka': { top: 'Açafrão, Coco', heart: 'Fava Tonka, Raiz de Orris', base: 'Âmbar Branco, Almíscar' },
  'Amadeirado Gourmand Avelã': { top: 'Ameixa, Notas Ozônicas, Toranja, Bergamota', heart: 'Avelã, Mel, Cedro, Madeira de Cashmere, Jasmim', base: 'Madeira de Âmbar, Patchouli, Musgo de Carvalho, Vetiver' },
  'Especiado Amadeirado Couro': { top: 'Mandarina Sanguínea, Hortelã, Toranja', heart: 'Canela, Notas Especiadas, Rosa', base: 'Âmbar, Couro, Notas Amadeiradas, Patchouli Indiano' }
};

const defaultNotes = {
  top: 'Notas Cítricas e Frutadas Refrescantes',
  heart: 'Bouquet Aromático Elegante e Sofisticado',
  base: 'Madeiras Nobres, Âmbar e Almíscar Aveludado'
};

const processed = combined.map((item, index) => {
  const meta = getInspiration(item.name, item.category);
  const notes = notesMap[meta.family] || defaultNotes;

  let img = item.image || '';
  if (!img.startsWith('http') && img.length > 5) {
    img = 'https://' + img.replace(/^\/\//, '');
  }

  // Ensure 69.90
  let finalPrice = item.price;
  if (!finalPrice || Math.abs(finalPrice - 69.77) < 0.01) {
    finalPrice = 69.90;
  }

  const rating = (4.8 + ((index * 7) % 3) * 0.1).toFixed(1);
  const reviewCount = 28 + ((index * 13) % 180);

  return {
    id: index + 1,
    number: item.number || String(index + 1).padStart(3, '0'),
    name: item.name,
    inspiration: meta.inspiration,
    brand: meta.brand,
    family: meta.family,
    category: item.category || 'feminino',
    volume: item.name.includes('250ml') ? '250ml' : '25ml',
    concentration: 'Eau de Parfum (Alta Fixação)',
    image: img,
    price: finalPrice,
    oldPrice: item.oldPrice || 89.00,
    wholesalePriceTier1: finalPrice, // 1 to 4 units
    wholesalePriceTier2: 64.90, // 5 to 9 units
    wholesalePriceTier3: 59.90, // 10+ units
    pixDiscountPercent: 5,
    inStock: true,
    stockCount: 15 + ((index * 11) % 45),
    rating: parseFloat(rating),
    reviewCount: reviewCount,
    badge: index < 15 ? 'Mais Vendido' : (index % 6 === 0 ? 'Lançamento' : (index % 4 === 0 ? 'Destaque Atacado' : undefined)),
    topNotes: notes.top,
    heartNotes: notes.heart,
    baseNotes: notes.base,
    description: `O perfume Brand Collection ${item.number ? '#' + item.number : ''} ${item.name} é um Eau de Parfum em frasco miniatura luxuoso de 25ml, réplica fiel do renomado ${meta.inspiration} (${meta.brand}). Desenvolvido com essências nobres importadas, proporciona alta fixação de 8 a 12 horas na pele e projeção marcante. Ideal para colecionar, levar na bolsa ou revender com margens superiores a 100% no atacado.`
  };
});

const tsContent = `// Auto-generated Brand Collection Catalog from target store
export interface Product {
  id: number;
  number: string;
  name: string;
  inspiration: string;
  brand: string;
  family: string;
  category: 'feminino' | 'masculino';
  volume: string;
  concentration: string;
  image: string;
  price: number;
  oldPrice: number;
  wholesalePriceTier1: number; // 1-4 unids
  wholesalePriceTier2: number; // 5-9 unids
  wholesalePriceTier3: number; // 10+ unids
  pixDiscountPercent: number;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
  description: string;
}

export const PRODUCTS: Product[] = ${JSON.stringify(processed, null, 2)};

export const WHOLESALE_TIERS = [
  { minQty: 1, maxQty: 4, label: '1 a 4 unidades', discountLabel: 'Preço Balcão', pricePerUnit: 69.90 },
  { minQty: 5, maxQty: 9, label: '5 a 9 unidades', discountLabel: 'Atacado Bronze (-7%)', pricePerUnit: 64.90 },
  { minQty: 10, maxQty: 19, label: '10 a 19 unidades', discountLabel: 'Atacado Prata (-14%)', pricePerUnit: 59.90 },
  { minQty: 20, maxQty: null, label: '20+ unidades', discountLabel: 'Super Atacado Ouro (-21%)', pricePerUnit: 54.90 },
];

export const FAMOUS_BRANDS = [
  'Todos',
  'Christian Dior',
  'Jean Paul Gaultier',
  'Paco Rabanne',
  'Carolina Herrera',
  'Chanel',
  'Creed',
  'Yves Saint Laurent',
  'Giorgio Armani',
  'Azzaro',
  'Lancôme',
  'Parfums de Marly',
  'Prada',
  'Givenchy',
  'Xerjoff',
  'Versace',
  'Tom Ford',
  'Ralph Lauren',
  'Hugo Boss',
  'Dolce & Gabbana'
];

export const OLFACTORY_FAMILIES = [
  'Todos',
  'Aromático Fougère Especiado',
  'Amadeirado Aromático Sofisticado',
  'Chipre Frutado Abacaxi',
  'Aquático Cítrico Aromático',
  'Aquático Amadeirado Folha de Louro',
  'Especiado Amadeirado Couro',
  'Floral Frutado Nobre',
  'Floral Frutado Gourmand',
  'Chipre Floral Doce',
  'Floral Rosa Turca',
  'Floral Âmbar',
  'Floral Fougère Lavanda',
  'Âmbar Frutado Compartilhável',
  'Oriental Baunilha'
];
`;

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}
fs.writeFileSync('src/data/products.ts', tsContent);
console.log('Successfully written src/data/products.ts with', processed.length, 'total products (', femData.length, 'feminine,', mascData.length, 'masculine)!');
