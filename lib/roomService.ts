export async function getRoomDetail(data: { roomId: string }) {
    const response = await fetch(`/api/room/${data.roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json();
}

export async function getRooms({ page, size }: { page: number, size: number }) {
    const response = await fetch(`/api/rooms`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json();
}

export async function createRoom(data: { name: string, roomOwner: string, targetTime: string, description: string }) {
    const response = await fetch(`/api/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return await response.json();
}



export interface PagingRoom {
    content:          Room[];
    pageable:         Pageable;
    last:             boolean;
    totalPages:       number;
    totalElements:    number;
    size:             number;
    number:           number;
    sort:             any;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Room {
    createdAt:           Date;
    updatedAt:           Date;
    id:                  number;
    name:                string;
    description:         string;
    targetTime:          Date;
    locationSubmissions: any[];
    isActive:            boolean;
    roomOwner:           null;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       any;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}