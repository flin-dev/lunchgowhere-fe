export async function getRoomDetail(data: { roomId: string }) {
    const response = await fetch(`/api/room/${data.roomId}`, {
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