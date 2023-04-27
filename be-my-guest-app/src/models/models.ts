export interface Event {
    id: string;
    title: string;
    description: string;
    when: string;
    where: Where;
    maxParticipants: number;
    hostId: string;
    guests?: (null)[] | null;
    status: string;
    createdAt: string;
    updatedAt?: null;
}
export interface Where {
    qualifier: string;
    address: string;
    number: string;
    city: string;
    cap: string;
    province: string;
    country: string;
    coordinates: Coordinates;
}
export interface Coordinates {
    latitude: number;
    longitude: number;
}

export interface EventRendered extends Event {event: Event, title: string, formattedDateTime: string, location: string, distance: string, userAvatarUrl: string};
