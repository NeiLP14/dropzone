import { expect, test } from '@playwright/test'

// End-to-end tests: they run against the whole stack (front, API, database).

test('la liste des drops s’affiche', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Les drops' })).toBeVisible()
  await expect(page.getByTestId('drop-card').first()).toBeVisible()
})

test("commander décrémente le stock", async ({ page }) => {
  await page.goto("/");

  // Ouvrir un drop disponible
  await page.getByText("Air Max 1 « Laval »").click();

  // Récupérer le stock affiché
  const stock = page.getByTestId("remaining");

  const initialText = await stock.textContent();
  const initialStock = Number(initialText?.match(/\d+/)?.[0]);

  // Commander
  await page.getByRole("button", { name: "Commander" }).click();

  // Vérifier que le stock a diminué de 1
  await expect(stock).toHaveText(
    new RegExp(`^${initialStock - 1} /`)
  );
});

test("un drop épuisé désactive le bouton", async ({ page }) => {
  await page.goto("/");

  // Ouvrir un drop épuisé
  await page.getByText("Dunk Low « Saint-Berthevin »").click();

  // Récupérer le bouton de commande
  const button = page.getByRole("button", {
    name: "Épuisé",
  });

  // Vérifier qu'il est désactivé
  await expect(button).toBeDisabled();
});