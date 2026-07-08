import type { Customer } from '../types';

const CUSTOMER_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_CUSTOMER_WEBAPP_URL as string | undefined;

export async function saveCustomerToGoogleSheet(customer: Customer) {
  if (!CUSTOMER_SHEET_URL) {
    return {
      ok: false,
      message: 'Google Sheet URL is not configured. Customer saved in app state only.',
    };
  }

  try {
    await fetch(CUSTOMER_SHEET_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        type: 'customer',
        id: customer.id,
        name: customer.name,
        email: customer.email,
        mobile: customer.mobile,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode,
        createdAt: new Date().toISOString(),
      }),
    });

    return {
      ok: true,
      message: 'Customer sent to Google Sheet.',
    };
  } catch {
    return {
      ok: false,
      message: 'Could not send customer to Google Sheet. Customer saved in app state only.',
    };
  }
}
