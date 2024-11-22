import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/Components/ui/table";
import { CreditPurchase } from "@/types";
import dayjs from "dayjs";
import { ReceiptIcon } from "lucide-react";

export function PurchaseHistory({
  purchaseHistory,
}: {
  purchaseHistory: CreditPurchase[];
}) {
  if (purchaseHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Purchase History</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8 text-center">
          <ReceiptIcon className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500">No purchase history available yet. Select a credits package above to start.</p>
        </CardContent>
      </Card>
    );
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Purchase History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Amount</TableHead>
              <TableHead>Credits</TableHead>
              <TableHead>Stripe Payment ID</TableHead>
              <TableHead>Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseHistory.map(purchase => (
              <TableRow key={purchase.id}>
                <TableCell>${purchase.amount}</TableCell>
                <TableCell>{purchase.credits}</TableCell>
                <TableCell>{purchase.stripe_payment_id}</TableCell>
                <TableCell>
                  {dayjs(purchase.created_at).format("MMM D, YYYY h:mm A")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
