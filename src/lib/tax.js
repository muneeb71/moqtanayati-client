/**
 * Tax calculation utility
 * 
 * Uses a percentage-based tax rate (e.g., 15% VAT)
 * The tax rate can be configured via environment variable or defaults to 15%
 */

// Tax rate as a decimal (e.g., 0.15 for 15%)
// Can be overridden with NEXT_PUBLIC_TAX_RATE environment variable
const TAX_RATE = parseFloat(process.env.NEXT_PUBLIC_TAX_RATE || "0.15");

/**
 * Calculate tax amount based on subtotal
 * @param {number} subtotal - The subtotal amount before tax
 * @returns {number} The calculated tax amount (rounded to 2 decimal places)
 */
export function calculateTax(subtotal) {
  if (!subtotal || subtotal <= 0) {
    return 0;
  }
  const taxAmount = subtotal * TAX_RATE;
  return Math.round(taxAmount * 100) / 100; // Round to 2 decimal places
}

/**
 * Calculate grand total (subtotal + tax)
 * @param {number} subtotal - The subtotal amount before tax
 * @returns {number} The grand total including tax (rounded to 2 decimal places)
 */
export function calculateGrandTotal(subtotal) {
  const tax = calculateTax(subtotal);
  return Math.round((subtotal + tax) * 100) / 100;
}

/**
 * Get the tax rate as a percentage (for display)
 * @returns {number} Tax rate as percentage (e.g., 15 for 15%)
 */
export function getTaxRatePercentage() {
  return TAX_RATE * 100;
}

/**
 * Get the tax rate as a decimal (for calculations)
 * @returns {number} Tax rate as decimal (e.g., 0.15 for 15%)
 */
export function getTaxRate() {
  return TAX_RATE;
}

