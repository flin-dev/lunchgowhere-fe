export async function getRoomDetail(data: { roomId: string }) {
    const response = await fetch(`/api/room/${data.roomId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })
    return await response.json();
}