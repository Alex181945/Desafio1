const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://www.amazon.com.mx', {
    waitUntil: 'domcontentloaded',
  });
  await page.setViewport({ width: 1920, height: 1080 });
});

afterAll(async () => {
  await browser.close();
});

describe('Pruebas de Amazon', () => {
  it('Debe hacer clic en el enlace y verificar la imagen de Tienda de accesorios', async () => {
    // Hacer clic en el elemento con la clase especificada
    await page.waitForSelector('img[alt="Accesorios"]');

    await page.click('._quad-category-card_desktopStyle_heroLink__1EhW2');

    // Esperar a que el h2 con el texto "Resultados" aparezca
    await page.waitForFunction(() => {
      const h2Elements = Array.from(document.querySelectorAll('h2'));
      return h2Elements.some((h2) => h2.textContent.trim() === 'Resultados');
    });

    // Verificar que el h2 está presente
    const h2 = await page.evaluate(() => {
      const h2Elements = Array.from(document.querySelectorAll('h2'));
      return h2Elements.find((h2) => h2.textContent.trim() === 'Resultados');
    });
    expect(h2).not.toBeNull();
  });
});
