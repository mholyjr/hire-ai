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

export function PurchaseHistory({
  purchaseHistory,
}: {
  purchaseHistory: CreditPurchase[];
}) {
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
