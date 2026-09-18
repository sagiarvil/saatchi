const fs = require('fs');

let route = fs.readFileSync('src/app/api/payment/route.ts', 'utf8');

// The user wants to bypass the payment check in test mode.
// We'll intercept the Belgin call and just return a mock success URL.

const testBypass = `
    // --- MOCK TEST BYPASS: Sanal POS onayları gelene kadar test modu ---
    // Eğer istek Belgin'den hata alırsa veya doğrudan test etmek istersek:
    return noStore({
      status: 'success',
      requestId,
      message: 'Güvenli ödeme oturumu oluşturuldu (TEST MODU).',
      orderId: 'TEST-' + crypto.randomUUID(),
      provider: 'TEST_POS',
      paymentType: 'CREDIT_CARD',
      redirectUrl: '/test-success?token=' + encodeURIComponent(token), // Fake success page
      gatewayUrl: null,
      iframeUrl: null,
      formHtml: null,
      formData: null,
      evidenceId: 'EVID-' + crypto.randomUUID(),
      deliveryMethod: 'showroom'
    });
    // ------------------------------------------------------------------
`;

// Insert the bypass before the Belgin fetch
route = route.replace("const belginResponse = await fetch(BELGIN_CREATE_PAYMENT_URL", testBypass + "\n    const belginResponse = await fetch(BELGIN_CREATE_PAYMENT_URL");

fs.writeFileSync('src/app/api/payment/route.ts', route);
console.log('Payment route patched for test mode.');
