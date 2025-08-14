import { CURRENCY_CONFIG } from '@/lib/utils';

/**
 * Generic API response interface
 * Can be used with DetailResponse or ListResponse for type-safe responses
 * Examples:
 * - APIResponse<DetailResponse<User>> for a single user response
 * - APIResponse<ListResponse<User>> for a list of users response
 */
export interface APIResponse<T> {
    response_schema: ResponseSchema;
    response_output: T;
}

export interface ResponseSchema {
    response_code: string;
    response_message: ResponseMessage;
}

export interface ResponseMessage {
    id: string;
    en: string;
}

/**
 * Type-safe response interfaces for use with APIResponse
 *
 * DetailResponse wraps a single item of type T
 * Example: DetailResponse<User> for a single user
 */
export interface DetailResponse<T> {
    detail: T;
}

/**
 * ListResponse wraps an array of items of type T
 * Example: ListResponse<User> for a list of users
 */
export interface ListResponse<T> {
    list: T[];
}
export interface PaginatedResponse<T> {
    list: {
        content: T[];
        pagination: Pagination;
    };
}

export interface Country {
    id: string;
    country_code: string;
    country_dial_code: string;
    country_name: string;
    created_at: string;
    updated_at: string;
}

export interface Province {
    id: string;
    province_name: string;
    created_at: string;
    updated_at: string;
    country: Country;
}

export interface City {
    id: string;
    city_name: string;
    created_at: string;
    updated_at: string;
    province: City;
}

export interface Pagination {
    page: number;
    total: number;
    size: number;
    rows_per_page: number;
    actual_total?: number;
}

export interface ErrorResponse {
    errors: Error[] | null;
}

export interface Error {
    field: string;
    message: Message;
}

export interface Message {
    id: string;
    en: string;
}

export interface SignInDataResponse {
    id: string;
    member_id: string;
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    identity_number: string;
    phone: string;
    birth_date: string;
    country_id: string;
    phone_country_id: string;
    province_id: string;
    city_id: string;
    state: string;
    city_name: string;
    postal_code: string;
    last_visited_id: string;
    is_active: boolean;
    is_verified: boolean;
    login_attempt: number;
    blocked_time: string;
    address: string;
    join_date: string;
    level_id: string;
    point: number;
    spend_nights: number;
    inactive_date: string;
    default_lang: string;
    is_send_notification: boolean;
    member_pin: MemberPin;
    session_id: string;
    permissions: string[];
    access_token: string;
    refresh_token: string;
    is_pin_exist: boolean;
}
export interface MemberPin {
    id: string;
    pin: string;
}

export interface Property {
    id: string;
    property_name: string;
    property_code: string;
    permissions: string[];
    property_pms_code: string;
    property_order: number;
    property_image_thumbnail: string;
    property_image_logo: string;
    property_check_in_time: string;
    property_check_out_time: string;
    property_booking_confirmation_recipients: string[];
    property_ecommerce_recipients: string[];
    property_rating: number;
    property_description_id: string;
    property_description_en: string;
    property_country_id: string;
    property_city_id: string | null;
    property_location: string;
    property_address: string;
    property_email: string;
    property_website: string;
    property_map_url: string;
    property_timezone: PropertyTimezone;
    property_postal_code: string;
    property_country_phone_id: string;
    property_phone: string;
    property_country_whatsapp_id: string;
    property_whatsapp: string;
    property_country_fax_id: string;
    property_fax: string;
    property_facebook: string;
    property_instagram: string;
    property_twitter: string;
    property_youtube: string;
    is_active: boolean;
    idr_threshold: number;
    usd_threshold: number;
    property_maximum_los: number;
    created_at: string;
    updated_at: string;
    property_country_phone: Country;
    property_country: Country;
    property_city: unknown;
    property_country_whatsapp: Country;
    property_country_fax: Country;
    property_channel: PropertyChannel;
}

export interface PropertyTimezone {
    label: string;
    offset: number;
}

export interface PropertyChannel {
    id: string;
    property_id: string;
    channel_id: string;
    service_code: string;
    key: string;
    va_partner_id: unknown;
    va_channel_id: unknown;
    va_service_id: unknown;
    created_at: string;
    updated_at: string;
}

export interface RegisterPayload {
    first_name: string;
    last_name: string;
    password: string;
    email: string;
    phone: string;
    birth_date: string;
    address: string;
    postal_code: string;
    last_visited_id: string;
    phone_country_id: string;
    country_id: string;
    province_id: string;
    city_id: string;
    state: string;
    city_name: string;
    unique_device_identifier: string;
    source_of_register: string;
}

export interface SetPinResponse {
    id: string;
    pin: string;
    member_id: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    member: Member;
}
export interface Member {
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    identity_number: string;
    email: string;
    phone: string;
    birth_date: string;
    join_date: string;
    country_id: string;
    address: string;
    province_id: string;
    city_id: string;
    state: string | null;
    city_name: string | null;
    postal_code: string;
    password: string;
    last_visited_id: number;
    is_verified: boolean;
    is_active: boolean;
    profile_id: any;
    login_attempt: number;
    blocked_time: any;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    created_by: string;
    updated_by: string;
    deleted_by: string;
    level: any;
    point: number;
    spend_nights: number;
    inactive_date: any;
}

export interface SettingContent {
    id: string;
    type: string;
    content_id: string;
    content_en: string;
    created_at: string;
    updated_at: string;
    deleted_at: any;
    created_by: string;
    updated_by: string;
    deleted_by: any;
}

export interface ActionResponse<T> {
    message: string;
    status: number;
    result: T;
}

export type CurrencyCode = keyof typeof CURRENCY_CONFIG;
