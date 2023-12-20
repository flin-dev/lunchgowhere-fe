export async function getRoomDetail(data: { roomId: string }) {
    const response = fetch(`/api/room/${data.roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return response;
}

export async function getRooms({ page, size }: { page: number, size: number }) {
    const response = fetch(`/api/rooms`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return response
}

export async function createRoom(data: { name: string, roomOwner: string, targetTime: string, description: string }) {
    const response = fetch(`/api/room`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    return response;
}

export async function getLocationSubmissions(data: { roomId: string }) {
    const response = fetch(`/api/room/${data.roomId}/locationSubmissions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return response;
}

export async function createLocationSubmission(data: LocationSubmission, roomId: string) {
    try {
        const response = await fetch(`/api/room/${roomId}/locationSubmission`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response;
    } catch (error) {
        throw error;
    }
}



export interface PagingRoom {
    content: Room[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: any;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
}

export interface Room {
    createdAt: Date;
    updatedAt: Date;
    id: number;
    name: string;
    description: string;
    targetTime: Date;
    locationSubmissions: LocationSubmission[];
    isActive: boolean;
    roomOwner: User;
}

export interface User {
    id: number;
    username: string;
}

export interface LocationSubmission {
    id?: number;
    name: string;
    description: string;
    reason: string;
    submittedBy?: User;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: any;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}