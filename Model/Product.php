<?php

namespace App\Model;

class Product extends AbstractModel
{
    public static function getById(string $id): ?array
    {
        $stmt = self::getConnection()->prepare(
            "SELECT * FROM products WHERE id = ?"
        );
        $stmt->execute([$id]);
        
        return $stmt->fetch(\PDO::FETCH_ASSOC) ?: null;
    }

    public static function getByCategoryName(string $categoryName): array
    {
        $stmt = self::getConnection()->prepare(
            "SELECT p.* FROM products p 
             JOIN categories c ON p.category_id = c.id 
             WHERE c.name = ?"
        );
        $stmt->execute([$categoryName]);
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }

    public static function getPrices(string $productId): array
    {
        $stmt = self::getConnection()->prepare(
            "SELECT currency, amount FROM prices WHERE product_id = ?"
        );
        $stmt->execute([$productId]);
        
        return $stmt->fetchAll(\PDO::FETCH_ASSOC);
    }
}

