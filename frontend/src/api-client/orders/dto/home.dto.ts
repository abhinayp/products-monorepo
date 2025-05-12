export interface CreateOrderDTO {
  request: {
    order: {
      order_payment: {
        card_number: string;
        card_cvv: string;
        card_expiration_date: string;
        card_holder_name: string;
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
      order_shipping: {
        street: string;
        city: string;
        state: string;
        zip: string;
        country: string;
      };
      order_contact: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
      };
    }
  }
  response: {
    order: {
      id: number;
      total_price: number;
      status: string;
    };
  }
}
