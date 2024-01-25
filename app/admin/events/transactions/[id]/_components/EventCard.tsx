import { Event } from "@/app/tihlde/transactions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { convertTransactionStatus } from "@/lib/utils";


interface EventCardProps {
    status: string;
    event: Event;
};

const EventCard = ({ status, event }: EventCardProps) => {
    return (
        <Card className='max-w-lg w-full'>
            <CardHeader>
                <CardTitle>
                    {event.title}
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-2'>
                <img 
                    className='mx-auto rounded-xl'
                    src={event.image ? event.image : '/TihldeBackground.jpg'}
                    alt='Bilde av arrangementet'
                />
                <div className='flex justify-between'>
                    <div>
                        <h1>
                            <span className='font-semibold'>Startdato:</span> {new Date(event.start_date).toLocaleTimeString()} {new Date(event.start_date).toLocaleDateString()}
                        </h1>
                        <h1>
                            <span className='font-semibold'>Sluttdato:</span> {new Date(event.end_date).toLocaleTimeString()} {new Date(event.end_date).toLocaleDateString()}
                        </h1>
                    </div>

                    <h1>
                        <span className='font-semibold'>Status:</span> {convertTransactionStatus(status)}
                    </h1>
                </div>
            </CardContent>
            <CardFooter>
                <Button>
                    <a 
                        target='_blank'
                        href={`https://tihlde.org/arrangementer/${event.id}`}
                    >
                        Gå til arrangement
                    </a>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EventCard;