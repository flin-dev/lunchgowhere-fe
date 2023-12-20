'use client';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PagingRoom, Room, createRoom, getRooms } from "@/lib/roomService"
import { LocalDateTime } from "local-date";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Component() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

    const createRoomHandler = async () => {
        const resp = await createRoom({
            name: "Chatroom 1", description: "Description for Chatroom 1",
            roomOwner: "Creator Name", targetTime: new LocalDateTime().toISOString()
        })
    };

    const turnPageHandler = (action: string) => {
        if (action == "next") {
            setCurrentPage(currentPage + 1);
        } else if (action == "prev") {
            setCurrentPage(currentPage - 1);
        }
    }

    const roomJoinHandler = (roomId: Number) => {
        router.push(`/room/${roomId}`);
    }

    const getRoomsHandler = useEffect(() => {
        const fetchData = async () => {
            //currently didnt use size as table UI component didnt come by default for changing
            //size of the table
            const pagingRoomResp: PagingRoom = await getRooms({ page: currentPage, size: 10 });

            console.log(pagingRoomResp);
            setRooms(pagingRoomResp.content);
            setHasNextPage(pagingRoomResp.last);
            setHasPrevPage(pagingRoomResp.first);
            setTotalPage(pagingRoomResp.totalPages);
        }

        fetchData();
    }, [currentPage]);

    return (
        <main className="p-6 space-y-6">

            <Card className=" w-full mx-auto">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <CardTitle>Lunch GoWHERE</CardTitle>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" onClick={createRoomHandler}>
                            Jio Ppl for lunch
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead>Created By</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead>Target Time</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rooms.map((room, index) => (
                                <TableRow key={room.id}>
                                    <TableCell className="font-medium"><Link href={`/room/${room.id}`}>{room.name} </Link></TableCell>
                                    <TableCell>{room.description}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="border w-6 h-6">
                                                <AvatarImage alt="Creator's Avatar" src="/placeholder-user.jpg" />
                                                <AvatarFallback>CR</AvatarFallback>
                                            </Avatar>
                                            <span>{room.roomOwner}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {
                                            room.isActive
                                                ? <Badge className="bg-green-500 text-white"> OnGoing </Badge>
                                                : <Badge className="bg-red-500 text-white"> Ended </Badge>
                                        }
                                    </TableCell>
                                    <TableCell>{room.targetTime.toLocaleString()}</TableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-center">
                        <Button className="mx-1" size="sm" variant="outline" onClick={() => turnPageHandler("prev")}
                            disabled={hasPrevPage}>
                            Prev
                        </Button>
                        <span>Page {currentPage + 1}/{totalPage}</span>
                        {hasPrevPage}{hasNextPage}
                        <Button className="mx-1" size="sm" variant="outline" onClick={() => turnPageHandler("next")}
                            disabled={hasNextPage}>
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}