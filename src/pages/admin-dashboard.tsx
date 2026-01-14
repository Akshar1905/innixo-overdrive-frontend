
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Registration, eventsConfig } from "@shared/schema";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Eye } from "lucide-react";
import { RegistrationDetailsModal } from "@/components/admin/registration-details-modal";

export default function AdminDashboard() {
    const [, setLocation] = useLocation();
    const [search, setSearch] = useState("");
    const [filterEvent, setFilterEvent] = useState("ALL");
    const [secret, setSecret] = useState("");
    const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);

    useEffect(() => {
        const s = localStorage.getItem("admin-secret");
        if (!s) {
            setLocation("/admin");
        } else {
            setSecret(s);
        }
    }, [setLocation]);

    const { data: registrations, isLoading, isError } = useQuery<Registration[]>({
        queryKey: ["/api/admin/registrations"],
        queryFn: async () => {
            const res = await fetch("/api/admin/registrations", {
                headers: { "x-admin-secret": secret }
            });
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        },
        enabled: !!secret
    });

    const handleExport = async () => {
        try {
            const res = await fetch("/api/admin/export", {
                headers: { "x-admin-secret": secret }
            });
            if (!res.ok) throw new Error("Failed to export");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "registrations.csv";
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (e) {
            console.error(e);
            alert("Export failed");
        }
    };

    const filteredRegistrations = registrations?.filter(reg => {
        const matchesSearch =
            reg.fullName.toLowerCase().includes(search.toLowerCase()) ||
            reg.email.toLowerCase().includes(search.toLowerCase()) ||
            reg.id.toLowerCase().includes(search.toLowerCase());

        const matchesEvent = filterEvent === "ALL" || reg.eventName === filterEvent;

        return matchesSearch && matchesEvent;
    }) || [];

    if (isLoading) return <div className="text-white text-center pt-20">Loading...</div>;
    if (isError) return <div className="text-red-500 text-center pt-20">Access Denied or Error</div>;

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto bg-black text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                <Button onClick={handleExport} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                    <Download className="mr-2 h-4 w-4" /> Export CSV
                </Button>
            </div>

            <Card className="bg-black/50 border-primary/20 mb-8">
                <CardContent className="p-4 flex gap-4 flex-col md:flex-row">
                    <Input
                        placeholder="Search by Name, Email, ID..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="md:w-1/3 border-primary/20 text-white"
                    />
                    <Select value={filterEvent} onValueChange={setFilterEvent}>
                        <SelectTrigger className="w-[200px] border-primary/20 text-white">
                            <SelectValue placeholder="Filter by Event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All Events</SelectItem>
                            {Object.keys(eventsConfig).map(evt => (
                                <SelectItem key={evt} value={evt}>{evt}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <div className="ml-auto text-muted-foreground flex items-center">
                        count: {filteredRegistrations.length}
                    </div>
                </CardContent>
            </Card>

            <div className="rounded-md border border-primary/20 overflow-hidden">
                <Table>
                    <TableHeader className="bg-primary/10">
                        <TableRow>
                            <TableHead className="text-primary">ID</TableHead>
                            <TableHead className="text-primary">Name</TableHead>
                            <TableHead className="text-primary">Email</TableHead>
                            <TableHead className="text-primary">Event</TableHead>
                            <TableHead className="text-primary">Team</TableHead>
                            <TableHead className="text-primary">Status</TableHead>
                            <TableHead className="text-primary">Payment</TableHead>
                            <TableHead className="text-primary text-right">Date</TableHead>
                            <TableHead className="text-primary text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredRegistrations.map((reg) => (
                            <TableRow key={reg.id} className="hover:bg-white/5 border-white/10">
                                <TableCell className="font-mono text-xs">{reg.id.split('-')[0]}...</TableCell>
                                <TableCell>{reg.fullName}</TableCell>
                                <TableCell>{reg.email}</TableCell>
                                <TableCell>{reg.eventName}</TableCell>
                                <TableCell>{reg.teamName || "-"}</TableCell>
                                <TableCell>{reg.status}</TableCell>
                                <TableCell>
                                    <span className={`px-2 py-1 rounded text-xs ${reg.paymentStatus === 'PAID' ? 'bg-green-500/20 text-green-400' :
                                        reg.paymentStatus === 'FAILED' ? 'bg-red-500/20 text-red-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                        {reg.paymentStatus}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right text-muted-foreground text-xs">
                                    {new Date(reg.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-center">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setSelectedRegistration(reg)}
                                        className="hover:text-primary hover:bg-primary/10"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <RegistrationDetailsModal
                isOpen={!!selectedRegistration}
                onClose={() => setSelectedRegistration(null)}
                registration={selectedRegistration}
            />
        </div>
    );
}
