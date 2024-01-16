import { getMyNotifications } from "@/app/db/notification";
import NotificationItem from "./Notification";
import Empty from "@/app/admin/_components/Empty";


const NotificationsPage = async () => {
    const notifications = await getMyNotifications();

    return (
        <div className='max-w-6xl w-full py-12 mx-auto px-32 min-h-screen'>
            <div className='space-y-4 pb-20'>
                <h1 className='text-4xl font-bold'>
                    Mine varsler
                </h1>
                <p className='max-w-xl w-full'>
                    Her finner du en oversikt over dine varsler fra TIHLDE Marketplace.
                </p>
            </div>

            {notifications.length === 0 && (
              <Empty text='Du har ingen meldinger' />            
            )}

            <div className='w-full space-y-4'>
                {notifications.map((notification, index) => (
                    <NotificationItem key={index} notification={notification} />
                ))}
            </div>
        </div>
    );
};


export default NotificationsPage;