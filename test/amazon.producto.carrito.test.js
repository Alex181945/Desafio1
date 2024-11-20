const puppeteer = require('puppeteer');

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch({ headless: false }); // Cambiar a true si no se requiere interfaz gráfica.
  page = await browser.newPage();
  await page.goto(
    'https://www.amazon.com.mx/nuevo-fire-tv-stick-con-control-remoto-por-voz-alexa/dp/B08C1TMCH5?ref=dlx_deals_dg_dcl_B08C1TMCH5_dt_sl14_30',
    { waitUntil: 'domcontentloaded' }
  );
  await page.setViewport({ width: 1920, height: 1080 });
});

afterAll(async () => {
  await browser.close();
});

describe('Verificar precio del producto en el carrito', () => {
  it('Debería agregar el producto al carrito y verificar el precio', async () => {
    // Esperar que el precio esté visible y almacenarlo
    await page.waitForSelector('.a-price .a-offscreen', { timeout: 30000 });
    const productPrice = await page.$eval('.a-price .a-offscreen', (el) =>
      el.innerText.trim()
    );

    if (!productPrice) {
      throw new Error('No se pudo obtener el precio del producto.');
    }
    console.log('Precio del producto:', productPrice);

    // Hacer clic en el botón "Agregar al carrito"
    await page.waitForSelector('#add-to-cart-button', { timeout: 15000 });
    await page.click('#add-to-cart-button');

    // Ir al carrito
    await page.waitForSelector('#nav-cart', { timeout: 15000 });
    await page.click('#nav-cart');

    // Extraer el precio del carrito
    await page.waitForSelector('.sc-number-of-items', { timeout: 15000 });
    const cartPrice = await page.$eval('.sc-price', (el) =>
      el.innerText.trim()
    );

    if (!cartPrice) {
      throw new Error(
        'No se pudo obtener el precio del producto en el carrito.'
      );
    }
    console.log('Precio en el carrito:', cartPrice);

    // Verificar que los precios coincidan
    expect(cartPrice).toBe(productPrice);
  });
});
