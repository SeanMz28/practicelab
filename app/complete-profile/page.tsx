"use client";

import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CompleteProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">Practise Lab</span>
          </Link>
          <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
          <CardDescription>
            Authentication will be implemented soon. This page will allow you to complete your profile after signing in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Auth system is being set up. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
