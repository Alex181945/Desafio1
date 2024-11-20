const puppeteer = require('puppeteer');
const percySnapshot = require('@percy/puppeteer');

describe('Captura de pantalla', () => {
  let browser;
  let page;

  /**
   * Configuración inicial antes de ejecutar las pruebas.
   * Se lanza el navegador y se abre una nueva página.
   */
  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false }); // Cambiar a true si no se requiere interfaz gráfica.
    page = await browser.newPage();
    await page.goto(
      'https://www.amazon.com.mx/nuevo-fire-tv-stick-con-control-remoto-por-voz-alexa/dp/B08C1TMCH5?ref=dlx_deals_dg_dcl_B08C1TMCH5_dt_sl14_30',
      { waitUntil: 'domcontentloaded' }
    );
    await page.setViewport({ width: 1920, height: 1080 });
  });

  /**
   * Cierra el navegador después de ejecutar las pruebas.
   */
  afterAll(async () => {
    await browser.close();
  });

  test('Captura', async () => {
    // Esperar que el precio esté visible y almacenarlo
    await page.waitForSelector('.a-price .a-offscreen', { timeout: 30000 });
    await percySnapshot(page, 'Producto en Amazon');
    expect(true).toBe(true);
  });
});
