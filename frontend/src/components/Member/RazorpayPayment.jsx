

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export async function initiatePayment({ amount, onSuccess }) {
  const isLoaded = await loadRazorpayScript();

  if (!isLoaded) {
    alert("Failed to load Razorpay SDK. Check your internet connection.");
    return;
  }

  const options = {
    key: "rzp_test_4Ea0vvGa7O4ivP", 
    amount: amount * 100, 
    currency: "INR",
    name: "Online Pharmacy",
    description: "Order Payment",
    handler: function (response) {
      onSuccess(response);
    },
    prefill: {
      name: "Pharma",
      email: "pharma@123",
      contact: "1234567890",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
}
