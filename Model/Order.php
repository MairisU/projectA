<?php

namespace App\Model;

class Order extends AbstractModel
{
    public static function create(array $items): bool
    {
        try {
            self::getConnection()->beginTransaction();

            $stmt = self::getConnection()->prepare(
                "INSERT INTO orders (created_at) VALUES (NOW())"
            );
            $stmt->execute();
            $orderId = self::getConnection()->lastInsertId();

            $stmt = self::getConnection()->prepare(
                "INSERT INTO order_items (order_id, product_id, quantity, attributes) 
                 VALUES (?, ?, ?, ?)"
            );

            foreach ($items as $item) {
                $stmt->execute([
                    $orderId,
                    $item['productId'],
                    $item['quantity'],
                    json_encode($item['attributes'])
                ]);
            }

            self::getConnection()->commit();
            return true;
        } catch (\Exception $e) {
            self::getConnection()->rollBack();
            throw $e;
        }
    }
}

