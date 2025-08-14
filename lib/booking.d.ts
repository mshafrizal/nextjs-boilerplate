export interface BookingDetail {
    adult: number;
    booking_date: string;
    booking_details: BookingDetail[];
    booking_guests: BookingGuest[];
    booking_number: string;
    booking_status: keyof typeof BookingStatus;
    cancellation_date: any;
    cancellation_fee_amount: string | null;
    cancellation_reason: any;
    cancellation_status: any;
    checkin_date: string;
    checkout_date: string;
    child: number;
    created_at: string;
    enable_change_payment: boolean;
    hms_logs: any[];
    id: string;
    infant: number;
    member: Member;
    member_id: string;
    order_setting: OrderSetting;
    payment: any;
    payment_id: any;
    point_redeem: any;
    preferences: any[];
    profile_property: any;
    property: Property;
    property_id: string;
    rate_plan_policy: RatePlanPolicy2;
    rate_plan_policy_detail: RatePlanPolicyDetail;
    rescheduled_booking_id: any;
    room_number: number | null;
    special_request: string;
    total_night: number;
    total_price: string;
    updated_at: string;
}
export interface CreateBookingResponse {
    adult: number;
    booking_date: string;
    booking_details: BookingDetail[];
    booking_guests: BookingGuest[];
    booking_number: string;
    booking_status: keyof typeof BookingStatus;
    cancellation_date: any;
    cancellation_fee_amount: string | null;
    cancellation_reason: any;
    cancellation_status: any;
    channel_queue_type: string;
    channel_status: string;
    checkin_date: string;
    checkout_date: string;
    child: number;
    confirmation_number: any;
    created_at: string;
    created_by: any;
    deleted_at: any;
    deleted_by: any;
    force_approved_date: any;
    id: string;
    infant: number;
    is_channel_queue: boolean;
    is_free_cancellation: boolean;
    is_pre_check_in_email_sent: boolean;
    member_id: string;
    modification_date: any;
    payment_id: any;
    point_redeem: any;
    preferences: any[];
    property_id: string;
    rate_plan_policy_detail: RatePlanPolicyDetail;
    request_notes: any;
    reservation_hms_id: any;
    rescheduled_booking_id: any;
    room_number: number | null;
    source_of_booking: 'WEB' | 'APP';
    special_request: string;
    total_night: number;
    total_price: number;
    updated_at: string;
    updated_by: any;
}

export interface BookingGuest {
    room: number;
    occupancies: Occupancy[];
}

export interface Occupancy {
    first_name: string;
    is_primary: boolean;
    last_name: string;
    order: number;
    type: string;
}

export interface BookingDetail {
    booking_id: number;
    conversion_value: any;
    created_at: string;
    created_by: any;
    currency: string;
    date: string;
    deleted_at: any;
    deleted_by: any;
    dynamic_price_id: any;
    extra_id: any;
    id: string;
    price: any;
    price_idr: any;
    qty: number;
    rate_plan_policy_id: string;
    room_id: string;
    subtotal_price: any;
    total_night: number;
    type: string;
    updated_at: string;
    updated_by: any;
}

export interface RatePlanPolicyDetail {
    amend_policy_days: number;
    amend_policy_type: string;
    board: Board;
    board_id: string;
    booking_date_end: string;
    booking_date_start: string;
    cancellation_fee: string;
    cancellation_fee_amount: any;
    cancellation_fee_currency: any;
    cancellation_fee_nights: number;
    cancellation_fee_percentage: string;
    cancellation_policy_id: any;
    created_at: string;
    created_by: string;
    currency: string;
    deleted_at: any;
    deleted_by: any;
    display_until: string;
    dynamic_price_ids: string[];
    early_booking_limit: any;
    free_cancellation_days: number;
    free_cancellation_type: string;
    id: string;
    is_active: boolean;
    is_parent: boolean;
    is_private: boolean;
    market: string;
    member_cancellation_policy_id: any;
    member_payment_policy_id: any;
    min_stay_override: any;
    note_en: string;
    note_id: string;
    other_currency: string;
    parent_id: any;
    payment_policy_id: any;
    property_id: string;
    rate_name: string;
    rate_pms_code: string;
    room: Room;
    room_id: string;
    updated_at: string;
    updated_by: string;
}

export interface Room {
    availability_date_from: string;
    availability_date_to: string;
    created_at: string;
    created_by: any;
    deleted_at: any;
    deleted_by: any;
    id: string;
    is_active: boolean;
    is_allow_children: boolean;
    is_count_infant: boolean;
    is_disable_da: boolean;
    max_adult: number;
    max_infant: number;
    max_pax: number;
    min_pax: number;
    occupancies: Occupancy2[];
    property_id: string;
    room_description: any;
    room_description_en: string;
    room_description_id: string;
    room_image: string;
    room_order: number;
    room_size: string;
    room_type_code: string;
    room_type_name: string;
    room_type_pms_code: string;
    room_unit: string;
    updated_at: string;
    updated_by: any;
}

export interface Occupancy2 {
    adult: number;
    children: number;
}

export interface Board {
    board_name: string;
    created_at: string;
    id: string;
    updated_at: string;
}

export interface Preference {
    is_required: boolean;
    question_description: string;
    question_label: string;
    question_options?: string[];
    question_order: number;
    question_type: 'textarea' | 'radio' | 'input';
}

enum BookingStatus {
    UNPAID,
    PAID,
    CANCELLED,
    FAILED,
    EXPIRED,
}

export interface BookingHistory {
    id: string;
    booking_number: string;
    property_id: string;
    checkin_date: string;
    checkout_date: string;
    total_price: string;
    booking_status: 'UNPAID' | 'PAID' | 'CANCELLED' | 'FAILED' | 'EXPIRED';
    cancellation_status: any;
    total_night: number;
    property_name: string;
    rate_name: string;
    room_name: string;
    booking_date: string;
    cancellation_date: any;
    member_id: string;
    room_qty: number;
    payment_method: string;
}
