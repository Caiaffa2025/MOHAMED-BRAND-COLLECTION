export const STORE_CONFIG = {
  name: 'Mohamed_Brand_Collection',
  whatsappRaw: '5511984937529',
  whatsappDisplay: '(11) 98493-7529',
  getWhatsappUrl: (message?: string) => {
    const text = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/5511984937529${text}`;
  },
  email: 'atendimento@mohamedbrandcollection.com.br'
};
