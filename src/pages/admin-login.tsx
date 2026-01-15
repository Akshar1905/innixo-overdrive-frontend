
import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
    const [secret, setSecret] = useState("");
    const [, setLocation] = useLocation();
    const { toast } = useToast();

    const handleLogin = () => {
        if (!secret) return;
        // Simple check - in real app query the API to verify
        // Here we just save and redirect, middleware will catch invalid ones
        localStorage.setItem("admin-secret", secret);

        // Test the secret by hitting the API
        const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
        fetch(`${baseUrl}/api/admin/registrations`, {
            headers: { "x-admin-secret": secret }
        }).then(res => {
            if (res.ok) {
                setLocation("/admin/dashboard");
            } else {
                toast({
                    title: "Access Denied",
                    description: "Invalid Admin Secret",
                    variant: "destructive"
                });
            }
        }).catch(() => {
            toast({
                title: "Error",
                description: "Server error",
                variant: "destructive"
            });
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-black/90">
            <Card className="w-full max-w-md bg-black/50 border-primary/20">
                <CardHeader>
                    <CardTitle className="text-2xl text-primary text-center">Admin Access</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        type="password"
                        placeholder="Enter Admin Secret"
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                        className="border-primary/20 text-white"
                    />
                    <Button onClick={handleLogin} className="w-full bg-primary text-black hover:bg-primary/90">
                        Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
