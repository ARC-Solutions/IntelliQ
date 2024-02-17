import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface DialogContentsProps {
    rejectAllCookies: () => void;
    acceptAllCookies: () => void;
    removeComponent: () => void;
}

interface DialogFooterProps {
    removeComponent: () => void;
}

const DialogContents = ({
    rejectAllCookies,
    acceptAllCookies,
    removeComponent,
}: DialogContentsProps) => {
    return (
        <>
            <div className='flex flex-col overflow-auto'>
                <DialogHeader className='space-y-4'>
                    <DialogTitle className='text-left text-2xl'>Cookie Settings</DialogTitle>
                    <hr className='my-4' />
                    <DialogDescription className='text-left'>
                        IntelliQ uses cookies to offer you a better experience. See Cookie Policy
                        for more details.
                    </DialogDescription>
                    <div className='flex gap-3'>
                        <DialogClose asChild>
                            <Button
                                variant='outline'
                                className='h-14 w-40 text-left text-base'
                                onClick={() => {
                                    rejectAllCookies();
                                    removeComponent();
                                }}
                            >
                                Reject all cookies
                            </Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button
                                className='h-14 w-40 break-normal text-left text-base'
                                onClick={() => {
                                    acceptAllCookies();
                                    removeComponent();
                                }}
                            >
                                Allow all cookies
                            </Button>
                        </DialogClose>
                    </div>
                </DialogHeader>
            </div>
        </>
    );
};

const ContentsFooter = ({ removeComponent }: DialogFooterProps) => {
    return (
        <>
            <DialogFooter className='mt-4 flex justify-end space-x-2'>
                <DialogClose asChild>
                    <Button
                        className='h-10 w-20 text-base'
                        type='submit'
                        onClick={() => removeComponent()}
                    >
                        Save
                    </Button>
                </DialogClose>
            </DialogFooter>
        </>
    );
};

export { DialogContents, ContentsFooter };
