import { test, expect } from "@/fixtures/MasterDataProduct.fixture";
import { FilterDrawer } from "@/POM/MasterDataProduct/Drawers/FilterDrawer";

test.describe("CreateFilter", () => {

test('Createanewfilter', async ({ mdpEditorPage }) => {
    
    //test.slow();
    await mdpEditorPage.selectEntity("Product");
    await mdpEditorPage.createNewFilter();  
    const filterAttributeDrawer = new  FilterDrawer(mdpEditorPage.mdpFrame);
    await filterAttributeDrawer.createBasicFilter("ABF-2009");
    const iframe = mdpEditorPage.page.frameLocator('[data-testid="iframe-page-Org.ProfiseeMdm"]');
    await iframe.locator('div[data-testid="grid-scroll-container"]').waitFor({ state: 'visible' });
    const rows = iframe.locator('div[data-testid="grid-scroll-container"] button');
    await expect(rows).toHaveCount(1, { timeout: 10000 });
    await expect(rows).toContainText('Atest BfABF-2009');

     const rowElements = await rows.allTextContents();
     rowElements.forEach((element, index) => {
         console.log(`Elemento ${index + 1}:`, element);
     });
    
     //console.log(rowElements);
    await mdpEditorPage.page.waitForTimeout(5000);
})
})
