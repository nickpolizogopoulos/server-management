
export type TicketStatus = 'open' 
    | 'closed' 
    | 'all';

export type Ticket = {
    id:string;
    title:string;
    request:string;
    status: 'open' | 'closed';
}

export type TicketData = {
    title:string;
    request:string;
}
