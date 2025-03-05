export type Content = {
    response_output: {
        detail: {
            body_id: string;
            body_en: string;
        }
        is_active: boolean;
        updated_at: string;
    };
    response_schema: {
        response_code: string;
        response_message: string;
    }
}