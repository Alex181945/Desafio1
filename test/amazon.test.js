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

describe('Amazon Tests', () => {
  it('Should click on the link and verify the Accessories Store image', async () => {
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

  it('Should click on the Amazon Prime link using a CSS selector', async () => {
    // Esperar a que el enlace de Ofertas esté presente y hacer clic en él usando un selector CSS
    await page.waitForSelector('a[href="/ref=nav_logo"]');
    await page.click('a[href="/ref=nav_logo"]');

    // Esperar a que la navegación se complete
    await page.waitForSelector('img[alt="Accesorios"]');

    // Verificar que la URL contiene "ref=nav_logo"
    const url = page.url();
    expect(url).toContain('ref=nav_logo');
  });

  it('Should verify the presence of a specific element using an XPath selector', async () => {
    // Navegar a la página de Ofertas directamente
    await page.goto('https://www.amazon.com.mx', {
      waitUntil: 'domcontentloaded',
    });

    // Verificar la presencia de un elemento específico usando un selector XPath
    const xpath =
      "::-p-xpath(//div[1]//h2//span//span[2][contains(text(), 'Ofertas')])";
    const element = await page.waitForSelector(xpath);

    // Verificar que el elemento está presente
    expect(element).not.toBeNull();
  });
});
