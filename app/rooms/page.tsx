'use client';
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { createRoom } from "@/lib/roomService"
import { LocalDateTime } from "local-date";

export default function Component() {

    const createRoomHandler = async () => {
        const resp = await createRoom({
            name: "Chatroom 1", description: "Description for Chatroom 1",
            roomOwner: "Creator Name", targetTime: new LocalDateTime().toISOString()
        })
    };

    return (
        <main className="p-6 space-y-6">

            <Card className=" w-full mx-auto">
                <CardHeader className="flex flex-row justify-between items-center">
                    <div className="flex items-center">
                        <CardTitle>Chatroom Records</CardTitle>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button size="sm" onClick={createRoomHandler}>
                            Create Gathering Room
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
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">Chatroom 1</TableCell>
                                <TableCell>Description for Chatroom 1</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="border w-6 h-6">
                                            <AvatarImage alt="Creator's Avatar" src="/placeholder-user.jpg" />
                                            <AvatarFallback>CR</AvatarFallback>
                                        </Avatar>
                                        <span>Creator Name</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge className="bg-green-500 text-white">Active</Badge>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="flex items-center justify-center">
                        <Button className="mx-1" size="sm" variant="outline">
                            Prev
                        </Button>
                        <span>Page 1/10</span>
                        <Button className="mx-1" size="sm" variant="outline">
                            Next
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </main>
    )
}