import { api } from "@/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useEffect, useState, useRef } from "react";
import { useWatch, type UseFormReturn } from "react-hook-form";
import { useDebounceValue } from "usehooks-ts"

type UseFormDraftProps = {
    form: UseFormReturn
    } & ({
        type: 'REGISTRATION';
        editalId: number;
    } | {
        type: 'REVIEW';
        reviewId: number;
    })

export function useFormDraft(data: UseFormDraftProps) {
    const { data: draft } = useSuspenseQuery({
        queryKey: ['formDraft', data.type],
        queryFn: async () => {
            try {
                if (data.type === 'REGISTRATION') {
                    const response = await getRegistrationDraft(data.editalId);
                    return response.data;
                } else {
                    const response = await getReviewDraft(data.reviewId);
                    return response.data;
                }
            } catch (error) {
               if (isAxiosError(error) && error.response?.status === 404) {
                    return null;
               }
               throw error;
            }  
        },
        refetchInterval: false,
        refetchOnWindowFocus: false,
    })
    const [saveStatus, setSaveStatus] = useState<'synced' | 'saving' | 'dirty'>('synced');
    const formValues = useWatch({ control: data.form.control });

    // debounce the whole formValues object so we only attempt save after user stops changing fields
    const [debouncedValue, setValue] = useDebounceValue(formValues, 3000);
    const mounted = useRef(false);

    useEffect(() => {
        if (draft && draft.content) {
            console.log("Loading draft content into form:", draft.content);
            data.form.reset(draft.content);
        }
    }, [draft]);

    useEffect(() => {
        setSaveStatus('dirty');
        setValue(formValues);
    }, [formValues, setValue]);

    useEffect(() => {
        // skip saving on first mount (e.g. after loading draft/reset)
        if (!mounted.current) {
            mounted.current = true;
            return;
        }

        // nothing to save
        if (debouncedValue == null) return;

        console.log("Auto-saving form draft:", debouncedValue);
        (async () => {
            setSaveStatus('saving');
            try {
                if (data.type === 'REGISTRATION') {
                    await updateRegistrationDraft(data.editalId, debouncedValue);
                } else {
                    await updateReviewDraft(data.reviewId, debouncedValue);
                }
                setSaveStatus('synced');
            } catch (error) {
                console.error('Error saving form draft:', error);
                setSaveStatus('dirty');
            }
        })();
    }, [debouncedValue]);
    

   return { saveStatus };
}


function getRegistrationDraft(editalId: number) {
    return api.get(`/form-drafts/registrations/${editalId}`);
}

function getReviewDraft(reviewId: number) {
    return api.get(`/form-drafts/reviews/${reviewId}`);
}

function updateRegistrationDraft(editalId: number, content: any) {
    return api.put(`/form-drafts/registrations/${editalId}`, { content });
}

function updateReviewDraft(reviewId: number, content: any) {
    return api.put(`/form-drafts/reviews/${reviewId}`, { content });
}