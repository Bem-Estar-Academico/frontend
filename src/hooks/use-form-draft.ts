import { useEffect, useState } from "react";
import { useWatch, type Control, type UseFormReturn } from "react-hook-form";
import { useDebounceCallback } from 'usehooks-ts'

type UseFormDraftProps = {
    form: UseFormReturn
    type: 'REGISTRATION' | 'REVIEW';
}

export function useFormDraft({ form, type }: UseFormDraftProps) {
    const [saveStatus, setSaveStatus] = useState<'synced' | 'saving' | 'dirty'>('synced');
    const formValues = useWatch({ control: form.control });

    const debouncedSaveFormValues = useDebounceCallback((values: any) => {
        setSaveStatus('saving');
        setTimeout(() => {
        const {files: _files, ...valuesToSave} = values;
        localStorage.setItem('formValuesSnapshot', JSON.stringify(valuesToSave));
        setSaveStatus('synced');
        }, 2000);
    }, 1000);

    useEffect(() => {
        const storedValues = localStorage.getItem('formValuesSnapshot');
        if (storedValues) {
            const parsedValues = JSON.parse(storedValues);
            form.reset(parsedValues);
        }
    }, []);

    useEffect(() => {
        setSaveStatus('dirty');
        debouncedSaveFormValues(formValues);
    }, [formValues]);
    

   return { saveStatus };
}