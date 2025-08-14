/**
 * Represents a room with its details and rate plan policies
 */
export interface RoomRate {
    id: string;
    room_image: string;
    /** Name of the room type */
    room_type_name: string;
    /** Size of the room (e.g., "30 sqm") */
    room_size: string;
    /** Maximum number of guests allowed */
    max_pax: number;
    /** Order/priority of the room in listings */
    room_order: number;
    /** Number of available rooms */
    availability: number;
    /** List of rate plan policies associated with this room */
    rate_plan_policies: RatePlanPolicy[];
}

/**
 * Represents a rate plan policy with pricing and availability details
 */
export interface RatePlanPolicy {
    /** Unique identifier for the rate plan policy */
    rate_plan_policy_id: string;
    /** Name of the rate plan */
    rate_name: string;
    /** Type of board included (e.g., "Breakfast Included") */
    board_name: string;
    /** List of dynamic price identifiers */
    dynamic_price_ids: string[];
    /** Number of nights included in this rate plan */
    nights: number;
    /** Whether this rate plan is available */
    is_available: boolean;
    /** Additional message or information about the rate plan */
    message: string;
    /** Maximum allowed stay duration in nights */
    max_stay: number;
    /** Minimum required stay duration in nights */
    min_stay: number;
    /** Number of available rooms with this rate plan */
    availability: number;
    /** Whether this is a special offer */
    is_special_offer: boolean;
    /** Whether this is a package deal */
    is_package_deal: boolean;
    /** Start date of the rate plan availability (ISO format) */
    date_from: string;
    /** End date of the rate plan availability (ISO format) */
    date_to: string;
    /** Number of rooms included in this rate plan */
    number_of_rooms: string;
    /** Prices in different currencies */
    conversion_prices: ConversionPrices;
    /** Detailed pricing for each day of the stay */
    detail_price_per_days: DetailPricePerDay[];
    /** Cancellation fee description */
    cancellation_fee: string;
    /** Number of nights charged as cancellation fee */
    cancellation_fee_nights: number;
    /** Percentage charged as cancellation fee */
    cancellation_fee_percentage: string;
    /** Currency for cancellation fee */
    cancellation_fee_currency: null | string;
    /** Fixed amount charged as cancellation fee */
    cancellation_fee_amount: null | number;
    /** Type of free cancellation policy */
    free_cancellation_type: string;
    /** Type of amendment policy */
    amend_policy_type: string;
}

/**
 * Represents prices in different currencies
 */
export interface ConversionPrices {
    IDR: ConversionPrice;
    USD: ConversionPrice;
    AUD: ConversionPrice;
    JPY: ConversionPrice;
    EUR: ConversionPrice;
    KRW: ConversionPrice;
    GBP: ConversionPrice;
    [currencyCode: string]: ConversionPrice;
}

/**
 * Represents price details in a specific currency
 */
export interface ConversionPrice {
    /** Base price before any discounts */
    base_price: number;
    /** Actual price after discounts */
    actual_price: number;
    /** Required deposit amount */
    deposit_fee: number;
    /** Tax amount */
    price_tax: number;
    /** Price without tax */
    price_without_tax: number;
}

/**
 * Represents detailed pricing for a specific day
 */
export interface DetailPricePerDay {
    /** Identifier for the dynamic price, or null if not applicable */
    dynamic_price_id: string | null;
    /** Identifier for the room */
    room_id: string;
    /** Identifier for the rate plan policy */
    rate_plan_policy_id: string;
    /** The date for this price (ISO format) */
    date: string;
    /** Currency code */
    currency: string;
    /** Price in the specified currency */
    price: number;
    /** Price in Indonesian Rupiah */
    price_idr: number;
    /** Conversion rate value */
    conversion_value: number;
    /** Quantity (usually number of rooms) */
    qty: number;
    /** Subtotal price (price × qty) */
    subtotal_price: number;
}

// Used to fetch the lowest price of rooms to be displayed in calendar
// GET /v1/app/lowest-price/guest
// GET /v1/app/lowest-price
export interface GetLowestPricePayload {
    property_id: string;
    date: string; // yyyy-MM-dd
    qty: string;
    adult: string;
    children: string;
}
