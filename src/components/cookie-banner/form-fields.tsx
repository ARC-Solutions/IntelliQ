import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { UseFormReturn } from 'react-hook-form';
import {type FormData} from './cookie';

interface FormFieldsProps {
    form: UseFormReturn<FormData>;
}

const FormFields = ({ form }: FormFieldsProps) => {
    return(
        <div className='flex-grow space-y-4'>
            <h3 className='text-lg font-medium'>Manage Preferences</h3>
            <div className='mt-4'>
                <FormField
                    control={form.control}
                    name='essential'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between'>
                            <div className='space-y-0.5'>
                                <FormLabel className='text-base font-semibold'>
                                    Essential
                                </FormLabel>
                                <FormDescription className='text-sm'>
                                    Essential for the site to function.
                                    Always On.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    disabled
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <hr className='my-4' />
                <FormField
                    control={form.control}
                    name='marketing'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between'>
                            <div className='space-y-0.5'>
                                <FormLabel className='text-base font-semibold'>
                                    Marketing
                                </FormLabel>
                                <FormDescription className='text-sm'>
                                    Used for targeted advertising.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <hr className='my-4' />
                <FormField
                    control={form.control}
                    name='analytics'
                    render={({ field }) => (
                        <FormItem className='flex flex-row items-center justify-between'>
                            <div className='space-y-0.5'>
                                <FormLabel className='text-base font-semibold'>
                                    Analytics
                                </FormLabel>
                                <FormDescription className='text-sm'>
                                    Used to measure usage and improve
                                    your experience.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default FormFields;
