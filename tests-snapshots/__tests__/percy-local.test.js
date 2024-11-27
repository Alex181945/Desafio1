const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

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
      'https://www.amazon.com.mx/Xiaomi-Celular-Poco-M5s-256GB/dp/B0C5K4D6NF/?_encoding=UTF8&pd_rd_w=2Fd95&content-id=amzn1.sym.6481c05f-6c66-4192-bbb9-20da2972ec38&pf_rd_p=6481c05f-6c66-4192-bbb9-20da2972ec38&pf_rd_r=ENFNGDFPYTHJ7FJ4E77Y&pd_rd_wg=bDZi6&pd_rd_r=880efdb5-1f0e-47db-b2a2-cd38e08b8232&ref_=pd_hp_d_atf_unk&th=1',
      { waitUntil: 'domcontentloaded' }
    );
    await page.setViewport({ width: 1920, height: 1080 });

    // Crear el directorio screenshots_percy si no existe
    if (!fs.existsSync('screenshots_percy')) {
      fs.mkdirSync('screenshots_percy');
    }
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

    // Tomar la captura de pantalla y guardarla en el directorio screenshots_percy
    const screenshotPath = path.join(
      'screenshots_percy',
      'producto_amazon.png'
    );
    await page.screenshot({ path: screenshotPath });

    // Verificar que la captura de pantalla se haya guardado
    expect(fs.existsSync(screenshotPath)).toBe(true);
  });
});
