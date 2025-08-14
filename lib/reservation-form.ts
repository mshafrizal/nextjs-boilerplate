// For handling reservation form only!
import { create } from 'zustand';
import { FormikErrors, FormikProps } from 'formik';

export interface ReservationFormData {
    // Required fields
    country_id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city_id: string;
    province_id: string;
    city_name: string;
    state: string;
    postal_code: string;
    consent: boolean;

    // Optional fields
    company?: string;
    purpose_of_stay?: string;
    special_request?: string;
}

export interface FormikInstanceMap {
    [key: string]: FormikProps<any>;
}

export interface ValidationResult {
    formId: string;
    errors: FormikErrors<any>;
    formik: FormikProps<any> | null;
}

export interface SubmissionResult {
    success: boolean;
    data?: ReservationFormData;
    errors?: ValidationResult[];
}

interface ReservationStore {
    formInstances: FormikInstanceMap;
    setFormInstance: (formId: string, instance: FormikProps<any>) => void;
    removeFormInstance: (formId: string) => void;
    submitAllForms: () => Promise<SubmissionResult>;
}

export const useReservationStore = create<ReservationStore>((set, get) => ({
    formInstances: {},

    setFormInstance: (formId: string, instance: FormikProps<any>) =>
        set((state) => ({
            formInstances: { ...state.formInstances, [formId]: instance },
        })),

    removeFormInstance: (formId: string) =>
        set((state) => {
            const { [formId]: removed, ...rest } = state.formInstances;
            return { formInstances: rest };
        }),

    submitAllForms: async (): Promise<SubmissionResult> => {
        const { formInstances } = get();
        const formIds = Object.keys(formInstances);

        // Validate all forms first
        const validationResults: ValidationResult[] = await Promise.all(
            formIds.map(async (formId): Promise<ValidationResult> => {
                const formik = formInstances[formId];
                if (formik) {
                    const errors = await formik.validateForm();
                    // Mark all fields as touched to show validation errors
                    const touchedFields = Object.keys(
                        formik.initialValues
                    ).reduce(
                        (acc, key) => {
                            acc[key] = true;
                            return acc;
                        },
                        {} as Record<string, boolean>
                    );
                    await formik.setTouched(touchedFields);
                    return { formId, errors, formik };
                }
                return { formId, errors: {}, formik: null };
            })
        );

        // Check if any form has errors
        const hasErrors = validationResults.some(
            (result) => Object.keys(result.errors).length > 0
        );

        if (!hasErrors) {
            // Combine all form values
            const allValues = formIds.reduce((acc, formId) => {
                const formik = formInstances[formId];
                if (formik) {
                    return { ...acc, ...formik.values };
                }
                return acc;
            }, {} as ReservationFormData);

            // Submit combined data
            console.log('All forms valid, submitting:', allValues);
            // Handle your submission logic here
            return { success: true, data: allValues };
        } else {
            console.log('Some forms have validation errors');
            return { success: false, errors: validationResults };
        }
    },
}));
