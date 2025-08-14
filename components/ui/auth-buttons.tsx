import SignInButton from '@/components/ui/sign-in-button';
import SignUpButton from '@/components/ui/sign-up-button';
import ProfileMenu from './profile-menu';
import NotificationButton from '@/components/ui/notification-button';

export default function AuthButtons({
    isAuthenticated,
    at,
}: Readonly<{ isAuthenticated: boolean; at?: string }>) {
    return (
        <div className="flex gap-3">
            {!isAuthenticated ? (
                <>
                    <SignInButton />
                    <SignUpButton />
                </>
            ) : (
                <>
                    <NotificationButton />
                    <ProfileMenu at={at} />
                </>
            )}
        </div>
    );
}
