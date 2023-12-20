'use client';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { PagingRoom, Room, getRooms } from "@/lib/roomService"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreateRoomDialog } from "@/components/CreateRoomDialog/CreateRoomDialog";

export default function Component() {
    const router = useRouter();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [hasPrevPage, setHasPrevPage] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0);

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

    const fetchData = async () => {
        //currently didnt use size as table UI component didnt come by default for changing
        //size of the table
        const response: Response = await getRooms({ page: currentPage, size: 10 });
        const pagingRoomResp: PagingRoom = await response.json() as PagingRoom;

        setRooms(pagingRoomResp.content);
        setHasNextPage(pagingRoomResp.last);
        setHasPrevPage(pagingRoomResp.first);
        setTotalPage(pagingRoomResp.totalPages);
    }

    const getRoomsHandler = useEffect(() => {
        fetchData();
    }, [currentPage]);

    const refreshHandler = () => {
        fetchData();
    }

    return (
        <main className="p-6 space-y-6">

            <Card className=" w-full mx-auto">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <CardTitle>Lunch GoWHERE</CardTitle>
                    </div>
                    <div className="flex items-center gap-4">
                        <CreateRoomDialog refresh={refreshHandler} />
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
                                                <AvatarFallback>U</AvatarFallback>
                                            </Avatar>
                                            <span>{room.roomOwner.username}</span>
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