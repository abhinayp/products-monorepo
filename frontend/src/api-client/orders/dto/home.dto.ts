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

export interface ShowOrderDTO {
  request: {
    id: number;
  }
  response: {
    order: {
      id: number;
      total_price: number;
      tax: number;
      gross_total_price: number;
      status: string;
    };
    order_items: {
      id: number;
      title: string;
      unit_price: number;
      quantity: number;
      image_url: string;
      product_id: number;
    }[];
    order_shipping: {
      id: number;
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
      carrier: string;
      tracking_number: string;
      status: string;
    };
    order_contact: {
      id: number;
      name: string;
      email: string;
      phone: string;
    };
    order_payment: {
      id: number;
      description: string;
      payment_id: string;
      street: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    }
  }
}

export interface OrdersDTO {
  request: {
    page?: number;
    offset?: number;
  }
  response: {
    id: number;
    total_price: number;
    tax: number;
    gross_total_price: number;
    status: string;
    order_items: {
      id: number;
      title: string;
      unit_price: number;
      quantity: number;
      image_url: string;
      product_id: number;
    }[];
    created_at: string;
  }[];
}
