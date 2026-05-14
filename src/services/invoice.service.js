require("dotenv").config();
const invoiceRepository = require("../repositories/invoice.repository");
const cartRepository = require("../repositories/cart.repository");
const userRepository = require("../repositories/user.repository");
const invoiceProductRepository = require("../repositories/invoiceProduct.repository");
const productRepository = require("../repositories/product.repository");
const axios = require("axios");

//Invoice Service

const invoiceService = {
  createInvoice: async (userId, cusEmail) => {
    try {
      //=========Step 1: Calculate total payable amount from cart items=========//
      const cartProducts = await cartRepository.getCart(userId);

      console.log(`cartProducts: ${cartProducts[0].product.isDiscounted}`);

      let totalPayable = 0;
      if (cartProducts.length > 0) {
        let totalAmount = 0;

        // Process each product in the cart
        for (const item of cartProducts) {
          let price;
          console.log(item?.product?.isDiscounted);

          if (item?.product?.isDiscounted === true) {
            price = parseFloat(item?.product?.discountPrice);
          } else {
            price = parseFloat(item?.product?.price);
          }
          totalAmount += price * parseInt(item?.quantity); // item.price * item.quantity;
          // Example processing (replace with actual logic)
          console.log(`Processing item: ${item?.product_name}`);
        }

        let vat = totalAmount * 0.15; // Example VAT calculation (15% of total amount)
        let shippingCost = 75; // Example fixed shipping cost

        totalPayable = totalAmount + vat + shippingCost; // Add VAT and shipping cost to total amount
        console.log(`Total amount for invoice: ${totalAmount}`);

        //==========Step 2: Prepare customer and shipping details==========//
        const user = await userRepository.getUserById(userId);

        if (
          [
            user?.email,
            user?.name,
            user?.phone,
            user?.addresses?.address,
            user?.addresses?.city,
            user?.addresses?.country,
          ].every((field) => field === null && field === undefined)
        ) {
          throw new Error("User details are incomplete for invoice creation");
        }

        //Prepare user details for invoice
        const customerDetails = {
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          address: user?.addresses?.address,
          city: user?.addresses?.city,
          country: user?.addresses?.country,
        };

        //Prepare shipping details for invoice
        const shippingDetails = {
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          address: user?.shippingAddress?.address,
          city: user?.shippingAddress?.city,
          country: user?.shippingAddress?.country,
        };

        //==========Step 3: Create transaction and Validation ID's==========//
        let transactionId = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000000)}`; // Example transaction ID
        let validationId = `VAL-${Date.now()}-${Math.floor(Math.random() * 9000000)}`; // Example validation ID

        //==========Step 4: Create invoice record in database==========//
        const invoiceData = {
          userId,
          totalPayable,
          customerDetails,
          shippingDetails,
          transactionId,
          validationId,
          totalAmount,
          vat,
          totalAmount,
        };

        const invoice = await invoiceRepository.createInvoice(invoiceData);

        //==========Step 5: Create invoiceProducts record in database==========//
        const invoiceId = invoice._id;

        for (const item of cartProducts) {
          const invoiceProduct = {
            userId,
            productId: item?.product_id,
            invoiceId,
            product_name: item?.product_name,
            quantity: item?.quantity,
            price: item?.procuct?.isDiscounted
              ? item?.product?.discountPrice
              : item?.product?.price,
            color: item?.color,
            size: item?.size,
          };
          await invoiceProductRepository.createInvoiceProduct(invoiceProduct);
        }

        //==========Step 6: Product Stock update==========//
        for (const item of cartProducts) {
          await productRepository.updateProductStock(
            item?.product_id,
            item?.quantity,
          );
        }

        //==========Step 7: Delete cart items==========//
        await cartRepository.deleteCartsByUser(userId);

        //==========Step 8: Prepare SSl payment==========//
        // Your SSL payment integration logic here
        const paymentSettings = {
          store_id: process.env.SSLCZ_STORE_ID,
          store_passwd: process.env.SSLCZ_STORE_PASSWD,
          currency: process.env.SSLCZ_CURRENCY,
          success_url: process.env.SSLCZ_SUCCESS_URL,
          fail_url: process.env.SSLCZ_FAIL_URL,
          cancel_url: process.env.SSLCZ_CANCEL_URL,
          ipn_url: process.env.SSLCZ_IPN_URL,
          init_url: process.env.SSLCZ_INIT_URL,
        };

        //form dataa
        let form = new FormData();
        //payment details==========
        form.append("store_id", paymentSettings.store_id);
        form.append("store_passwd", paymentSettings.store_passwd);
        form.append("total_amount", totalPayable.toString());
        form.append("currency", paymentSettings.currency);
        form.append("tran_id", transactionId);
        form.append(
          "success_url",
          `${paymentSettings.success_url}/${transactionId}`,
        );
        form.append("fail_url", `${paymentSettings.fail_url}/${transactionId}`);
        form.append(
          "cancel_url",
          `${paymentSettings.cancel_url}/${transactionId}`,
        );
        form.append("ipn_url", `${paymentSettings.ipn_url}/${transactionId}`);

        //customer details==========
        form.append("cus_name", customerDetails.name);
        form.append("cus_email", customerDetails.email);
        form.append("cus_phone", customerDetails.phone);
        form.append("cus_add1", customerDetails.address);
        form.append("cus_city", customerDetails.city);
        //form.append("cus_postcode", customerDetails.zipCode);
        form.append("cus_country", customerDetails.country);

        //shipping details==========
        form.append("shipping_method", "YES");
        form.append("ship_name", shippingDetails.name);
        form.append("ship_add1", shippingDetails.address);
        form.append("ship_area", shippingDetails.address);
        form.append("ship_city", shippingDetails.city);
        form.append("ship_postcode", "7100");
        form.append("ship_country", shippingDetails.country);

        //product details==========
        form.append("product_name", "According to invoice");
        form.append("product_category", "According to invoice");
        form.append("product_profile", "According to invoice");
        form.append("product_amount", "According to invoice");

        //==========Step 9: Initiate payment to SSL payment page==========//
        const SSLResponse = await axios.post(paymentSettings.init_url, form);

        return SSLResponse.data;
      } else {
        throw new Error("Cart is empty");
      }
    } catch (error) {
      throw new Error("Failed to create invoice: " + error.message);
    }
  },

  getInvoiceById: async (invoiceId) => {
    return await invoiceRepository.getInvoiceById(invoiceId);
  },

  getInvoicesByUser: async (userId) => {
    return await invoiceRepository.getInvoicesByUser(userId);
  },

  updateInvoice: async (invoiceId, updateData) => {
    return await invoiceRepository.updateInvoice(invoiceId, updateData);
  },

  deleteInvoice: async (invoiceId) => {
    return await invoiceRepository.deleteInvoice(invoiceId);
  },
};

module.exports = invoiceService;
